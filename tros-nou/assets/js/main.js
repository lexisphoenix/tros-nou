(function () {
	'use strict';

	var FADE_START = 0.08;
	var FADE_END = 0.72;

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

	var ticking = false;

	function clamp(value, min, max) {
		return Math.min(Math.max(value, min), max);
	}

	function getScrollProgress() {
		var scrollable = hero.offsetHeight - window.innerHeight;

		if (scrollable <= 0) {
			return 0;
		}

		var rect = hero.getBoundingClientRect();
		var scrolled = -rect.top;
		return clamp(scrolled / scrollable, 0, 1);
	}

	function getFadeProgress(progress) {
		return clamp((progress - FADE_START) / (FADE_END - FADE_START), 0, 1);
	}

	function applyProgress(progress) {
		if (!veil || !overlayContact) {
			return;
		}

		var fadeProgress = getFadeProgress(progress);

		veil.style.opacity = String(fadeProgress);

		if (media) {
			media.style.opacity = String(1 - fadeProgress * 0.88);
		}

		overlayContact.style.opacity = String(clamp((fadeProgress - 0.18) / 0.55, 0, 1));

		if (fadeProgress > 0.42) {
			overlayContact.classList.add('is-visible');
			overlayContact.setAttribute('aria-hidden', 'false');
		} else {
			overlayContact.classList.remove('is-visible');
			overlayContact.setAttribute('aria-hidden', 'true');
		}

		if (closeBtn) {
			if (fadeProgress > 0.45) {
				closeBtn.classList.add('is-visible');
				closeBtn.removeAttribute('hidden');
			} else {
				closeBtn.classList.remove('is-visible');
				closeBtn.setAttribute('hidden', '');
			}
		}

		if (hint) {
			if (progress > 0.04) {
				hint.classList.add('is-hidden');
			} else {
				hint.classList.remove('is-hidden');
			}
		}

		if (brand) {
			brand.style.opacity = String(1 - fadeProgress);
			brand.style.pointerEvents = fadeProgress > 0.85 ? 'none' : 'auto';
		}

		if (fadeProgress >= 0.92) {
			document.body.classList.add('tn-entered');
		} else if (fadeProgress < 0.75) {
			document.body.classList.remove('tn-entered');
		}
	}

	function onScroll() {
		if (!ticking) {
			window.requestAnimationFrame(function () {
				applyProgress(getScrollProgress());
				ticking = false;
			});
			ticking = true;
		}
	}

	function getScrollTarget() {
		return hero.offsetHeight - window.innerHeight;
	}

	function goToContact() {
		var scrollable = getScrollTarget();

		if (scrollable <= 0 || getScrollProgress() >= 0.95) {
			return;
		}

		var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		window.scrollTo({
			top: scrollable,
			behavior: reduceMotion ? 'auto' : 'smooth',
		});
	}

	function returnToStart() {
		var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		window.scrollTo({
			top: 0,
			behavior: reduceMotion ? 'auto' : 'smooth',
		});
	}

	function isInteractiveTarget(target) {
		return Boolean(
			target.closest(
				'a, button, .tn-close, .tn-hero__link, .tn-contact__link, .tn-contact-extra, .tn-brand'
			)
		);
	}

	function onHeroActivate(event) {
		if (isInteractiveTarget(event.target)) {
			return;
		}

		if (getFadeProgress(getScrollProgress()) > 0.85) {
			return;
		}

		goToContact();
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

	initVideo();
	onScroll();
})();
