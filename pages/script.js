document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initCounter();
    initPostFilters();
    initSortDropdown();
    initContributionGrid();
    initTOC();
    generateHeatmap();
    initCheckboxes();
});

function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(el => observer.observe(el));
}

function initPostFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    let postCards = document.querySelectorAll('.post-card, .post-card-horizontal');
    const paginationContainer = document.querySelector('.pagination');
    const postGrid = document.getElementById('post-grid');
    const listContainer = document.getElementById('post-grid') || document.querySelector('.vertical-post-list');
    
    // Search Elements
    const searchInput = document.querySelector('.big-search-bar input');
    const searchBtn = document.querySelector('.btn-search');
    const searchTags = document.querySelectorAll('.search-tags .tag');

    if (filterBtns.length === 0) return;

    // Generate dummy posts ONLY for the Post List page (identified by #post-grid)
    if (postGrid) {
        const categories = ['frontend', 'backend', 'design', 'ai'];
        const titles = [
            'The Future of Web Development', 'Understanding React Hooks', 'Advanced CSS Selectors', 
            'Node.js Performance Tips', 'UI Design Principles', 'Machine Learning Basics',
            'Accessibility in 2025', 'Cloud Native Patterns', 'The Power of TypeScript',
            'WebAssembly: A New Era', 'State Management Patterns', 'Serverless Computing',
            'GraphQL vs REST', 'Docker for Beginners', 'Kubernetes 101'
        ];
        
        // Generate ~25 posts per category
        categories.forEach(cat => {
            for (let i = 0; i < 25; i++) {
                const article = document.createElement('article');
                article.className = 'glass post-card';
                article.setAttribute('data-category', cat);
                article.onclick = () => location.href = '../postdetail page/index.html';
                
                const randomTitle = titles[Math.floor(Math.random() * titles.length)];
                const date = new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                
                // Generate filename from title
                const filename = randomTitle.toLowerCase().replace(/ /g, '-').replace(/:/g, '').replace(/\?/g, '').replace(/&/g, 'and') + '.html';
                article.onclick = () => location.href = `../postdetail page/detail page/${filename}`;
                
                article.innerHTML = `
                    <div class="card-image">
                        <img src="../../images/${cat}.svg" alt="${cat}" style="width:100%; height:100%; object-fit:cover;">
                    </div>
                    <div class="card-content">
                        <span class="date">${date}</span>
                        <h3>${randomTitle}</h3>
                        <p class="excerpt">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <div class="card-footer">
                            <span class="tag">${cat}</span>
                            <span class="views">👁 ${Math.floor(Math.random() * 5000)}</span>
                        </div>
                    </div>
                `;
                postGrid.appendChild(article);
            }
        });
        
        // Re-select post cards to include new ones
        postCards = postGrid.querySelectorAll('.post-card');
    }

    const itemsPerPage = 12;
    let currentPage = 1;
    let currentFilter = 'all';
    let searchQuery = '';

    function render() {
        // 1. Filter
        const visibleCards = [];
        postCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const title = card.querySelector('h3').textContent.toLowerCase();
            const excerptEl = card.querySelector('.excerpt');
            const excerpt = excerptEl ? excerptEl.textContent.toLowerCase() : '';
            const tagEl = card.querySelector('.tag');
            const tags = tagEl ? tagEl.textContent.toLowerCase() : '';

            const matchesCategory = (currentFilter === 'all' || category === currentFilter);
            const matchesSearch = (searchQuery === '' || 
                                   title.includes(searchQuery) || 
                                   excerpt.includes(searchQuery) || 
                                   tags.includes(searchQuery));

            if (matchesCategory && matchesSearch) {
                visibleCards.push(card);
            } else {
                card.classList.add('hidden');
                card.style.display = 'none';
            }
        });

        // 2. Paginate (only if pagination container exists)
        if (paginationContainer) {
            const totalPages = Math.ceil(visibleCards.length / itemsPerPage);
            
            // Ensure current page is valid
            if (currentPage > totalPages) currentPage = 1;
            if (currentPage < 1) currentPage = 1;

            const start = (currentPage - 1) * itemsPerPage;
            const end = start + itemsPerPage;

            visibleCards.forEach((card, index) => {
                if (index >= start && index < end) {
                    card.classList.remove('hidden');
                    card.style.display = 'flex';
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            });

            renderPagination(totalPages);
        } else {
            // No pagination, just show all filtered
            visibleCards.forEach(card => {
                card.classList.remove('hidden');
                card.style.display = 'flex';
            });
        }
    }

    function renderPagination(totalPages) {
        paginationContainer.innerHTML = '';
        
        if (totalPages <= 1) return;

        // Prev Button
        const prevBtn = document.createElement('button');
        prevBtn.textContent = '<';
        prevBtn.classList.add('page-btn');
        if (currentPage === 1) prevBtn.disabled = true;
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                render();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
        paginationContainer.appendChild(prevBtn);

        // Number Buttons
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + 4);
        
        if (endPage - startPage < 4) {
            startPage = Math.max(1, endPage - 4);
        }

        if (startPage > 1) {
             const firstBtn = document.createElement('button');
             firstBtn.textContent = '1';
             firstBtn.classList.add('page-btn');
             firstBtn.addEventListener('click', () => { currentPage = 1; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
             paginationContainer.appendChild(firstBtn);
             
             if (startPage > 2) {
                 const dots = document.createElement('span');
                 dots.textContent = '...';
                 dots.style.color = 'var(--text-secondary)';
                 dots.style.alignSelf = 'center';
                 paginationContainer.appendChild(dots);
             }
        }

        for (let i = startPage; i <= endPage; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            btn.classList.add('page-btn');
            if (i === currentPage) btn.classList.add('active');
            btn.addEventListener('click', () => {
                currentPage = i;
                render();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            paginationContainer.appendChild(btn);
        }

        if (endPage < totalPages) {
             if (endPage < totalPages - 1) {
                 const dots = document.createElement('span');
                 dots.textContent = '...';
                 dots.style.color = 'var(--text-secondary)';
                 dots.style.alignSelf = 'center';
                 paginationContainer.appendChild(dots);
             }
             const lastBtn = document.createElement('button');
             lastBtn.textContent = totalPages;
             lastBtn.classList.add('page-btn');
             lastBtn.addEventListener('click', () => { currentPage = totalPages; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
             paginationContainer.appendChild(lastBtn);
        }

        // Next Button
        const nextBtn = document.createElement('button');
        nextBtn.textContent = '>';
        nextBtn.classList.add('page-btn');
        if (currentPage === totalPages) nextBtn.disabled = true;
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                render();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
        paginationContainer.appendChild(nextBtn);
    }

    // Event Listeners
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update postCards reference in case DOM changed (e.g. by sort)
            if (listContainer) {
                postCards = listContainer.querySelectorAll('.post-card, .post-card-horizontal');
            }

            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            currentPage = 1; // Reset to page 1 on filter change
            render();
        });
    });

    // Search Event Listeners
    if (searchTags) {
        searchTags.forEach(tag => {
            tag.addEventListener('click', () => {
                if (searchInput) {
                    searchInput.value = tag.textContent;
                }
            });
        });
    }

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            searchQuery = searchInput.value.toLowerCase().replace('#', ''); // Remove # for better matching
            currentPage = 1;
            render();
        });

        // Allow Enter key to search
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchQuery = searchInput.value.toLowerCase().replace('#', '');
                currentPage = 1;
                render();
            }
        });
    }

    // Initial Render
    // Check if there is an active filter button already
    const activeBtn = document.querySelector('.filter-btn.active');
    if (activeBtn) {
        currentFilter = activeBtn.getAttribute('data-filter') || 'all';
    }
    render();
}

