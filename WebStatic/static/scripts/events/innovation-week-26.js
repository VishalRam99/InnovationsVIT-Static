(function () {
    'use strict';

    function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
    function qsa(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

    function initMobileNav() {
        const toggle = qs('.nav-toggle');
        const nav = qs('.nav#primary-nav');

        if (!toggle || !nav) return;

        toggle.addEventListener('click', () => {
            const open = nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(open));
        });

        // Close nav on outside click
        document.addEventListener('click', (e) => {
            if (!nav.classList.contains('open')) return;
            const header = qs('.site-header');
            if (header && !header.contains(e.target)) {
                nav.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('open')) {
                nav.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    function initDropdown() {
        const eventsItem = qs('.nav-item.has-dropdown');
        if (!eventsItem) return;

        const link = qs('.nav-item.has-dropdown > .nav-link');
        const dropdown = qs('.nav-item.has-dropdown > .dropdown');

        // Hover/focus handled by CSS. Add keyboard and touch support here.

        // Keyboard: expand on focus in, collapse on focus out
        if (dropdown) {
            const focusables = qsa('a, button', dropdown);
            eventsItem.addEventListener('focusin', () => {
                eventsItem.classList.add('open');
                if (link) link.setAttribute('aria-expanded', 'true');
            });
            eventsItem.addEventListener('focusout', (e) => {
                // If focus leaves the menu entirely
                if (!eventsItem.contains(e.relatedTarget)) {
                    eventsItem.classList.remove('open');
                    if (link) link.setAttribute('aria-expanded', 'false');
                }
            });
        }

        // Touch devices: tap to toggle
        if (link && dropdown) {
            link.addEventListener('click', (e) => {
                // If mobile nav is open, clicking should toggle the submenu instead of navigating
                const isMobile = window.matchMedia('(max-width: 900px)').matches;
                if (isMobile || e.pointerType === 'touch') {
                    e.preventDefault();
                    const willOpen = !eventsItem.classList.contains('open');
                    eventsItem.classList.toggle('open', willOpen);
                    link.setAttribute('aria-expanded', String(willOpen));
                }
            });
        }

        // Close dropdown on outside click (mobile)
        document.addEventListener('click', (e) => {
            if (!eventsItem.classList.contains('open')) return;
            if (!eventsItem.contains(e.target)) {
                eventsItem.classList.remove('open');
                if (link) link.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Init
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initMobileNav();
            initDropdown();
        });
    } else {
        initMobileNav();
        initDropdown();
    }
})();
