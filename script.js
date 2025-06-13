document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Navigation functionality
  const sections = document.querySelectorAll('.section');
  const navLinksMain = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');

  function showSection(targetId) {
    // Hide all sections
    sections.forEach(section => {
      section.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.add('active');
    }

    // Update active nav link
    navLinksMain.forEach(link => {
      link.classList.remove('active');
    });

    const activeLink = document.querySelector(`a[href="#${targetId}"]`);
    if (activeLink && !activeLink.classList.contains('dropdown-item')) {
      activeLink.classList.add('active');
    }
  }

  // Handle navigation clicks
  document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
      e.preventDefault();
      const targetId = e.target.getAttribute('href').substring(1);
      if (targetId) {
        showSection(targetId);
      }
    }
  });

  // Q&A category filtering
  const categoryBtns = document.querySelectorAll('.category-btn');
  const qaItems = document.querySelectorAll('.qa-item');

  categoryBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      categoryBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');

      const category = this.textContent.toLowerCase();

      qaItems.forEach(item => {
        const itemCategory = item.querySelector('.qa-category').textContent.toLowerCase();

        if (category === 'all' || itemCategory === category) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Search functionality
  const searchInput = document.querySelector('.search-input');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();

      qaItems.forEach(item => {
        const question = item.querySelector('.qa-question h4').textContent.toLowerCase();
        const answer = item.querySelector('.qa-answer p').textContent.toLowerCase();

        if (question.includes(searchTerm) || answer.includes(searchTerm)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  // Quest card interactions
  const questCards = document.querySelectorAll('.quest-card');
  questCards.forEach(card => {
    const btn = card.querySelector('.btn');
    if (btn) {
      btn.addEventListener('click', function() {
        const questTitle = card.querySelector('h3').textContent;
        alert(`Starting quest: ${questTitle}\n\nThis would normally redirect to the quest interface!`);
      });
    }
  });

  // Ask question button
  const askQuestionBtn = document.querySelector('.ask-question-btn');
  if (askQuestionBtn) {
    askQuestionBtn.addEventListener('click', function() {
      const question = prompt('What would you like to ask?');
      if (question && question.trim()) {
        alert('Your question has been submitted!\n\nOur community moderators will review it and itwill appear in the Q&A section soon.');
      }
    });
  }

  // Smooth scrolling for better UX
  function smoothScrollTo(element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  // Hero button interactions
  const heroButtons = document.querySelectorAll('.hero-buttons .btn');
  heroButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      if (this.textContent === 'Get Started') {
        showSection('quests');
      } else if (this.textContent === 'Learn More') {
        showSection('info');
      }
    });
  });

  // Add loading animation for quest cards
  function addLoadingState(button) {
    const originalText = button.textContent;
    button.textContent = 'Loading...';
    button.disabled = true;

    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 1500);
  }

  // Enhanced quest interactions
  questCards.forEach(card => {
    const btn = card.querySelector('.btn');
    if (btn) {
      btn.addEventListener('click', function() {
        addLoadingState(this);
        const questTitle = card.querySelector('h3').textContent;
        const difficulty = card.querySelector('.quest-difficulty').textContent;
        const reward = card.querySelector('.quest-reward').textContent;

        setTimeout(() => {
          alert(`🎮 Quest Details:\n\nTitle: ${questTitle}\nDifficulty: ${difficulty}\n${reward}\n\nReady to begin your adventure?`);
        }, 1500);
      });
    }
  });

  // Initialize tooltips for difficulty badges
  const difficultyBadges = document.querySelectorAll('.quest-difficulty');
  difficultyBadges.forEach(badge => {
    badge.title = `Difficulty: ${badge.textContent}`;
  });

  // Add vote functionality to Q&A items
  const qaItems = document.querySelectorAll('.qa-item');
  qaItems.forEach(item => {
    const votesElement = item.querySelector('.qa-votes');
    if (votesElement) {
      votesElement.style.cursor = 'pointer';
      votesElement.addEventListener('click', function() {
        const currentVotes = parseInt(this.textContent.match(/\d+/)[0]);
        const newVotes = currentVotes + 1;
        this.textContent = `${newVotes} votes`;
        this.style.color = 'var(--success-color)';

        setTimeout(() => {
          this.style.color = 'var(--text-muted)';
        }, 1000);
      });
    }
  });

  // Feature card hover effects
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Dynamic year in footer
  const currentYear = new Date().getFullYear();
  const footerYear = document.querySelector('.footer-bottom p');
  if (footerYear) {
    footerYear.textContent = `© ${currentYear} HollowGrove. All rights reserved.`;
  }
});
