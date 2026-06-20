/* ============================================================
   Muhammad Ismail — Portfolio JavaScript
   ============================================================ */

// ── Navbar Scroll ────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Mobile Menu ──────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── Typing Animation ─────────────────────────────────────────
const typingEl = document.getElementById('typingText');
const phrases = [
  'ML/DL Engineer',
  'Computer Vision Expert',
  'Data Scientist',
  'AI Systems Builder',
  'Deep Learning Practitioner'
];
let phraseIdx = 0, charIdx = 0, deleting = false;

function type() {
  const current = phrases[phraseIdx];
  if (!deleting) {
    typingEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(type, 2000);
      return;
    }
  } else {
    typingEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 55 : 90);
}
type();

// ── Scroll Reveal ────────────────────────────────────────────
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        // Trigger skill bars when in view
        if (e.target.closest('#skills')) animateBars();
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Skill Bar Animation ──────────────────────────────────────
let barsAnimated = false;
function animateBars() {
  if (barsAnimated) return;
  barsAnimated = true;
  document.querySelectorAll('.skill-bar-fill').forEach(bar => {
    const target = bar.dataset.pct;
    setTimeout(() => { bar.style.width = target + '%'; }, 200);
  });
}

// Also trigger on section visible
const skillsSection = document.getElementById('skills');
const skillsObs = new IntersectionObserver(
  entries => { if (entries[0].isIntersecting) animateBars(); },
  { threshold: 0.2 }
);
if (skillsSection) skillsObs.observe(skillsSection);

// ── Project Filtering ─────────────────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const matches = filter === 'all' || card.dataset.cat === filter;
      if (matches) {
        card.classList.remove('hidden');
        card.style.animation = 'none';
        card.offsetHeight; // reflow
        card.style.animation = '';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ── Contact Form ─────────────────────────────────────────────
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form && form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  // Simulate send (no backend needed for static version)
  await new Promise(r => setTimeout(r, 1200));

  btn.textContent = 'Send Message';
  btn.disabled = false;
  status.style.display = 'block';
  status.textContent = '✓ Message received! I\'ll get back to you soon.';
  form.reset();
  setTimeout(() => { status.style.display = 'none'; }, 5000);
});

// ── Active Nav Link on Scroll ─────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchs  = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 120;
  sections.forEach(sec => {
    if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
      navAnchs.forEach(a => a.classList.remove('active'));
      const match = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
      if (match) match.classList.add('active');
    }
  });
}, { passive: true });

// ── Smooth Counter (Hero Stats) ───────────────────────────────
function animateCounter(el, target, suffix='') {
  let cur = 0;
  const step = target / 50;
  const timer = setInterval(() => {
    cur = Math.min(cur + step, target);
    el.textContent = Math.round(cur) + suffix;
    if (cur >= target) clearInterval(timer);
  }, 30);
}

const heroObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    document.querySelectorAll('[data-count]').forEach(el => {
      animateCounter(el, +el.dataset.count, el.dataset.suffix || '');
    });
    heroObs.disconnect();
  }
}, { threshold: 0.5 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) heroObs.observe(heroStats);

// ── Tilt on Project Cards ─────────────────────────────────────
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${-y*6}deg) rotateY(${x*6}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform .4s ease';
  });
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform .1s ease';
  });
});

// ── CV Download ───────────────────────────────────────────────
document.getElementById('downloadCV') &&
  document.getElementById('downloadCV').addEventListener('click', () => {
    // Create a simple text CV for demo
    const cv = `MUHAMMAD ISMAIL
ML/DL Engineer | Computer Vision | Data Scientist
========================================

CONTACT
Email: m.ismail@email.com
LinkedIn: add-your-link
GitHub: add-your-link

ABOUT
AI and Machine Learning enthusiast with experience in Deep Learning, 
Computer Vision, and Data Science. Building real-time intelligent 
systems including YOLOv8 object detection, ML pipelines, and RAG-based AI systems.

EDUCATION
BS Computer Science (Data Science Specialization)
UET Mardan | 2023 – Present

SKILLS
Programming: Python, SQL
AI/ML: Machine Learning, Deep Learning, NLP, Computer Vision, RAG
Libraries: Pandas, NumPy, Scikit-learn, OpenCV, TensorFlow, PyTorch, Hugging Face
Tools: Git, GitHub, Jupyter Notebook
Deployment: Flask, Streamlit, REST APIs, Docker

PROJECTS
1. YOLOv8 Real-Time Object Detection with Sound Alert
2. End-to-End Machine Learning Pipeline
3. ML Models (Regression & Classification)
4. RAG-based AI System using Hugging Face
5. Streamlit ML Apps & Flask APIs

CERTIFICATIONS
• Python Programming Certificate (Feb 2026)
• AI/ML – KPITB (Apr 2026)

SOFT SKILLS
Problem-solving | Analytical Thinking | Teamwork | Communication | Adaptability
`;
    const blob = new Blob([cv], { type: 'text/plain' });
    const url  = URL.createObjectURL(blob);
    const a    = Object.assign(document.createElement('a'), { href: url, download: 'Muhammad_Ismail_CV.txt' });
    a.click();
    URL.revokeObjectURL(url);
  });

// ── Neural Network SVG Animation ─────────────────────────────
(function drawNeural() {
  const svg = document.getElementById('neuralSvg');
  if (!svg) return;
  const ns = 'http://www.w3.org/2000/svg';
  const layers = [[60,160,260,360],[120,200,280],[160,240],[200]];
  // Simplified: just animate existing dots
  const dots = svg.querySelectorAll('circle');
  dots.forEach((d, i) => {
    d.style.animation = `pulse ${1.5 + (i % 5)*0.3}s infinite ${(i*0.1)%1}s`;
  });
})();
