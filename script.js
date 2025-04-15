/**
 * Administratiekantoor van der Meeren
 * JavaScript functionaliteit
 */

document.addEventListener('DOMContentLoaded', function() {
    // Variabelen
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.header__toggle');
    const nav = document.querySelector('.header__nav');
    const backToTop = document.querySelector('.back-to-top');
    const cookieConsent = document.querySelector('.cookie-consent');
    const acceptCookieBtn = document.querySelector('.cookie-consent__accept');
    const nieuws_filters = document.querySelectorAll('.nieuws__filter');
    const nieuws_items = document.querySelectorAll('.nieuws__card');
    const statNumbers = document.querySelectorAll('.stats__number');

    // Initiële setup
    setTimeout(() => {
        document.body.classList.add('loaded');
        showCookieConsent();
    }, 1000);

    // ======= Header Scroll Effect =======
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top button
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Animate elements when they come into view
        animateOnScroll();
    }

    window.addEventListener('scroll', handleScroll);

    // ======= Mobile Menu Toggle =======
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close menu when clicking on a menu item
    document.querySelectorAll('.header__menu a').forEach(item => {
        item.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // ======= Smooth Scrolling =======
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            
            window.scrollTo({
                top: targetPosition - headerHeight,
                behavior: 'smooth'
            });
        });
    });

    // ======= Nieuws Filter =======
    nieuws_filters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Update active class
            nieuws_filters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            const category = this.getAttribute('data-filter');
            
            nieuws_items.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // ======= Stats Counter Animation =======
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-count'));
        const duration = 2000; // ms
        const frameDuration = 1000 / 60; // 60fps
        const totalFrames = Math.round(duration / frameDuration);
        
        let frame = 0;
        const counter = setInterval(() => {
            frame++;
            
            // Calculate current count
            const progress = frame / totalFrames;
            const currentCount = Math.round(progress * target);
            
            // Set the current count
            el.textContent = currentCount;
            
            if (frame === totalFrames) {
                clearInterval(counter);
            }
        }, frameDuration);
    }

    // ======= Cookie Consent =======
    function showCookieConsent() {
        if (!localStorage.getItem('cookieConsent')) {
            setTimeout(() => {
                cookieConsent.classList.add('show');
            }, 1000);
        }
    }

    acceptCookieBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieConsent.classList.remove('show');
    });

    // ======= Animate on Scroll =======
    function animateOnScroll() {
        const elements = document.querySelectorAll('.dienst__card, .team__card, .nieuws__card, .belastingdienst__item, .contact__info-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('fadeIn');
                
                // If it's a stats number, start the counter
                if (element.classList.contains('stats__item') && !element.classList.contains('counted')) {
                    element.classList.add('counted');
                    const numberElement = element.querySelector('.stats__number');
                    if (numberElement) {
                        animateCounter(numberElement);
                    }
                }
            }
        });
        
        // Check if stats are in view
        const statsSection = document.querySelector('.over-ons__stats');
        if (statsSection) {
            const statsSectionTop = statsSection.getBoundingClientRect().top;
            if (statsSectionTop < window.innerHeight - 150 && !statsSection.classList.contains('counted')) {
                statsSection.classList.add('counted');
                statNumbers.forEach(stat => {
                    animateCounter(stat);
                });
            }
        }
    }

    // Initialize animations
    setTimeout(animateOnScroll, 500);
});