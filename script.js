// Page Loader
window.addEventListener('load', () => {
  const loader = document.getElementById('page-loader');
  if(loader) {
    loader.style.opacity = '0';
    setTimeout(() => loader.style.display = 'none', 600);
  }
});

// Theme Toggle (Light/Dark Mode)
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const html = document.documentElement;
const darkModeKey = 'nexus-theme';

function setTheme(mode) {
  if (mode === 'dark') {
    html.classList.add('dark');
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    if (themeToggleMobile) themeToggleMobile.innerHTML = '<i class="fa-solid fa-sun"></i>';
    localStorage.setItem(darkModeKey, 'dark');
  } else {
    html.classList.remove('dark');
    themeToggle.innerHTML = '<i class="fa-regular fa-moon"></i>';
    if (themeToggleMobile) themeToggleMobile.innerHTML = '<i class="fa-regular fa-moon"></i>';
    localStorage.setItem(darkModeKey, 'light');
  }
}

// On load: set theme from localStorage or system
(function () {
  const saved = localStorage.getItem(darkModeKey);
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    setTheme('dark');
  } else {
    setTheme('light');
  }
})();

themeToggle.addEventListener('click', () => {
  setTheme(html.classList.contains('dark') ? 'light' : 'dark');
});
if (themeToggleMobile) {
  themeToggleMobile.addEventListener('click', () => {
    setTheme(html.classList.contains('dark') ? 'light' : 'dark');
  });
}

// Mobile Menu
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const menuClose = document.getElementById('menu-close');
window.closeMenu = function() {
  mobileMenu.classList.remove('show');
  setTimeout(() => mobileMenu.classList.add('hidden'), 400);
  document.body.style.overflow = '';
};
menuToggle.addEventListener('click', () => {
  mobileMenu.classList.remove('hidden');
  setTimeout(() => mobileMenu.classList.add('show'), 10);
  document.body.style.overflow = 'hidden';
});
menuClose.addEventListener('click', () => {
  mobileMenu.classList.remove('show');
  setTimeout(() => mobileMenu.classList.add('hidden'), 400);
  document.body.style.overflow = '';
});

// Smooth scroll for nav links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
      if (window.innerWidth < 768) closeMenu();
    }
  });
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', function() {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.faq-question').forEach(q => {
      q.setAttribute('aria-expanded', 'false');
      q.nextElementSibling.classList.add('hidden');
    });
    if (!expanded) {
      this.setAttribute('aria-expanded', 'true');
      this.nextElementSibling.classList.remove('hidden');
    }
  });
});

// Pricing Toggle (Monthly/Yearly)
const billingToggle = document.getElementById('billing-toggle');
const priceEls = document.querySelectorAll('.price');
billingToggle.addEventListener('change', function() {
  priceEls.forEach(el => {
    const monthly = el.getAttribute('data-monthly');
    const yearly = el.getAttribute('data-yearly');
    if (this.checked) {
      el.textContent = `$${yearly}`;
    } else {
      el.textContent = `$${monthly}`;
    }
  });
});

// Newsletter Form Validation
const newsletterForm = document.getElementById('newsletter-form');
const newsletterEmail = document.getElementById('newsletter-email');
const newsletterMsg = document.getElementById('newsletter-message');
if(newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = newsletterEmail.value.trim();
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newsletterMsg.textContent = 'Please enter a valid email address.';
      newsletterMsg.className = 'text-red-500';
      return;
    }
    newsletterMsg.textContent = 'Thank you! We’ll be in touch soon.';
    newsletterMsg.className = 'text-green-600';
    newsletterForm.reset();
  });
}

// Contact Form Validation
const contactForm = document.getElementById('contact-form');
if(contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    contactForm.reset();
    alert('Thank you for contacting us! We will reply soon.');
  });
}

// SwiperJS for Testimonials
new Swiper('.testimonial-swiper', {
  loop: true,
  autoplay: { delay: 6000 },
  pagination: { el: '.swiper-pagination', clickable: true },
});

// AOS Init
AOS.init({
  once: true,
  duration: 800,
  offset: 80,
});

// Lottie Animation for Hero
window.addEventListener('DOMContentLoaded', () => {
  const lottieHero = document.getElementById('lottie-hero');
  if (lottieHero) {
    // Replace static image with Lottie player
    const lottiePlayer = document.createElement('lottie-player');
    lottiePlayer.setAttribute('src', 'https://assets10.lottiefiles.com/packages/lf20_4kx2q32n.json');
    lottiePlayer.setAttribute('background', 'transparent');
    lottiePlayer.setAttribute('speed', '1');
    lottiePlayer.setAttribute('loop', '');
    lottiePlayer.setAttribute('autoplay', '');
    lottiePlayer.style.width = '320px';
    lottiePlayer.style.height = '320px';
    lottieHero.replaceWith(lottiePlayer);
  }
});

// Back to Top Button
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.remove('hidden');
  } else {
    backToTop.classList.add('hidden');
  }
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Countdown Timer
function startCountdown(endDate) {
  function updateCountdown() {
    const now = new Date();
    const distance = endDate - now;
    if (distance < 0) {
      document.getElementById('countdown-days').textContent = '00';
      document.getElementById('countdown-hours').textContent = '00';
      document.getElementById('countdown-minutes').textContent = '00';
      document.getElementById('countdown-seconds').textContent = '00';
      return;
    }
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById('countdown-days').textContent = String(days).padStart(2, '0');
    document.getElementById('countdown-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('countdown-minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('countdown-seconds').textContent = String(seconds).padStart(2, '0');
    setTimeout(updateCountdown, 1000);
  }
  updateCountdown();
}
// Set countdown to 7 days from now
startCountdown(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));

// Animated Stats Counter
let statsAnimated = false;
function animateStats() {
  if (statsAnimated) return;
  document.querySelectorAll('.counter').forEach(counter => {
    const target = parseFloat(counter.getAttribute('data-target'));
    let current = 0;
    const isFloat = target % 1 !== 0;
    const increment = target / 60;
    function updateCounter() {
      if (current < target) {
        current += increment;
        counter.textContent = isFloat ? (current).toFixed(1) : Math.round(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = isFloat ? target.toFixed(1) : target;
      }
    }
    updateCounter();
  });
  statsAnimated = true;
}
const statsSection = document.querySelector('.stat-item')?.parentElement;
if (statsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        animateStats();
      }
    });
  }, { threshold: 0.5 });
  observer.observe(statsSection);
}