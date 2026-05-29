/* ============================================================
   nav.js — mobile menu toggle + sticky-header scroll state
   No framework. No dependencies.
   ============================================================ */

(function () {
  'use strict';

  // ---------- Mobile menu toggle ----------
  var toggle = document.querySelector('.nav-toggle');
  var links  = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'nav-links');
    links.id = 'nav-links';

    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.textContent = isOpen ? 'Close' : 'Menu';
    });

    // Collapse the menu when a link is selected
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = 'Menu';
      }
    });

    // Collapse on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('is-open')) {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = 'Menu';
        toggle.focus();
      }
    });
  }

  // ---------- Sticky-header scroll state ----------
  var header = document.querySelector('.site-header');

  if (header) {
    var ticking = false;

    var updateScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 4);
      ticking = false;
    };

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    }, { passive: true });

    updateScroll();
  }

})();
