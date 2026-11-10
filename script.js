/* FRK — mobile navigation, accessible theme switcher, footer year */
(() => {
  'use strict';

  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.getElementById('primary-navigation');
  const themeButton = document.querySelector('.theme-toggle');
  const year = document.getElementById('current-year');

  if (year) year.textContent = String(new Date().getFullYear());

  function closeMenu() {
    if (!menuButton || !menu) return;
    menu.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation menu');
    menuButton.querySelector('span').textContent = '☰';
  }

  if (menuButton && menu) {
    menuButton.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
      menuButton.querySelector('span').textContent = open ? '✕' : '☰';
    });

    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        closeMenu();
        if (menuButton.getAttribute('aria-expanded') === 'false' && document.activeElement?.closest('#primary-navigation')) menuButton.focus();
      }
    });
    document.addEventListener('click', event => {
      if (!event.target.closest('.nav-container')) closeMenu();
    });
    window.matchMedia('(min-width: 761px)').addEventListener('change', event => {
      if (event.matches) closeMenu();
    });
  }

  function setTheme(light) {
    document.body.classList.toggle('light-mode', light);
    if (themeButton) {
      themeButton.textContent = light ? 'Dark mode' : 'Light mode';
      themeButton.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
      themeButton.setAttribute('aria-pressed', String(light));
    }
  }

  let savedTheme = null;
  try { savedTheme = localStorage.getItem('frk-theme'); } catch (_) {}
  setTheme(savedTheme === 'light');

  if (themeButton) themeButton.addEventListener('click', () => {
    const light = !document.body.classList.contains('light-mode');
    setTheme(light);
    try { localStorage.setItem('frk-theme', light ? 'light' : 'dark'); } catch (_) {}
  });
})();
