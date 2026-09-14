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
