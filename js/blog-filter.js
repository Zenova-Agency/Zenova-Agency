/* ========================================
   Blog Category Filter
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    const categoryBtns = document.querySelectorAll('.category-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    // Category Filter
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter blog posts
            blogCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Initialize blog cards with transition
    blogCards.forEach(card => {
        card.style.transition = 'opacity 0.3s, transform 0.3s';
    });
    
    // Load More Button (placeholder functionality)
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            alert('More articles coming soon! This will load additional blog posts.');
        });
    }
    
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing! We'll send updates to ${email}`);
            this.reset();
        });
    }
    
});