function initCounter() {
    const counter = document.querySelector('.counter');
    if (!counter) return;

    const target = parseInt(counter.dataset.target);
    const duration = 2000; // 2 seconds
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out quart
        const ease = 1 - Math.pow(1 - progress, 4);
        
        const current = Math.floor(start + (target - start) * ease);
        counter.textContent = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    // Start counter when element is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestAnimationFrame(update);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(counter);
}

function initContributionGrid() {
    const cells = document.querySelectorAll('.contrib-cell');
    if (cells.length === 0) return;
    
    // Indices to hide (0-based): 0 (1st), 32 (33rd), 33 (34th), 34 (35th)
    const hiddenIndices = [0, 32, 33, 34];
    let dayCounter = 1;

    cells.forEach((cell, index) => {
        // Reset
        cell.style.visibility = 'visible';
        cell.textContent = '';

        if (hiddenIndices.includes(index)) {
            cell.style.visibility = 'hidden';
        } else {
            if (dayCounter <= 31) {
                cell.textContent = dayCounter;
                dayCounter++;
            }
        }
    });
}

function initTOC() {
    const sections = document.querySelectorAll('.content-body section');
    const navLinks = document.querySelectorAll('.toc a');
    
    if (sections.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        rootMargin: "-100px 0px -70% 0px"
    });

    sections.forEach(section => observer.observe(section));
}

