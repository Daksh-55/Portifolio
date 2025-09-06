// Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
  initializePortfolio();
});

function initializePortfolio() {
  setupSmoothScrolling();
  setupActiveNavigation();
  setupScrollAnimations();
  setupNavigationBackground();
  setupFormSubmission();
  setupParallaxEffects();
  setupCustomCursor();
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Active navigation highlighting
function setupActiveNavigation() {
  function updateActiveNav() {
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSection = sectionId;
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav(); // Initial call
}

// Scroll animations
function setupScrollAnimations() {
  function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight * 0.8) {
        element.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('load', animateOnScroll);
  animateOnScroll(); // Initial call
}

// Navigation background on scroll
function setupNavigationBackground() {
  function updateNavBackground() {
    const navbar = document.getElementById('navbar');
    
    if (window.scrollY > 100) {
      navbar.style.background = 'rgba(15, 15, 35, 0.95)';
      navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.1)';
      navbar.style.boxShadow = 'none';
    }
  }

  window.addEventListener('scroll', updateNavBackground);
  updateNavBackground(); // Initial call
}

// Form submission enhancement
function setupFormSubmission() {
  const contactForm = document.querySelector('.contact-form');
  const submitButton = document.querySelector('.submit-button');
  
  if (contactForm && submitButton) {
    contactForm.addEventListener('submit', (e) => {
      // Show loading state
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Sending...';
      submitButton.style.opacity = '0.7';
      submitButton.disabled = true;
      
      // Simulate sending process
      setTimeout(() => {
        submitButton.textContent = 'Message Sent!';
        submitButton.style.backgroundColor = '#10b981';
        
        setTimeout(() => {
          submitButton.textContent = originalText;
          submitButton.style.opacity = '1';
          submitButton.style.backgroundColor = '';
          submitButton.disabled = false;
        }, 2000);
      }, 1000);
    });
  }
}

// Parallax effect for floating shapes
function setupParallaxEffects() {
  function updateParallax() {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
      const speed = (index + 1) * 0.1;
      const rotation = scrolled * 0.05;
      
      shape.style.transform = `translateY(${scrolled * speed}px) rotate(${rotation}deg)`;
    });
  }

  window.addEventListener('scroll', updateParallax);
}

// Interactive cursor effect (for desktop only)
function setupCustomCursor() {
  // Only setup cursor on desktop devices
  if (window.innerWidth <= 768) return;

  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    background: linear-gradient(45deg, #6366f1, #ec4899);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: difference;
    transition: all 0.1s ease;
    opacity: 0;
  `;
  
  document.body.appendChild(cursor);

  // Show cursor on mouse move
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
    cursor.style.opacity = '1';
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });

  // Enlarge cursor on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .glass-card, .skill-card, .project-card');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(2)';
      cursor.style.opacity = '0.8';
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      cursor.style.opacity = '1';
    });
  });
}

// Utility Functions
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Debounce function for performance optimization
function debounce(func, wait, immediate) {
  let timeout;
  
  return function executedFunction() {
    const context = this;
    const args = arguments;
    
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func.apply(context, args);
  };
}

// Enhanced scroll performance
window.addEventListener('scroll', throttle(() => {
  // All scroll-based functions are already called in their respective setup functions
}, 16)); // ~60fps

// Intersection Observer for better performance on animations
function setupIntersectionObserver() {
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });
  }
}

// Initialize Intersection Observer after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  setupIntersectionObserver();
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
  // Enable keyboard navigation for accessibility
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-navigation');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-navigation');
});

// Error handling for missing elements
function safeQuerySelector(selector, callback) {
  const element = document.querySelector(selector);
  if (element && typeof callback === 'function') {
    callback(element);
  } else if (!element) {
    console.warn(`Element with selector "${selector}" not found`);
  }
}

// Performance monitoring
if (typeof performance !== 'undefined') {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0];
      console.log(`Page load time: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
    }, 0);
  });
}