document.addEventListener('DOMContentLoaded', () => {
    // 1. User Menu Dropdown
    const userBtn = document.querySelector('.user-profile-btn');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const chevron = document.querySelector('.chevron');

    if (userBtn && dropdownMenu) {
        userBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('active');
            
            // Rotate chevron
            if (dropdownMenu.classList.contains('active')) {
                chevron.style.transform = 'rotate(180deg)';
            } else {
                chevron.style.transform = 'rotate(0deg)';
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            dropdownMenu.classList.remove('active');
            if (chevron) chevron.style.transform = 'rotate(0deg)';
        });

        dropdownMenu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // 2. Category Filter Buttons with Animation
    const filterBtns = document.querySelectorAll('.filter-btn');
    const postCards = document.querySelectorAll('.post-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const category = btn.getAttribute('data-filter');
            
            postCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                // Reset animation
                card.style.animation = 'none';
                card.offsetHeight; /* trigger reflow */
                
                if (category === 'All' || cardCategory === category) {
                    card.style.display = 'flex';
                    // Add fade-in animation
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Add CSS animation for fade-in dynamically
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(styleSheet);

    // 3. Graph Animation on Load
    const bars = document.querySelectorAll('.bar');
    
    // Use Intersection Observer to animate when scrolled into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetHeight = bar.getAttribute('data-height');
                
                // Add a small delay based on index for staggered effect
                // We can't easily get index here without loop, so just random delay or CSS transition handles it
                setTimeout(() => {
                    bar.style.height = targetHeight;
                }, 100);
                
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    bars.forEach(bar => {
        observer.observe(bar);
    });

    // 4. Progress Bar Animation
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        // Reset width to 0 first to animate it
        const targetWidth = progressBar.style.width;
        progressBar.style.width = '0';
        
        setTimeout(() => {
            progressBar.style.width = targetWidth;
        }, 500);
    }

    // 5. Search Shortcut (Visual only)
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('.search-bar input');
            if (searchInput) searchInput.focus();
        }
    });
});