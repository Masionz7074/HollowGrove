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
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
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
      // If it's a dropdown item, also make its parent dropdown-toggle active
      const parentDropdownToggle = activeLink.closest('.dropdown');
      if (parentDropdownToggle) {
        const toggleLink = parentDropdownToggle.querySelector('.dropdown-toggle');
        if (toggleLink) {
          toggleLink.classList.add('active');
        }
      }
    }
    
    // Close mobile menu
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    
    // Scroll to top smoothly, accounting for fixed header
    if (targetSection) {
        const headerOffset = document.querySelector('.header').offsetHeight;
        const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
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

  // Initialize home section display on page load
  const initialSectionId = window.location.hash ? window.location.hash.substring(1) : 'home';
  showSection(initialSectionId);

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
    let foundResults = false;

    qaItems.forEach(item => {
      const titleEl = item.querySelector('.qa-question h4');
      const contentEl = item.querySelector('.qa-answer p');
      
      const title = titleEl ? titleEl.textContent.toLowerCase() : '';
      const content = contentEl ? contentEl.textContent.toLowerCase() : '';
      
      resetHighlights(item); // Always reset highlights before applying new ones

      if (title.includes(searchTerm) || content.includes(searchTerm)) {
        item.style.display = 'block';
        foundResults = true;
        
        if (searchTerm) {
          highlightSearchTerm(item, searchTerm);
        }
      } else {
        item.style.display = 'none';
      }
    });

    if (!foundResults && searchTerm) {
      showNoResultsMessage();
    } else {
      hideNoResultsMessage();
    }
  }

  function highlightSearchTerm(element, term) {
    const titleEl = element.querySelector('.qa-question h4');
    const contentEl = element.querySelector('.qa-answer p');
    
    [titleEl, contentEl].forEach(el => {
      if (el) {
        const originalText = el.textContent; // Get plain text content
        const regex = new RegExp(`(${term})`, 'gi');
        el.innerHTML = originalText.replace(regex, '<mark style="background: var(--accent-color); color: var(--background-primary); padding: 2px 4px; border-radius: 3px;">$1</mark>');
      }
    });
  }

  function resetHighlights(element) {
    const titleEl = element.querySelector('.qa-question h4');
    const contentEl = element.querySelector('.qa-answer p');
    
    [titleEl, contentEl].forEach(el => {
      if (el) {
        el.innerHTML = el.textContent; // Set innerHTML back to plain text content to remove <mark>
      }
    });
  }

  function showNoResultsMessage() {
    let noResultsMsg = document.querySelector('.no-results-message');
    if (!noResultsMsg) {
      noResultsMsg = document.createElement('div');
      noResultsMsg.className = 'no-results-message';
      noResultsMsg.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">No questions found matching your search.</p>';
      document.querySelector('.qa-list').appendChild(noResultsMsg);
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
      performSearch(''); // Show all items and remove highlights
    }
  });

  // CTA Button functionality
  const ctaButton = document.querySelector('.cta-button');
  if (ctaButton) {
    ctaButton.addEventListener('click', function() {
      showSection('quests');
    });
  }

  // Smooth scrolling for anchor links (for internal page anchors that don't trigger section change)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Exclude nav links which are handled by showSection to avoid double handling
    if (!anchor.classList.contains('nav-link') && !anchor.classList.contains('dropdown-item')) {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
          const headerOffset = document.querySelector('.header').offsetHeight;
          const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    }
  });

  // Add scroll-based header background
  const header = document.querySelector('.header');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.style.backgroundColor = 'rgba(26, 32, 44, 0.98)';
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.backgroundColor = 'rgba(26, 32, 44, 0.95)';
      header.style.boxShadow = 'none';
    }
  });

  // Intersection Observer for animations
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
  }

  // Apply ripple effect to all relevant buttons
  const buttons = document.querySelectorAll('button, .btn');
  buttons.forEach(button => {
    if (getComputedStyle(button).position === 'static') {
      button.style.position = 'relative';
    }
    button.style.overflow = 'hidden';
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
    }
    
    // Press '/' to focus search input
    if (e.key === '/' && searchInput) {
      e.preventDefault();
      searchInput.focus();
    }
  });

  // Add focus management for accessibility
  const focusableElements = document.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
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
});
