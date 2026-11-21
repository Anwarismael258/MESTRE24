const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
menu?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => nav.classList.remove('open')));

const interactiveSelector = 'a, button, [role="button"], .service-chip, .steps article, .audience-card, .partner-grid a';
document.addEventListener('click', (event) => {
  const target = event.target.closest(interactiveSelector);
  if (!target || target.closest('video')) return;

  target.classList.remove('click-pulse');
  void target.offsetWidth;
  target.classList.add('click-pulse');
  target.addEventListener('animationend', () => target.classList.remove('click-pulse'), { once: true });

  if (target.matches('a, button, [role="button"]')) {
    const ripple = document.createElement('span');
    ripple.className = 'click-ripple';
    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.25;
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
    target.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
  }
});
