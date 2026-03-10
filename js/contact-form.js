/* ========================================
   Contact Form & FAQ Handling - FIXED
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
    // CONTACT FORM SUBMISSION - FIXED
    // ========================================
    
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success');
    const errorMessage = document.getElementById('form-error');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Create FormData from the ACTUAL form
            const formData = new FormData(contactForm);
            
            // Debug: Log what we're sending
            console.log('Form data being sent:');
            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }
            
            try {
                // Submit to Formspree
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                // Check response
                const data = await response.json();
                
                console.log('Formspree response:', data);
                
                if (response.ok) {
                    // SUCCESS!
                    contactForm.style.display = 'none';
                    if (successMessage) {
                        successMessage.style.display = 'block';
                        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                    
                    // Reset button (in case they want to send another)
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    
                    // Reset form
                    contactForm.reset();
                    
                } else {
                    // Error from Formspree
                    throw new Error('Formspree returned an error: ' + (data.error || 'Unknown error'));
                }
                
            } catch (error) {
                // Network error or submission failed
                console.error('Form submission error:', error);
                
                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                // Show error message
                contactForm.style.display = 'none';
                if (errorMessage) {
                    errorMessage.style.display = 'block';
                }
            }
        });
    }
    
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
