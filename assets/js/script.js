// ---------- typewriter ----------
const text = "Ajay Kalawadiya — Full Stack Developer, 12+ years experience.";
const typedEl = document.getElementById('typed-out');
let i = 0;
function type(){
  if(i <= text.length){
    typedEl.textContent = text.slice(0, i);
    i++;
    setTimeout(type, 32);
  }
}
type();

// ---------- mobile nav ----------
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---------- scroll reveal ----------
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => observer.observe(el));

// ---------- custom editor cursor + sparkle trail ----------
if (window.matchMedia('(pointer: fine)').matches) {
  const cursor = document.createElement('div');
  cursor.className = 'editor-cursor';
  document.body.appendChild(cursor);

  const sparkleColors = ['#49e6d0', '#d17bdc', '#e4c07a'];
  let lastSparkle = 0;

  function spawnSparkle(x, y) {
    const s = document.createElement('div');
    s.className = 'sparkle';
    const jitterX = (Math.random() - 0.5) * 14;
    const jitterY = (Math.random() - 0.5) * 14;
    s.style.left = (x + jitterX) + 'px';
    s.style.top = (y + jitterY) + 'px';
    s.style.color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
    s.style.transform = `translate(-50%,-50%) scale(${0.6 + Math.random() * 0.6})`;
    document.body.appendChild(s);
    s.addEventListener('animationend', () => s.remove());
  }

  window.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    const now = performance.now();
    if (now - lastSparkle > 70) {
      spawnSparkle(e.clientX, e.clientY);
      lastSparkle = now;
    }
  });

  const attachHoverState = () => {
    document.querySelectorAll('a, button, input, textarea, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
    });
  };
  attachHoverState();

  document.addEventListener('mousedown', (e) => {
    cursor.classList.add('is-click');
    for (let i = 0; i < 6; i++) {
      setTimeout(() => spawnSparkle(e.clientX, e.clientY), i * 25);
    }
  });
  document.addEventListener('mouseup', () => cursor.classList.remove('is-click'));
  document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
  document.addEventListener('mouseenter', () => cursor.style.opacity = '1');
}
