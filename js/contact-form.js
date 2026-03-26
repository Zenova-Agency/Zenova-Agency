/* ========================================
   Contact Form - FormSubmit Integration
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // SHOW SUCCESS MESSAGE IF REDIRECTED
    // ========================================
    
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    
    const contactForm = document.querySelector('.contact-form'); // Updated selector
    const successMessage = document.getElementById('form-success');
    
    if (success === 'true' && successMessage && contactForm) {
        // Hide form and show success message
        contactForm.style.display = 'none';
        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Clean URL (remove ?success=true)
        window.history.replaceState({}, document.title, window.location.pathname);
    }
    
    // ========================================
    // FORM SUBMISSION TRACKING (OPTIONAL)
    // ========================================
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Don't prevent default - let FormSubmit handle submission
            // Just track for analytics
            console.log('📧 Contact form submitted');
            
            // Google Analytics tracking (if GA is installed)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submission', {
                    'event_category': 'Contact',
                    'event_label': 'Contact Form'
                });
            }
            
            // Facebook Pixel tracking (if installed)
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Contact');
            }
        });
    }
    
    // ========================================
    // FAQ ACCORDION
    // ========================================
    
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                item.classList.toggle('active');
            });
        }
    });
    
    // ========================================
    // FORM VALIDATION
    // ========================================
    
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input:not([type="hidden"]), select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
    }
    
    function validateField(field) {
        if (field.hasAttribute('required') && !field.value.trim()) {
            field.style.borderColor = '#ff4444';
        } else if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
            field.style.borderColor = '#ff4444';
        } else {
            field.style.borderColor = 'rgba(123, 63, 242, 0.2)';
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
});
