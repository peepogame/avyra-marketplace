// Avyra Core Interaction Protocol

// 1. Fade-Up Observer
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

// 2. Verification Status Revealer (Typewriter Effect)
class Typewriter {
  constructor(element, targetText) {
    this.element = element;
    this.targetText = targetText;
  }
  
  start() {
    this.element.textContent = '';
    let index = 0;
    const interval = setInterval(() => {
      if (index < this.targetText.length) {
        this.element.textContent += this.targetText[index];
        index++;
      } else {
        clearInterval(interval);
      }
    }, 80); // Speed of 80ms per character
  }
}

const shufflerEl = document.getElementById('el-shuffler');
if (shufflerEl) {
  const typewriter = new Typewriter(shufflerEl, 'Portfolio Verified');
  
  const shufflerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        typewriter.start();
        shufflerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  shufflerObserver.observe(shufflerEl);
}


// 4. Protocol Scheduler
const scheduleItems = document.querySelectorAll('.schedule-item');
if (scheduleItems.length > 0) {
  const scheduleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const step = parseInt(entry.target.getAttribute('data-step'));
        setTimeout(() => {
          entry.target.classList.add('active');
        }, step * 400); // Staggered activation
      }
    });
  }, { threshold: 0.8 });

  scheduleItems.forEach(el => scheduleObserver.observe(el));
}

// 5. Mobile Sidebar Toggle
const hamburgerBtns = document.querySelectorAll('.mobile-menu-btn, .hamburger-btn');
const sidebar = document.querySelector('.sidebar');
const sidebarOverlay = document.querySelector('.sidebar-overlay');

if (hamburgerBtns.length > 0) {
  hamburgerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle animation class on the button
      btn.classList.toggle('active');
      
      // If we have a sidebar (app layout)
      if (sidebar && sidebarOverlay) {
        sidebar.classList.toggle('show');
        sidebarOverlay.classList.toggle('show');
        document.body.classList.toggle('no-scroll');
        document.documentElement.classList.toggle('no-scroll');
        const appMain = document.querySelector('.app-main');
        if (appMain) appMain.classList.toggle('no-scroll');
      }
    });
  });

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
      sidebar.classList.remove('show');
      sidebarOverlay.classList.remove('show');
      document.body.classList.remove('no-scroll');
      document.documentElement.classList.remove('no-scroll');
      const appMain = document.querySelector('.app-main');
      if (appMain) appMain.classList.remove('no-scroll');
      
      // Also reset hamburger button state
      hamburgerBtns.forEach(btn => btn.classList.remove('active'));
    });
  }
}

// 6. Marketplace Search & Filter Logic
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('projectSearch');
  const filterCategory = document.getElementById('filterCategory');
  const filterDifficulty = document.getElementById('filterDifficulty');
  const filterStatus = document.getElementById('filterStatus');
  const projectCards = document.querySelectorAll('#projectsList .project-card');
  const emptyState = document.getElementById('emptyState');
  const resetBtn = document.getElementById('resetFiltersBtn');

  // Only run if we are on the marketplace page
  if (!searchInput || !projectCards.length) return;

  function filterProjects() {
    const searchTerm = searchInput.value.toLowerCase();
    const categoryFilter = filterCategory.value;
    const difficultyFilter = filterDifficulty.value;
    const statusFilter = filterStatus.value;
    
    let visibleCount = 0;

    projectCards.forEach(card => {
      // Get text content for search
      const title = card.querySelector('h3').textContent.toLowerCase();
      const desc = card.querySelector('p').textContent.toLowerCase();
      const textMatch = title.includes(searchTerm) || desc.includes(searchTerm);

      // Get data attributes for exact filtering
      const cardCategory = card.getAttribute('data-category');
      const cardDifficulty = card.getAttribute('data-difficulty');
      const cardStatus = card.getAttribute('data-status');

      const categoryMatch = categoryFilter === 'all' || cardCategory === categoryFilter;
      const difficultyMatch = difficultyFilter === 'all' || cardDifficulty === difficultyFilter;
      const statusMatch = statusFilter === 'all' || cardStatus === statusFilter;

      if (textMatch && categoryMatch && difficultyMatch && statusMatch) {
        card.style.display = 'grid'; // Maintain grid layout
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Handle Empty State
    if (visibleCount === 0) {
      emptyState.style.display = 'block';
    } else {
      emptyState.style.display = 'none';
    }
  }

  // Event Listeners
  searchInput.addEventListener('input', filterProjects);
  filterCategory.addEventListener('change', filterProjects);
  filterDifficulty.addEventListener('change', filterProjects);
  filterStatus.addEventListener('change', filterProjects);

  // Reset Button
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      searchInput.value = '';
      filterCategory.value = 'all';
      filterDifficulty.value = 'all';
      filterStatus.value = 'all';
      filterProjects();
    });
  }
});