function generateHeatmap() {
    const grid = document.querySelector('.heatmap-grid');
    if (!grid) return;

    // 52 weeks * 7 days = 364 cells
    const totalCells = 52 * 7;
    
    for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement('div');
        cell.classList.add('heat-cell');
        
        // Randomly assign activity levels for demo
        const rand = Math.random();
        if (rand > 0.8) cell.classList.add('l1');
        else if (rand > 0.9) cell.classList.add('l2');
        else if (rand > 0.95) cell.classList.add('l3');
        else if (rand > 0.98) cell.classList.add('l4');
        
        grid.appendChild(cell);
    }
}

function initCheckboxes() {
    const checkboxes = document.querySelectorAll('.checkbox');
    
    checkboxes.forEach(box => {
        box.addEventListener('click', (e) => {
            // Toggle visual state for demo
            const card = box.closest('.quest-card');
            const isChecked = box.classList.contains('checked');
            
            if (isChecked) {
                box.classList.remove('checked');
                box.textContent = '';
                card.classList.remove('completed');
            } else {
                box.classList.add('checked');
                box.textContent = '✓';
                card.classList.add('completed');
            }
        });
    });
}

function initSortDropdown() {
    const dropdown = document.getElementById('sort-dropdown');
    if (!dropdown) return;

    const currentSortSpan = document.getElementById('current-sort');
    const menu = dropdown.querySelector('.dropdown-menu');
    const options = menu.querySelectorAll('li');
    const postGrid = document.getElementById('post-grid') || document.querySelector('.vertical-post-list');

    // Toggle menu
    dropdown.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('hidden');
    });

    // Close menu when clicking outside
    document.addEventListener('click', () => {
        menu.classList.add('hidden');
    });

    // Sort logic
    options.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent closing immediately
            const sortType = option.getAttribute('data-sort');
            const sortText = option.textContent;

            // Update UI
            currentSortSpan.textContent = sortText;
            menu.classList.add('hidden');

            // Sort posts
            sortPosts(sortType);
        });
    });

    function sortPosts(type) {
        const cards = Array.from(postGrid.querySelectorAll('.post-card, .post-card-horizontal'));
        
        cards.sort((a, b) => {
            if (type === 'latest') {
                const dateElA = a.querySelector('.date') || a.querySelector('.post-meta-h span:first-child');
                const dateElB = b.querySelector('.date') || b.querySelector('.post-meta-h span:first-child');
                const dateA = new Date(dateElA.textContent);
                const dateB = new Date(dateElB.textContent);
                return dateB - dateA;
            } else if (type === 'views') {
                const viewsElA = a.querySelector('.views') || a.querySelector('.post-meta-h span:last-child');
                const viewsElB = b.querySelector('.views') || b.querySelector('.post-meta-h span:last-child');
                const viewsA = parseInt(viewsElA.textContent.replace(/[^0-9]/g, ''));
                const viewsB = parseInt(viewsElB.textContent.replace(/[^0-9]/g, ''));
                return viewsB - viewsA;
            }
            return 0;
        });

        // Re-append sorted cards
        cards.forEach(card => postGrid.appendChild(card));
        
        // Trigger re-render of pagination/filters
        const activeFilter = document.querySelector('.filter-btn.active');
        if (activeFilter) {
            activeFilter.click();
        }
    }
}
