/* ========================================
   Contact Form Handling & FAQ Accordion
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // CONTACT FORM SUBMISSION
    // ========================================
    
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success');
    const errorMessage = document.getElementById('form-error');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            try {
                // Submit to Formspree
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Success!
                    contactForm.style.display = 'none';
                    successMessage.style.display = 'block';
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Scroll to success message
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                } else {
                    // Error from server
                    throw new Error('Form submission failed');
                }
                
            } catch (error) {
                // Show error message
                contactForm.style.display = 'none';
                errorMessage.style.display = 'block';
                
                console.error('Form submission error:', error);
            } finally {
                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
    
    // ========================================
    // FAQ ACCORDION
    // ========================================
    
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current FAQ
            item.classList.toggle('active');
        });
    });
    
    // ========================================
    // FORM VALIDATION (Real-time)
    // ========================================
    
    const inputs = contactForm?.querySelectorAll('input, select, textarea');
    
    inputs?.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
    
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