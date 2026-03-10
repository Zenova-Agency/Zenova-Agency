/* ========================================
   Contact Form & FAQ Handling
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
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
    // CONTACT FORM SUBMISSION
    // ========================================
    
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success');
    const errorMessage = document.getElementById('form-error');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            const formData = new FormData(contactForm);
            
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                if (response.ok) {
                    contactForm.style.display = 'none';
                    if (successMessage) {
                        successMessage.style.display = 'block';
                        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                    contactForm.reset();
                } else {
                    throw new Error('Server responded with error');
                }
                
            } catch (error) {
                console.error('Form submission error:', error);
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                contactForm.style.display = 'none';
                if (errorMessage) {
                    errorMessage.style.display = 'block';
                }
            }
        });
    }
    
    // ========================================
    // COPY EMAIL TO _REPLYTO FIELD
    // ========================================
    
    const emailInput = document.getElementById('email');
    const replyToInput = document.getElementById('email-replyto');
    
    if (emailInput && replyToInput) {
        emailInput.addEventListener('input', function() {
            replyToInput.value = this.value;
        });
        
        emailInput.addEventListener('blur', function() {
            replyToInput.value = this.value;
        });
    }
    
    // ========================================
    // FORM VALIDATION
    // ========================================
    
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        
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
