// ==========================================================================
// EMANUEL — ESTRATÉGIA DE AQUISIÇÃO & TRÁFEGO PAGO
// Microinterações funcionais, rápidas e discretas
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('.site-nav');
  const navLinks = document.querySelectorAll('.nav-links a, .header-cta');

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Scroll Progress & Header State
  const siteHeader = document.querySelector('.site-header');
  const progressFill = document.querySelector('.scroll-progress span');

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (siteHeader) {
      siteHeader.classList.toggle('is-scrolled', scrollTop > 20);
    }

    if (progressFill && docHeight > 0) {
      const progress = Math.min((scrollTop / docHeight) * 100, 100);
      progressFill.style.width = `${progress}%`;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 3. Subtle Reveal on Scroll
  const revealBlocks = document.querySelectorAll('.reveal-block');
  if ('IntersectionObserver' in window && revealBlocks.length > 0) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-inview');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealBlocks.forEach((block) => observer.observe(block));
  } else {
    revealBlocks.forEach((block) => block.classList.add('is-inview'));
  }

  // 4. Active Step Highlight in Section 03
  const stepArticles = document.querySelectorAll('.step-article');
  if ('IntersectionObserver' in window && stepArticles.length > 0) {
    const stepObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            stepArticles.forEach((s) => s.classList.remove('is-active'));
            entry.target.classList.add('is-active');
          }
        });
      },
      {
        threshold: 0.45,
        rootMargin: '-15% 0px -25% 0px',
      }
    );

    stepArticles.forEach((step) => stepObserver.observe(step));
  }
});
