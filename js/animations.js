// Zenova Agency - GSAP Animations
console.log('✅ Animations.js loaded successfully');

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎬 Initializing animations...');

    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.warn('⚠️ GSAP not loaded. Animations disabled.');
        return;
    }

    // Check if ScrollTrigger is loaded
    if (typeof ScrollTrigger === 'undefined') {
        console.warn('⚠️ ScrollTrigger not loaded. Scroll animations disabled.');
    } else {
        gsap.registerPlugin(ScrollTrigger);
    }

    // ===================================
    // HERO SECTION ANIMATIONS
    // ===================================
    
    // Animate hero title lines
    gsap.from('.hero-title .title-line', {
        opacity: 0,
        y: 100,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.3
    });

    // Animate hero subtitle
    gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 1.2,
        ease: 'power2.out'
    });

    // Animate CTA buttons
    gsap.from('.hero-cta .btn', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.2,
        delay: 1.5,
        ease: 'back.out(1.7)'
    });

    // Animate stats counter
    gsap.from('.hero-stats .stat-item', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.15,
        delay: 1.8,
        ease: 'power2.out'
    });

    // ===================================
    // SERVICES SECTION ANIMATIONS
    // ===================================
    
    if (typeof ScrollTrigger !== 'undefined') {
        // Section header animation
        gsap.from('.services-preview .section-header', {
            scrollTrigger: {
                trigger: '.services-preview',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power2.out'
        });

        // Service cards stagger animation
        gsap.from('.service-card', {
            scrollTrigger: {
                trigger: '.services-grid',
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 80,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
        });

        // Service card hover effect (enhanced with GSAP)
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                gsap.to(this, {
                    y: -10,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                gsap.to(this.querySelector('.service-icon'), {
                    scale: 1.1,
                    rotation: 5,
                    duration: 0.3,
                    ease: 'back.out(1.7)'
                });
            });

            card.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                gsap.to(this.querySelector('.service-icon'), {
                    scale: 1,
                    rotation: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    }

    // ===================================
    // WHY US SECTION ANIMATIONS
    // ===================================
    
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.from('.why-us-text', {
            scrollTrigger: {
                trigger: '.why-us',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            x: -100,
            duration: 1,
            ease: 'power3.out'
        });

        gsap.from('.why-us-visual', {
            scrollTrigger: {
                trigger: '.why-us',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            x: 100,
            duration: 1,
            ease: 'power3.out'
        });

        gsap.from('.feature-item', {
            scrollTrigger: {
                trigger: '.features-list',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            x: -50,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power2.out'
        });
    }

    // ===================================
    // CTA SECTION ANIMATIONS
    // ===================================
    
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.from('.cta-content', {
            scrollTrigger: {
                trigger: '.cta-section',
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            ease: 'back.out(1.7)'
        });
    }

    // ===================================
    // NAVBAR SCROLL EFFECT
    // ===================================
    
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.create({
            start: 'top -80',
            end: 99999,
            toggleClass: {
                targets: '.navbar',
                className: 'scrolled'
            }
        });
    }

    // ===================================
    // SCROLL INDICATOR ANIMATION
    // ===================================
    
    gsap.to('.scroll-indicator', {
        opacity: 0,
        scrollTrigger: {
            start: 'top top',
            end: 'top -100',
            scrub: true
        }
    });

    // Animate mouse wheel
    gsap.to('.scroll-indicator .wheel', {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
    });

    // ===================================
    // FOOTER FADE IN
    // ===================================
    
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.from('.footer', {
            scrollTrigger: {
                trigger: '.footer',
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power2.out'
        });
    }

    // ===================================
    // LOADING SCREEN ANIMATION
    // ===================================
    
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        // Animate loading screen out
        gsap.to(loadingScreen, {
            opacity: 0,
            duration: 0.5,
            delay: 0.5,
            onComplete: function() {
                loadingScreen.style.display = 'none';
            }
        });
    }

    console.log('✅ All animations initialized successfully');
});

// ===================================
// PAGE TRANSITION ANIMATIONS (optional)
// ===================================

// Smooth page transitions when clicking links
document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    
    // Check if it's an internal link (same site)
    if (link && link.href && link.href.indexOf(window.location.origin) === 0 && !link.target) {
        // Don't apply to anchor links (#)
        if (!link.href.includes('#')) {
            e.preventDefault();
            const href = link.href;
            
            // Fade out page
            gsap.to('body', {
                opacity: 0,
                duration: 0.3,
                onComplete: function() {
                    window.location.href = href;
                }
            });
        }
    }
});

// Fade in page on load
window.addEventListener('load', function() {
    gsap.to('body', {
        opacity: 1,
        duration: 0.3
    });
});
