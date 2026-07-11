/* Witt Co. — shared site behavior: nav, bubbles, scroll reveal */

// sticky nav shadow + mobile menu
const nav = document.querySelector('.nav');
const burger = document.querySelector('.nav-burger');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
if (burger) {
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  nav.querySelectorAll('.nav-links a').forEach(a =>
    a.addEventListener('click', () => nav.classList.remove('open'))
  );
}

// floating bubbles in any .bubbles container
document.querySelectorAll('.bubbles').forEach(box => {
  const count = Number(box.dataset.count || 14);
  for (let i = 0; i < count; i++) {
    const b = document.createElement('span');
    b.className = 'bubble';
    const size = 10 + Math.random() * 60;
    b.style.width = b.style.height = size + 'px';
    b.style.left = Math.random() * 100 + '%';
    b.style.animationDuration = 9 + Math.random() * 14 + 's';
    b.style.animationDelay = -Math.random() * 20 + 's';
    box.appendChild(b);
  }
});

// scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// footer year
document.querySelectorAll('[data-year]').forEach(el => {
  el.textContent = new Date().getFullYear();
});
