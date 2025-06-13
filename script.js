document.addEventListener('DOMContentLoaded', function() {
  // Navigation elements
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const dropdownItems = document.querySelectorAll('.dropdown-item');
  const contentSections = document.querySelectorAll('.content-section');

  // Mobile menu toggle
  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animate hamburger bars
    const bars = hamburger.querySelectorAll('.bar');
    if (hamburger.classList.contains('active')) {
      bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      bars[1].style.opacity = '0';
      bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      bars[0].style.transform = 'none';
      bars[1].style.opacity = '1';
      bars[2].style.transform = 'none';
    }
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      
      // Reset hamburger bars
      const bars = hamburger.querySelectorAll('.bar');
      bars[0].style.transform = 'none';
      bars[1].style.opacity = '1';
      bars[2].style.transform = 'none';
    }
  });

  // Navigation functionality
  function showSection(sectionId) {
    // Hide all sections
    contentSections.forEach(section => {
      section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.classList.add('active');
    }
    
    // Update active nav link
    navLinks.forEach(link => {
      link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
    
    // Close mobile menu
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    
    // Reset hamburger bars
    const bars = hamburger.querySelectorAll('.bar');
    bars[0].style.transform = 'none';
    bars[1].style.opacity = '1';
    bars[2].style.transform = 'none';
    
    // Scroll to top smoothly
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Add click listeners to navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const sectionId = this.getAttribute('data-section');
      if (sectionId) {
        showSection(sectionId);
      }
    });
  });

  // Add click listeners to dropdown items
  dropdownItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const sectionId = this.getAttribute('data-section');
      if (sectionId) {
        showSection(sectionId);
      }
    });
  });

  // Quest button functionality
  const questButtons = document.querySelectorAll('.quest-button');
  questButtons.forEach(button => {
    button.addEventListener('click', function() {
      const questCard = this.closest('.quest-card');
      const questTitle = questCard.querySelector('h3').textContent;
      
      // Add loading state
      const originalText = this.textContent;
      this.textContent = 'Loading...';
      this.disabled = true;
      
      // Simulate quest loading
      setTimeout(() => {
        alert(`Starting quest: ${questTitle}\n\nThis is a demo. In a real application, this would redirect to the quest interface.`);
        this.textContent = originalText;
        this.disabled = false;
      }, 1000);
    });
  });

  // Search functionality
  const searchInput = document.querySelector('.search-input');
  const searchButton = document.querySelector('.search-button');
  const qaItems = document.querySelectorAll('.qa-item');

  function performSearch(query) {
    const searchTerm = query.toLowerCase().trim();
    
    qaItems.forEach(item => {
      const title = item.querySelector('h3').textContent.toLowerCase();
      const content = item.querySelector('p').textContent.toLowerCase();
      
      if (title.includes(searchTerm) || content.includes(searchTerm)) {
        item.style.display = 'block';
        
        // Highlight search term
        if (searchTerm) {
          highlightSearchTerm(item, searchTerm);
        }
      } else {
        item.style.display = searchTerm ? 'none' : 'block';
      }
    });

    // Show message if no results found
    const visibleItems = Array.from(qaItems).filter(item => item.style.display !== 'none');
    if (visibleItems.length === 0 && searchTerm) {
      showNoResultsMessage();
    } else {
      hideNoResultsMessage();
    }
  }

  function highlightSearchTerm(element, term) {
    const title = element.querySelector('h3');
    const content = element.querySelector('p');
    
    [title, content].forEach(el => {
      const originalText = el.textContent;
      const regex = new RegExp(`(${term})`, 'gi');
      const highlightedText = originalText.replace(regex, '<mark style="background: #63b8ff; color: #1a202c; padding: 2px 4px; border-radius: 3px;">$1</mark>');
      el.innerHTML = highlightedText;
    });
  }

  function showNoResultsMessage() {
    let noResultsMsg = document.querySelector('.no-results-message');
    if (!noResultsMsg) {
      noResultsMsg = document.createElement('div');
      noResultsMsg.className = 'no-results-message';
      noResultsMsg.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">No questions found matching your search.</p>';
      document.querySelector('.qa-content').appendChild(noResultsMsg);
    }
    noResultsMsg.style.display = 'block';
  }

  function hideNoResultsMessage() {
    const noResultsMsg = document.querySelector('.no-results-message');
    if (noResultsMsg) {
      noResultsMsg.style.display = 'none';
    }
  }

  // Search event listeners
  searchButton.addEventListener('click', function() {
    performSearch(searchInput.value);
  });

  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      performSearch(this.value);
    }
  });

  searchInput.addEventListener('input', function() {
    if (this.value === '') {
      performSearch('');
    }
  });

  // CTA Button functionality
  const ctaButton = document.querySelector('.cta-button');
  if (ctaButton) {
    ctaButton.addEventListener('click', function() {
      showSection('quests');
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add scroll-based header background
  let lastScrollY = window.scrollY;
  const header = document.querySelector('.header');

  window.addEventListener('scroll', function() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 50) {
      header.style.background = 'rgba(26, 32, 44, 0.98)';
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.background = 'rgba(26, 32, 44, 0.95)';
      header.style.boxShadow = 'none';
    }
    
    lastScrollY = currentScrollY;
  });

  // Add loading animation for page
  window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });

  // Feature card animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe feature cards and other animated elements
  const animatedElements = document.querySelectorAll('.feature-card, .quest-card, .qa-item, .info-text, .placeholder-image');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Add ripple effect to buttons
  function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
      existingRipple.remove();
    }

    button.appendChild(circle);

    // Add ripple styles
    if (!document.querySelector('#ripple-styles')) {
      const rippleStyles = document.createElement('style');
      rippleStyles.id = 'ripple-styles';
      rippleStyles.textContent = `
        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: scale(0);
          animation: ripple-animation 0.6s linear;
          pointer-events: none;
        }
        
        @keyframes ripple-animation {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(rippleStyles);
    }
  }

  // Add ripple effect to all buttons
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('click', createRipple);
  });

  // Initialize tooltips for quest difficulties
  const questDifficulties = document.querySelectorAll('.quest-difficulty');
  questDifficulties.forEach(difficulty => {
    difficulty.style.cursor = 'help';
    difficulty.title = getTooltipText(difficulty.textContent);
  });

  function getTooltipText(difficulty) {
    const tooltips = {
      'Difficulty: Beginner': 'Perfect for newcomers to HollowGrove. No prior experience required.',
      'Difficulty: Intermediate': 'Requires some familiarity with HollowGrove mechanics.',
      'Difficulty: Advanced': 'For experienced explorers only. High challenge level.'
    };
    return tooltips[difficulty] || 'Quest difficulty information';
  }

  // Add keyboard navigation support
  document.addEventListener('keydown', function(e) {
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      
      const bars = hamburger.querySelectorAll('.bar');
      bars[0].style.transform = 'none';
      bars[1].style.opacity = '1';
      bars[2].style.transform = 'none';
    }
    
    // Press '/' to focus search
    if (e.key === '/' && searchInput) {
      e.preventDefault();
      searchInput.focus();
    }
  });

  // Add focus management for accessibility
  const focusableElements = document.querySelectorAll(
    'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
  );

  focusableElements.forEach(element => {
    element.addEventListener('focus', function() {
      this.style.outline = '2px solid var(--accent-color)';
      this.style.outlineOffset = '2px';
    });

    element.addEventListener('blur', function() {
      this.style.outline = 'none';
    });
  });

  console.log('HollowGrove website initialized successfully!');
});
