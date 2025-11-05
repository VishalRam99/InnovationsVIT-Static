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
        const dropdownItems = qsa('.nav-item.has-dropdown');
        if (!dropdownItems.length) return;

        const mobileQuery = window.matchMedia('(max-width: 900px)');

        const closeItem = (item) => {
            item.classList.remove('open');
            const trigger = qs('.nav-link', item);
            if (trigger) {
                trigger.setAttribute('aria-expanded', 'false');
            }
        };

        dropdownItems.forEach((item) => {
            const trigger = qs('.nav-link', item);
            const menu = qs('.dropdown', item);
            if (!trigger || !menu) return;

            trigger.setAttribute('aria-expanded', 'false');

            item.addEventListener('focusin', () => {
                dropdownItems.forEach((other) => {
                    if (other !== item) closeItem(other);
                });
                item.classList.add('open');
                trigger.setAttribute('aria-expanded', 'true');
            });

            item.addEventListener('focusout', (e) => {
                if (!item.contains(e.relatedTarget)) {
                    closeItem(item);
                }
            });

            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                if (!mobileQuery.matches) return;
                const willOpen = !item.classList.contains('open');
                dropdownItems.forEach(closeItem);
                if (willOpen) {
                    item.classList.add('open');
                    trigger.setAttribute('aria-expanded', 'true');
                }
            });
        });

        document.addEventListener('click', (e) => {
            if (!mobileQuery.matches) return;
            dropdownItems.forEach((item) => {
                if (!item.contains(e.target)) {
                    closeItem(item);
                }
            });
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
