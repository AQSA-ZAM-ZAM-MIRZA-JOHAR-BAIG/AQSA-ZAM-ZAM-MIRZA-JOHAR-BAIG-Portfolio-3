/* =========================================================
   AQSA MIRZA PORTFOLIO – Premium JavaScript
   =========================================================*/

'use strict';

/* ── Sidebar Scroll Effect ── */
const sidebar = document.getElementById('sidebar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const navLinkItems = navLinks.querySelectorAll('a');

window.addEventListener('scroll', () => {
  updateActiveNavLink();
});

/* ── Mobile Menu Toggle ── */
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  sidebar.classList.toggle('open');
});

navLinkItems.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    sidebar.classList.remove('open');
  });
});

/* ── Active Nav Link on Scroll ── */
function updateActiveNavLink() {
  const scrollPos = window.scrollY + 100;
  const sections = document.querySelectorAll('section[id]');

  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = navLinks.querySelector(`a[href="#${id}"]`);
    if (link) {
      if (scrollPos >= top && scrollPos < bottom) {
        navLinkItems.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

/* ── Intersection Observer: Fade Animations ── */
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('[data-animate="fade-up"]').forEach(el => {
  fadeObserver.observe(el);
});

/* ── Timeline Items Staggered Reveal ── */
const timelineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 100);
        timelineObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
);

document.querySelectorAll('.timeline-item').forEach(item => {
  timelineObserver.observe(item);
});

/* ── Animated Number Counter ── */
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const duration = 1800;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.floor(ease * target);
    el.textContent = current;
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target;
    }
  };
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('.stat-number').forEach(el => {
  counterObserver.observe(el);
});

/* ── Skill Bar Animation ── */
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach((fill, i) => {
          setTimeout(() => fill.classList.add('animated'), i * 120);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

const skillsLayout = document.querySelector('.skills-layout');
if (skillsLayout) skillObserver.observe(skillsLayout);

/* ── Contact Form ── */
const form = document.getElementById('contact-form');
const feedback = document.getElementById('form-feedback');
const submitBtn = document.getElementById('form-submit-btn');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = document.getElementById('cf-name').value.trim();
    const email   = document.getElementById('cf-email').value.trim();
    const message = document.getElementById('cf-message').value.trim();

    if (!name || !email || !message) {
      feedback.textContent = '⚠️ Please fill in all fields.';
      feedback.style.color = '#e87040';
      return;
    }

    if (!isValidEmail(email)) {
      feedback.textContent = '⚠️ Please enter a valid email address.';
      feedback.style.color = '#e87040';
      return;
    }

    // Simulate send
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    setTimeout(() => {
      feedback.textContent = '✅ Thank you! Your message has been sent.';
      feedback.style.color = '#2dd4bf';
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
      setTimeout(() => { feedback.textContent = ''; }, 5000);
    }, 1500);
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ── Smooth Parallax on Hero Orbs ── */
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  const orbs = document.querySelectorAll('.hero-orb');
  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 0.4;
    orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});

/* ── Highlight Cards Tilt Effect ── */
document.querySelectorAll('.highlight-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `perspective(600px) rotateY(${dx * 6}deg) rotateX(${-dy * 6}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ── Page Load Animation ── */
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});

console.log('%cAqsa Mirza Portfolio Loaded ✨', 'color:#c9a84c; font-size:14px; font-weight:bold;');