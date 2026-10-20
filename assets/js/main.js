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

	var scrollAnimating = false;
	var scrollable = 0;
	var displayed = 0;
	var target = 0;
	var rafId = 0;
	var lastStep = 0;
	var contactShown = false;
	var closeShown = false;
	var hintHidden = false;
	var brandGone = false;
	var entered = false;
	var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	function clamp(value, min, max) {
		return Math.min(Math.max(value, min), max);
	}

	function easeInOutCubic(t) {
		return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
	}

	function measure() {
		var stickyH = heroSticky ? heroSticky.offsetHeight : window.innerHeight;
		scrollable = Math.max(hero.offsetHeight - stickyH, 0);
	}

	function getScrollProgress() {
		if (scrollable <= 0) {
			return 0;
		}

		return clamp((window.scrollY || window.pageYOffset) / scrollable, 0, 1);
	}

	function clampScrollPosition() {
		measure();
		var y = window.scrollY || window.pageYOffset;

		if (y > scrollable) {
			window.scrollTo(0, scrollable);
		}
	}

	function paint(progress) {
		if (!veil || !overlayContact) {
			return;
		}

		var p = clamp(progress, 0, 1);

		document.documentElement.style.setProperty('--tn-p', String(Math.round(p * 1000) / 1000));

		var showContact = p >= CONTACT_REVEAL;

		if (showContact !== contactShown) {
			contactShown = showContact;
			overlayContact.classList.toggle('is-visible', showContact);
			overlayContact.setAttribute('aria-hidden', showContact ? 'false' : 'true');
		}

		var showClose = p > 0.55;

		if (closeBtn && showClose !== closeShown) {
			closeShown = showClose;
			closeBtn.classList.toggle('is-visible', showClose);

			if (showClose) {
				closeBtn.removeAttribute('hidden');
			} else {
				closeBtn.setAttribute('hidden', '');
			}
		}

		var hideHint = progress > 0.02;

		if (hint && hideHint !== hintHidden) {
			hintHidden = hideHint;
			hint.classList.toggle('is-hidden', hideHint);
		}

		var dimBrand = p > 0.35;

		if (brand && dimBrand !== brandGone) {
			brandGone = dimBrand;
			brand.style.pointerEvents = dimBrand ? 'none' : 'auto';
		}

		var isEntered = p >= 0.98;

		if (isEntered !== entered) {
			entered = isEntered;
			document.body.classList.toggle('tn-entered', isEntered);
		}
	}

	function schedule() {
		if (rafId || scrollAnimating) {
			return;
		}

		rafId = window.requestAnimationFrame(step);
	}

	function step(now) {
		rafId = 0;

		if (scrollAnimating) {
			lastStep = 0;
			return;
		}

		var delta = target - displayed;

		if (reduceMotion || Math.abs(delta) < 0.001) {
			displayed = target;
			lastStep = 0;
			paint(displayed);
			return;
		}

		var dt = lastStep ? Math.min(now - lastStep, 48) : 16;
		lastStep = now;
		displayed += delta * (1 - Math.exp(-dt / 55));
		paint(displayed);
		schedule();
	}

	function onScroll() {
		target = getScrollProgress();
		schedule();
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
			target = getScrollProgress();
			displayed = target;
			paint(displayed);

			if (t < 1) {
				window.requestAnimationFrame(frame);
			} else {
				scrollAnimating = false;
				clampScrollPosition();
				target = getScrollProgress();
				displayed = target;
				paint(displayed);
			}
		}

		window.requestAnimationFrame(frame);
	}

	function goToContact() {
		measure();
		var scrollableDistance = scrollable;

		if (scrollableDistance <= 0 || getScrollProgress() >= 0.98) {
			return;
		}

		animateScrollTo(scrollableDistance, reduceMotion ? 0 : ANIMATION_MS);
	}

	function isInteractiveTarget(target) {
		return Boolean(
			target.closest(
				'a, button, .tn-close, .tn-hero__link, .tn-pau, .tn-brand, .tn-contact__logo'
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
		entered = false;
		animateScrollTo(0, reduceMotion ? 0 : ANIMATION_MS);
	}

	function initVideo() {
		if (!video) {
			return;
		}

		var src = video.getAttribute('data-src');

		if (!src) {
			return;
		}

		video.muted = true;
		video.loop = true;
		video.playsInline = true;
		video.setAttribute('playsinline', '');
		video.setAttribute('webkit-playsinline', '');

		function start() {
			if (video.getAttribute('src')) {
				return;
			}

			video.preload = 'auto';
			video.src = src;

			var playPromise = video.play();
			if (playPromise && typeof playPromise.catch === 'function') {
				playPromise.catch(function () {
					/* Autoplay blocked — the still image stays visible. */
				});
			}
		}

		if ('requestIdleCallback' in window) {
			window.requestIdleCallback(start, { timeout: 800 });
		} else {
			window.setTimeout(start, 400);
		}
	}

	function initPauMenu() {
		var root = document.getElementById('tn-pau');
		var toggle = document.getElementById('tn-pau-toggle');
		var menu = document.getElementById('tn-pau-menu');

		if (!root || !toggle || !menu) {
			return;
		}

		function setOpen(open) {
			toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
			menu.hidden = !open;
		}

		toggle.addEventListener('click', function (event) {
			event.stopPropagation();
			setOpen(toggle.getAttribute('aria-expanded') !== 'true');
		});

		document.addEventListener('click', function (event) {
			if (!root.contains(event.target)) {
				setOpen(false);
			}
		});

		document.addEventListener('keydown', function (event) {
			if (event.key === 'Escape') {
				setOpen(false);
			}
		});
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
	window.addEventListener('resize', function () {
		measure();
		onScroll();
	}, { passive: true });

	if ('scrollRestoration' in history) {
		history.scrollRestoration = 'manual';
	}

	initPauMenu();
	initVideo();
	measure();
	window.scrollTo(0, 0);
	target = 0;
	displayed = 0;
	paint(0);
})();
