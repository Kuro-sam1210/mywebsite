document.addEventListener('DOMContentLoaded', () => {

    // --- 0. Mobile Menu Toggle Logic ---
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const iconOpen = document.getElementById('icon-open');
    const iconClose = document.getElementById('icon-close');
    const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

    const toggleMobileMenu = () => {
        if (!mobileMenu) return;

        const isHidden = mobileMenu.classList.contains('hidden');

        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            iconOpen.classList.add('hidden');
            iconClose.classList.remove('hidden');
        } else {
            mobileMenu.classList.add('hidden');
            iconOpen.classList.remove('hidden');
            iconClose.classList.add('hidden');
        }
    };

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);

        // Close menu when a link is clicked (for seamless navigation)
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Delay slightly to allow smooth scroll to start
                setTimeout(toggleMobileMenu, 200);
            });
        });
    }

    // --- 1. Intersection Observer for Animations (Performance Friendly) ---
    // Targets elements with .animate-fade-in or .animate-slide-up classes
    const observerOptions = {
        // Triggers animation when 10% of the element is visible
        threshold: 0.1, 
        // Starts observing 50px before the element enters the viewport
        rootMargin: '0px 0px -50px 0px' 
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'is-visible' class which triggers the CSS transition/animation
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once visible to save resources
            }
        });
    }, observerOptions);

    // Initial setup for elements to be observed
    document.querySelectorAll('.animate-fade-in, .animate-slide-up').forEach(el => {
        sectionObserver.observe(el);
    });

    // --- 2. Sticky Header Logic (Adds 'scrolled' class for shadow/styling) ---
    const header = document.querySelector('.header');
    
    // Function to handle the sticky logic
    const toggleHeaderShadow = () => {
        // Use scrollY instead of pageYOffset (modern preference)
        if (window.scrollY > 50) { 
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    if (header) {
        window.addEventListener('scroll', toggleHeaderShadow);
        // Run once on load to handle mid-page reload
        toggleHeaderShadow();
    }


    // --- 3. Hero Subtitle Cycling (Dynamic text content) ---
    const heroSubtitle = document.getElementById('hero-subtitle');
    const titles = [
        'Full-Stack Developer',
        'Frontend Specialist', // Changed for variety
        'Backend Architect',    // Changed for variety
        'Mobile App Innovator',
        'Automation Expert'     // Added another title
    ];
    let titleIndex = 0;

    const cycleTitles = () => {
        if (heroSubtitle) {
            // Smoothly change the text content
            heroSubtitle.style.opacity = 0; // Start fade out
            setTimeout(() => {
                heroSubtitle.textContent = titles[titleIndex];
                titleIndex = (titleIndex + 1) % titles.length;
                heroSubtitle.style.opacity = 1; // Fade in
            }, 300); // Half the CSS transition time (assuming 0.6s)
        }
    };

    if (heroSubtitle) {
        // Start cycling after a short delay
        setTimeout(() => {
            cycleTitles();
            // Cycle every 3 seconds (3000ms)
            setInterval(cycleTitles, 3000); 
        }, 500);
    }


    // --- 4. Parallax effect with requestAnimationFrame (Performance Optimization) ---
    const heroBg = document.getElementById('hero-bg'); // Updated selector to ID
    let ticking = false;

    const updateParallax = () => {
        if (heroBg) {
            const scrolled = window.scrollY;
            // Negative rate moves background slower than foreground for the illusion of depth
            const rate = scrolled * -0.3; 
            // Use translate3d for better GPU acceleration
            heroBg.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true }); // Use passive listener for best scroll performance


    // --- 5. Contact form submission ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Disable button and show loading state (Good UX practice)
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Simulate form submission success/failure
            setTimeout(() => {
                console.log('Form submitted:', new FormData(contactForm));
                alert('Thank you for your message! I\'ll get back to you soon.');
                contactForm.reset();

                // Reset button state
                submitButton.textContent = 'Send Secure Message';
                submitButton.disabled = false;
            }, 1500); // Simulating network latency
        });
    }

});