/**
 * AGRI-PRO EUROPEAN MACHINERY — PRODUCT CATALOG CONTROLLER
 * Category filtering, search and live status
 */

document.addEventListener('DOMContentLoaded', () => {
  initProductFilter();
});

function initProductFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');
  const searchInput = document.querySelector('#product-search-input');
  const countBadge = document.querySelector('#product-count-display');

  if (!filterButtons.length && !searchInput) return;

  let activeCategory = 'all';
  let searchTerm = '';

  const applyFilters = () => {
    let visibleCount = 0;

    productCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category') || '';
      const cardTitle = (card.querySelector('.product-title')?.textContent || '').toLowerCase();
      const cardDesc = (card.querySelector('.product-excerpt')?.textContent || '').toLowerCase();

      const matchesCategory = (activeCategory === 'all' || cardCategory === activeCategory);
      const matchesSearch = (!searchTerm || cardTitle.includes(searchTerm) || cardDesc.includes(searchTerm));

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (countBadge) {
      countBadge.textContent = `${visibleCount} Products Available`;
    }
  };

  // Filter Button Clicks
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-filter') || 'all';
      applyFilters();
    });
  });

  // Search input typing
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.trim().toLowerCase();
      applyFilters();
    });
  }
}
