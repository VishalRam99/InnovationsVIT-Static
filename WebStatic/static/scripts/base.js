document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('primary-nav');
  const toggle = document.querySelector('.nav-toggle');
  if (!nav || !nav.classList.contains('navbar')) {
    return;
  }

  // Toggle mobile nav
  if (toggle) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
  }

  // Toggle dropdowns on mobile via click
  const dropBtns = document.querySelectorAll('.dropdown > .dropbtn');
  dropBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const isMobile = window.matchMedia('(max-width: 900px)').matches;
      if (!isMobile) return; // desktop uses hover
      e.preventDefault();
      const parent = btn.closest('.dropdown');
      if (!parent) return;
      parent.classList.toggle('open');
    });
  });

  // Close dropdowns when clicking outside on mobile
  document.addEventListener('click', (e) => {
    const isMobile = window.matchMedia('(max-width: 900px)').matches;
    if (!isMobile) return;
    if (!e.target.closest('.navbar')) {
      document.querySelectorAll('.dropdown.open').forEach((el) => el.classList.remove('open'));
    }
  });
});