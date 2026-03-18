// Martin Ruof — Site JavaScript

// Navigation scroll effect
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  // Close mobile menu when link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });
}

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section, .force-card, .offer-card, .stat-card, .method-step, .faq-item, .blog-card, .process-step, .dimension-card').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Add fade-in CSS dynamically
const style = document.createElement('style');
style.textContent = `
  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .force-card.fade-in { transition-delay: calc(var(--card-index, 0) * 0.1s); }
  .blog-card.fade-in { transition-delay: calc(var(--card-index, 0) * 0.05s); }
`;
document.head.appendChild(style);

// Set card animation delays
document.querySelectorAll('.force-card').forEach((card, i) => {
  card.style.setProperty('--card-index', i);
});

document.querySelectorAll('.stat-card').forEach((card, i) => {
  card.style.setProperty('--card-index', i);
});

document.querySelectorAll('.blog-card').forEach((card, i) => {
  card.style.setProperty('--card-index', i);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Blog category filter (if on blog page)
document.querySelectorAll('.blog-category-tag').forEach(tag => {
  tag.addEventListener('click', function() {
    document.querySelectorAll('.blog-category-tag').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
    // Category filtering would be implemented with JS filtering or server-side
    // For now this just toggles the visual active state
  });
});
