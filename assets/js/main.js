(function () {
	'use strict';

	var ANIMATION_MS = 1000;
	var CONTACT_REVEAL = 0.92;

	var hero = document.getElementById('tn-hero');
	if (!hero) {
		return;
	}

	var veil = document.getElementById('tn-hero-veil');
	var overlayContact = document.getElementById('tn-hero-contact');
	var hint = document.getElementById('tn-hero-hint');
	var closeBtn = document.getElementById('tn-close');
	var video = document.getElementById('tn-hero-video');
	var brand = document.querySelector('.tn-brand');
	var heroSticky = hero.querySelector('.tn-hero__sticky');
	var media = hero.querySelector('.tn-hero__image, .tn-hero__video');

	var scrollAnimating = false;
	var ticking = false;

	function clamp(value, min, max) {
		return Math.min(Math.max(value, min), max);
	}

	function easeInOutCubic(t) {
		return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
	}

	function getScrollTarget() {
		return Math.max(hero.offsetHeight - window.innerHeight, 0);
	}

	function getScrollProgress() {
		var scrollable = getScrollTarget();

		if (scrollable <= 0) {
			return 0;
		}

		return clamp((window.scrollY || window.pageYOffset) / scrollable, 0, 1);
	}

	function clampScrollPosition() {
		var max = getScrollTarget();
		var y = window.scrollY || window.pageYOffset;

		if (y > max) {
			window.scrollTo(0, max);
		}
	}

	function applyCurtain(progress) {
		if (!veil || !overlayContact) {
			return;
		}

		var p = easeInOutCubic(clamp(progress, 0, 1));
		var curtainTop = (1 - p) * 100;

		veil.style.clipPath = 'inset(' + curtainTop + '% 0 0 0)';
		veil.style.webkitMaskImage = 'none';
		veil.style.maskImage = 'none';

		if (media) {
			media.style.opacity = String(1 - p * 0.35);
		}

		var contactOpacity = clamp((p - CONTACT_REVEAL) / (1 - CONTACT_REVEAL), 0, 1);

		overlayContact.style.opacity = String(contactOpacity);

		if (p >= CONTACT_REVEAL) {
			overlayContact.classList.add('is-visible');
			overlayContact.setAttribute('aria-hidden', 'false');
		} else {
			overlayContact.classList.remove('is-visible');
			overlayContact.setAttribute('aria-hidden', 'true');
		}

		if (closeBtn) {
			if (p > 0.55) {
				closeBtn.classList.add('is-visible');
				closeBtn.removeAttribute('hidden');
			} else {
				closeBtn.classList.remove('is-visible');
				closeBtn.setAttribute('hidden', '');
			}
		}

		if (hint) {
			if (progress > 0.02) {
				hint.classList.add('is-hidden');
			} else {
				hint.classList.remove('is-hidden');
			}
		}

		if (brand) {
			brand.style.opacity = String(1 - clamp(p / 0.45, 0, 1));
			brand.style.pointerEvents = p > 0.35 ? 'none' : 'auto';
		}

		if (p >= 0.98) {
			document.body.classList.add('tn-entered');
		} else {
			document.body.classList.remove('tn-entered');
		}
	}

	function onScroll() {
		if (!ticking) {
			window.requestAnimationFrame(function () {
				if (!scrollAnimating) {
					clampScrollPosition();
					applyCurtain(getScrollProgress());
				}
				ticking = false;
			});
			ticking = true;
		}
	}

	function animateScrollTo(targetY, duration) {
		var startY = window.scrollY || window.pageYOffset;
		var distance = targetY - startY;
		var startTime = performance.now();

		if (Math.abs(distance) < 1) {
			return;
		}

		scrollAnimating = true;

		function frame(now) {
			var elapsed = now - startTime;
			var t = clamp(elapsed / duration, 0, 1);
			var eased = easeInOutCubic(t);
			var y = startY + distance * eased;

			window.scrollTo(0, y);
			applyCurtain(getScrollProgress());

			if (t < 1) {
				window.requestAnimationFrame(frame);
			} else {
				scrollAnimating = false;
				clampScrollPosition();
				applyCurtain(getScrollProgress());
			}
		}

		window.requestAnimationFrame(frame);
	}

	function goToContact() {
		var scrollable = getScrollTarget();

		if (scrollable <= 0 || getScrollProgress() >= 0.98) {
			return;
		}

		var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		animateScrollTo(scrollable, reduceMotion ? 0 : ANIMATION_MS);
	}

	function isInteractiveTarget(target) {
		return Boolean(
			target.closest(
				'a, button, .tn-close, .tn-hero__link, .tn-contact-extra, .tn-brand, .tn-contact__logo'
			)
		);
	}

	function onHeroActivate(event) {
		if (isInteractiveTarget(event.target)) {
			return;
		}

		if (getScrollProgress() > 0.85) {
			return;
		}

		goToContact();
	}

	function returnToStart() {
		document.body.classList.remove('tn-entered');
		var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		animateScrollTo(0, reduceMotion ? 0 : ANIMATION_MS);
	}

	function initVideo() {
		if (!video) {
			return;
		}

		video.muted = true;
		video.loop = true;
		video.setAttribute('playsinline', '');
		video.setAttribute('webkit-playsinline', '');

		var playPromise = video.play();
		if (playPromise && typeof playPromise.catch === 'function') {
			playPromise.catch(function () {
				/* Autoplay blocked — scroll and poster still work. */
			});
		}
	}

	if (closeBtn) {
		closeBtn.addEventListener('click', function (event) {
			event.stopPropagation();
			returnToStart();
		});
	}

	if (heroSticky) {
		heroSticky.addEventListener('click', onHeroActivate);
	}

	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onScroll, { passive: true });

	if ('scrollRestoration' in history) {
		history.scrollRestoration = 'manual';
	}

	initVideo();
	window.scrollTo(0, 0);
	clampScrollPosition();
	applyCurtain(getScrollProgress());
})();
