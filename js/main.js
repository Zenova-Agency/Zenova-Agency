/* ========================================
   ZENOVA - Main JavaScript
   ======================================== */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
  // LOADING SCREEN
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {  // ← Added this check
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 1500);
    }
});
    // ========================================
    // NAVIGATION - Scroll Effect
    // ========================================
    
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
    
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close menu when clicking nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========================================
    // STATS COUNTER ANIMATION
    // ========================================
    
    const stats = document.querySelectorAll('.stat-number');

    function animateSingleStat(stat) {
        const target = parseInt(stat.getAttribute('data-target'));
        if (!target || stat.dataset.animated) return;
        stat.dataset.animated = 'true';
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target;
            }
        };
        updateCounter();
    }

    // Observe every .stat-number individually — works on any page
    if (stats.length > 0) {
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSingleStat(entry.target);
                    statObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        stats.forEach(stat => statObserver.observe(stat));
    }

    // ========================================
    // BACK TO TOP BUTTON
    // ========================================
    
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========================================
    // SCROLL REVEAL ANIMATIONS
    // ========================================
    
    const revealElements = document.querySelectorAll('.service-card, .feature-item, .why-us-text, .why-us-visual');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(element);
    });

    // ========================================
    // ACTIVE NAV LINK ON SCROLL
    // ========================================
    
    const sections = document.querySelectorAll('section[id]');
    
    function setActiveNav() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNav);

    // ========================================
    // CURSOR GLOW EFFECT (Desktop only)
    // ========================================
    
    if (window.innerWidth > 768) {
        const cursorGlow = document.createElement('div');
        cursorGlow.className = 'cursor-glow';
        document.body.appendChild(cursorGlow);
        
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
    }

});

// ========================================
// CONTACT FORM HANDLING (for when we add contact page)
// ========================================

function handleContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Show success message (you'll integrate with Formspree later)
            alert('Thank you! We will contact you soon.');
            contactForm.reset();
        });
    }
}

// Call on page load

document.addEventListener('DOMContentLoaded', handleContactForm);
