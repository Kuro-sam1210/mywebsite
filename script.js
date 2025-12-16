document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements ---
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const heroTitleElement = document.getElementById('hero-main-title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const heroBg = document.getElementById('hero-bg');
    const systemStatus = document.getElementById('system-status');
    const header = document.querySelector('.header');
    const contactForm = document.getElementById('contact-form');
    
    // NEW ELEMENTS
    const primarySpan = heroTitleElement ? heroTitleElement.querySelector('.text-primary') : null;
    const codeStreamBg = document.getElementById('code-stream-bg');
    
    // Hero Text Data (Keep existing)
    const primaryTitleText = 'Samuel';
    const secondaryTitleText = 'The Tech Innovator';
    const titles = [
        'Full-Stack Developer',
        'Frontend Specialist',
        'Backend Architect',
        'Mobile App Innovator',
        'Automation Expert'
    ];
    let titleIndex = 0;


    // =========================================================================
    // CORE FUNCTION: TYPE & GLITCH EFFECT (Keep existing)
    // =========================================================================

    const typeText = (element, text, delay = 50) => {
        // ... (Keep the existing implementation of typeText) ...
        return new Promise(resolve => {
            element.textContent = '';
            let i = 0;
            const typingInterval = setInterval(() => {
                if (i < text.length) {
                    if (Math.random() < 0.05) {
                        element.textContent += String.fromCharCode(Math.random() * (126 - 33) + 33);
                        setTimeout(() => element.textContent = element.textContent.slice(0, -1), 50);
                    }
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typingInterval);
                    resolve();
                }
            }, delay);
        });
    };

    const cycleTitles = () => {
        // ... (Keep the existing implementation of cycleTitles) ...
        if (heroSubtitle) {
            heroSubtitle.classList.add('text-glitch');
            heroSubtitle.textContent = 'DATA_RECONFIGURING...';

            setTimeout(() => {
                const nextTitle = titles[titleIndex];
                heroSubtitle.classList.remove('text-glitch');
                
                typeText(heroSubtitle, nextTitle, 75).then(() => {
                    titleIndex = (titleIndex + 1) % titles.length;
                });

            }, 500);
        }
    };
    
    // =========================================================================
    // SYSTEM BOOT SEQUENCE & TITLE BREATHING (Keep existing)
    // =========================================================================

    const initBootSequence = async () => {
        // ... (Keep existing initBootSequence and add breathing class as before) ...
        // 1. Initial State: Hide all core elements
        header.style.opacity = '0';
        heroTitleElement.style.opacity = '0';
        heroSubtitle.style.opacity = '0';
        systemStatus.style.opacity = '0';
        
        const primarySpan = heroTitleElement.querySelector('.text-primary');
        const secondarySpan = heroTitleElement.querySelector('.block:not(.text-primary)');
        
        // --- STAGE 1: SYSTEM CALLOUT ---
        await new Promise(r => setTimeout(r, 500)); 
        systemStatus.style.opacity = '1';
        await typeText(systemStatus, '[ SYSTEM_CALL: Status.Retrieval... ONLINE ]', 20);

        // --- STAGE 2: CORE IDENTITY RENDER ---
        heroTitleElement.style.opacity = '1';
        await typeText(primarySpan, primaryTitleText, 80);
        primarySpan.classList.add('text-breathing'); // Added breathing right after typing

        // --- STAGE 3: PRIMARY FUNCTION RENDER ---
        await typeText(secondarySpan, secondaryTitleText, 60);
        
        // --- STAGE 4: INTERFACE ACTIVATION ---
        header.style.opacity = '1';
        heroSubtitle.style.opacity = '1';
        
        await typeText(heroSubtitle, titles[titleIndex], 75);
        titleIndex = (titleIndex + 1) % titles.length;

        setInterval(cycleTitles, 4000); 
    };

    if (heroTitleElement) {
        initBootSequence();
    }


    // =========================================================================
    // GLOBAL EFFECT 1: DIGITAL CODE STREAM (Improved Initialization)
    // =========================================================================

    const createCodeStream = (count = 15) => {
        if (!codeStreamBg) return;

        const charSet = '01abcdefghijklmnopqrstuvwxyz*!#$%^&@';
        const streamContainer = codeStreamBg;
        
        streamContainer.innerHTML = ''; 

        for (let i = 0; i < count; i++) {
            const stream = document.createElement('div');
            stream.style.position = 'absolute';
            stream.style.left = `${Math.random() * 100}%`;
            stream.style.top = `-${Math.random() * 50}vh`;
            stream.style.fontSize = `${Math.random() * 10 + 8}px`;
            stream.style.color = `var(--color-primary)`;
            stream.style.opacity = `${Math.random() * 0.3 + 0.05}`;
            stream.style.fontFamily = 'Space Mono, monospace';
            stream.style.lineHeight = '1.1';
            
            let code = '';
            for (let j = 0; j < 50; j++) {
                code += charSet.charAt(Math.floor(Math.random() * charSet.length)) + '<br>';
            }
            stream.innerHTML = code;
            
            // Set initial transition and transform
            stream.style.transition = `transform ${Math.random() * 15 + 8}s linear`;
            stream.style.transform = `translateY(150vh)`;
            
            streamContainer.appendChild(stream);

            // Restart stream animation when it finishes
            stream.addEventListener('transitionend', () => {
                stream.style.transition = 'none';
                stream.style.transform = 'translateY(0)';
                stream.style.left = `${Math.random() * 100}%`;
                setTimeout(() => {
                    stream.style.transition = `transform ${Math.random() * 15 + 8}s linear`;
                    stream.style.transform = `translateY(150vh)`;
                }, 50);
            });
        }
    };

    // Ensure the stream is initialized and running
    if (codeStreamBg) {
        // Use a short delay to start the animation after the DOM is fully painted
        setTimeout(() => createCodeStream(25), 100); 
    }



    
    // ... (Keep existing scroll, pulse, observer, form, and menu logic) ...

    // Sticky Header Logic (Re-implemented for completeness)
    const toggleHeaderShadow = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    if (header) {
        window.addEventListener('scroll', toggleHeaderShadow);
        toggleHeaderShadow();
    }
    
    // Global Pulsing Effect (Keep existing)
    const togglePulse = () => {
        const root = document.documentElement;
        const currentPulse = root.style.getPropertyValue('--global-pulse');
        const nextPulse = currentPulse === '1' ? '0' : '1';
        root.style.setProperty('--global-pulse', nextPulse);

        document.querySelectorAll('.system-glow').forEach(el => {
            el.style.animation = 'none';
            el.offsetHeight; 
            el.style.animation = '';
        });
    };

    setInterval(togglePulse, 4000); 
    document.documentElement.style.setProperty('--global-pulse', '1');
    
    // Intersection Observer (Keep existing)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-fade-in, .animate-slide-up').forEach(el => {
        sectionObserver.observe(el);
    });

    // Parallax effect (Keep existing)
    let ticking = false;
    const updateParallax = () => {
        if (heroBg) {
            const scrolled = window.scrollY;
            const rate = scrolled * -0.3;
            heroBg.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
    
    // Contact form submission (Keep existing)
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.textContent = 'TRANSMITTING DATA...';
            submitButton.disabled = true;

            setTimeout(() => {
                console.log('Form submitted:', new FormData(contactForm));
                alert('DATA TRANSMISSION COMPLETE. Thank you for your message! Core received signal.');
                contactForm.reset();

                submitButton.textContent = 'TRANSMIT_SECURE_MESSAGE';
                submitButton.disabled = false;
            }, 1500);
        });
    }

    // Mobile Menu Toggle Logic (Keep existing)
    const toggleMobileMenu = () => {
        if (!mobileMenu) return;
        const isHidden = mobileMenu.classList.contains('hidden');
        const iconOpen = document.getElementById('icon-open');
        const iconClose = document.getElementById('icon-close');
        
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
        const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                setTimeout(toggleMobileMenu, 200);
            });
        });
    }

});