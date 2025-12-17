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
    const themeSwitcher = document.getElementById('theme-switcher');
    const feedbackBtn = document.getElementById('feedback-btn');
    
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

    // Theme Switcher
    const themes = ['default', 'neon', 'retro', 'matrix'];
    let currentThemeIndex = 0;

    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', () => {
            currentThemeIndex = (currentThemeIndex + 1) % themes.length;
            const newTheme = themes[currentThemeIndex];
            document.documentElement.setAttribute('data-theme', newTheme);
            themeSwitcher.textContent = newTheme.toUpperCase();

            // Update Three.js eye color to match theme
            if (material) {
                if (newTheme === 'neon') material.color.setHex(0x00ff00);
                else if (newTheme === 'retro') material.color.setHex(0xff6b00);
                else if (newTheme === 'matrix') material.color.setHex(0x00ff00);
                else material.color.setHex(0x00ffff); // default cyan
            }
        });
    }

    // Feedback Mechanism
    if (feedbackBtn) {
        feedbackBtn.addEventListener('click', () => {
            const feedback = prompt('Share your feedback about the site:');
            if (feedback) {
                console.log('User feedback:', feedback);
                alert('Thank you for your feedback! It has been logged.');
            }
        });
    }

    // Three.js Particle Eye (Converted from SVG)
    const container = document.getElementById('canvas-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // The Anatomical Particle Eye/Face
    const particleCount = 20000;
    const geometry = new THREE.BufferGeometry();
    const pos = new Float32Array(particleCount * 3);
    const targets = new Float32Array(particleCount * 3);

    // Create expression targets
    const faceTargets = new Float32Array(particleCount * 3);
    const eyeTargets = new Float32Array(particleCount * 3);
    const devilTargets = new Float32Array(particleCount * 3);
    const surprisedTargets = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        // Chaos Start
        pos[i*3] = (Math.random()-0.5)*50;
        pos[i*3+1] = (Math.random()-0.5)*50;
        pos[i*3+2] = (Math.random()-0.5)*50;

        // --- SINISTER FACE TARGETS ---
        const progress = i / particleCount;
        let x, y, z = 0;

        if (progress < 0.4) {
            // STATE 1: THE FACE MASK (40% of particles)
            // Creates a faint, large oval to act as the "skin"
            const angle = Math.random() * Math.PI * 2;
            const radiusX = 4 + (Math.random() * 0.2); // Slight jitter
            const radiusY = 5 + (Math.random() * 0.2);
            x = Math.cos(angle) * radiusX;
            y = Math.sin(angle) * radiusY;
            z = -1; // Push it slightly back
        }
        else if (progress < 0.5) {
            // STATE 2: LEFT EYE (10% - Filled)
            const angle = Math.random() * Math.PI * 2;
            const r = Math.random() * 0.4; // Random radius fills the circle
            x = -1.5 + Math.cos(angle) * r;
            y = 1.5 + Math.sin(angle) * r;
            z = 0.5;
        }
        else if (progress < 0.6) {
            // STATE 3: RIGHT EYE (10% - Filled)
            const angle = Math.random() * Math.PI * 2;
            const r = Math.random() * 0.4;
            x = 1.5 + Math.cos(angle) * r;
            y = 1.5 + Math.sin(angle) * r;
            z = 0.5;
        }
        else if (progress < 0.65) {
            // STATE 4: THE NOSE (5% - Sharp Triangle)
            x = (Math.random() - 0.5) * 0.5;
            y = 0.5 - (Math.random() * 1.0);
            z = 0.8;
        }
        else {
            // STATE 5: THE SINISTER MOUTH (35% - Wide & Sharp)
            // Using a parabolic curve for a sharper, wider grin
            const t = (progress - 0.65) / 0.35; // 0 to 1
            const mouthWidth = 6;
            x = (t - 0.5) * mouthWidth;
            // The "Sinister" curve: y = x^2 - constant
            y = -1.5 + (Math.pow(x, 2) * 0.15);

            // Add vertical "teeth" jitter to make it look glitchy/scary
            y += (Math.random() - 0.5) * 0.3;
            z = 0.2;
        }

        faceTargets[i*3] = x;
        faceTargets[i*3+1] = y;
        faceTargets[i*3+2] = z;

        // --- DEVIL TARGETS (Open Mouth + Angry Eyes) ---
        if (progress < 0.2) { // Slanted Left Eye
            const t = (progress / 0.2);
            x = -1.5 + (t - 0.5) * 0.8;
            y = 1.5 - (t - 0.5) * 0.4; // Slanted down towards center
        } else if (progress < 0.4) { // Slanted Right Eye
            const t = (progress - 0.2) / 0.2;
            x = 1.5 + (t - 0.5) * 0.8;
            y = 1.5 + (t - 0.5) * 0.4; // Slanted down towards center
        } else if (progress < 0.8) { // Wide Open Mouth (The Void)
            const t = (progress - 0.4) / 0.4;
            const width = 4;
            x = (t - 0.5) * width;
            // Upper and lower lips created by splitting the t-range
            if (t < 0.5) { // Upper lip
                y = -0.5 + Math.cos(t * Math.PI * 2) * 0.5;
            } else { // Lower lip
                y = -2.5 - Math.cos((t-0.5) * Math.PI * 2) * 0.8;
            }
        } else { // Sharp Horns/Face structure
            const angle = Math.random() * Math.PI * 2;
            x = Math.cos(angle) * 4.5;
            y = Math.sin(angle) * 5.5;
        }
        devilTargets[i*3] = x; devilTargets[i*3+1] = y; devilTargets[i*3+2] = z;

        // Surprised targets (simple wide eyes, open mouth)
        if (progress < 0.3) { // Wide Left Eye
            const angle = Math.random() * Math.PI * 2;
            x = -1.5 + Math.cos(angle) * 0.5;
            y = 1.5 + Math.sin(angle) * 0.5;
        } else if (progress < 0.6) { // Wide Right Eye
            const angle = Math.random() * Math.PI * 2;
            x = 1.5 + Math.cos(angle) * 0.5;
            y = 1.5 + Math.sin(angle) * 0.5;
        } else { // Open Mouth
            const t = (progress - 0.6) / 0.4;
            x = (t - 0.5) * 3;
            y = -1 + Math.sin(t * Math.PI) * 0.8;
        }
        surprisedTargets[i*3] = x; surprisedTargets[i*3+1] = y; surprisedTargets[i*3+2] = z;

        // Eye Target (original sphere with dent)
        const phi = Math.acos(-1 + (2 * i) / particleCount);
        const theta = Math.sqrt(particleCount * Math.PI) * phi;
        let ex = 3 * Math.cos(theta) * Math.sin(phi);
        let ey = 3 * Math.sin(theta) * Math.sin(phi);
        let ez = 3 * Math.cos(phi);

        const distToFront = Math.sqrt(ex*ex + ey*ey + (ez-3)*(ez-3));
        if(distToFront < 1.8) { ez -= 0.6; }

        eyeTargets[i*3] = ex;
        eyeTargets[i*3+1] = ey;
        eyeTargets[i*3+2] = ez;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const material = new THREE.PointsMaterial({ size: 0.04, color: 0x00fff2, transparent: true, blending: THREE.AdditiveBlending });
    const eyeMesh = new THREE.Points(geometry, material);
    scene.add(eyeMesh);

    camera.position.z = 10;

    // Dynamic Lighting (follows the eye)
    const eyeLight = new THREE.DirectionalLight(0xffffff, 1.2);
    eyeLight.position.set(5, 3, 5);
    scene.add(eyeLight);
    scene.add(new THREE.AmbientLight(0x222222));

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Glitch Detection & Fixing (adapted from eye.js)
    let isErrorActive = false;
    let isEyeFading = false;
    let errorFixTimer = null;
    let errorSchedulerTimer = null;

    const allowedSelectors = [
        '.scanned-target',
        '.hero-title',
        '.hero-subtitle',
        '.hero-description',
        '.cta-btn',
        'nav a',
        '.section-title',
        '.data-card-header',
        '#hero-main-title .text-primary',
        'h1', 'h2', 'h3', 'h4', 'p', 'button', 'a'
    ];

    const lastTargetTime = new WeakMap();
    const TARGET_COOLDOWN_MS = 3000;

    const errorTypes = [
        'COLOR_MISMATCH',
        'TEXT_CORRUPTION',
        'WORD_SWAP',
        'SPACER_MISSING',
        'SCRAMBLE',
        'GLITCH_FLICKER',
        'BLUR',
        'INVERT',
        'SHAKE',
        'CRITICAL'
    ];

    let currentError = {
        element: null,
        type: null,
        originalContent: null,
        originalClass: null,
        originalStyle: null,
        appliedEffects: []
    };

    let lastErrorType = null;

    function isElementInViewport(el) {
        if (!el || !el.getBoundingClientRect) return false;
        const r = el.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const viewportWidth = window.innerWidth || document.documentElement.clientWidth;

        // Element must be fully within viewport bounds
        return r.top >= 0 && r.left >= 0 && r.bottom <= viewportHeight && r.right <= viewportWidth;
    }

    function scrambleText(text) {
        if (!text) return text;
        const arr = text.split('');
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr.join('');
    }

    function randomGlitchString() {
        const samples = ['[DATA_ERR]', '[SYS:404]', '█▇▆▅', '??!?', '[MONITORING]', '[CORE_FAIL]'];
        return samples[Math.floor(Math.random() * samples.length)];
    }

    function chooseWeightedTarget(candidates) {
        if (!candidates || candidates.length === 0) return null;
        if (Math.random() < 0.2) return candidates[Math.floor(Math.random() * candidates.length)];

        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const biasFactor = 0.005;
        const weights = candidates.map((el) => {
            const r = el.getBoundingClientRect();
            const ex = r.left + r.width / 2;
            const ey = r.top + r.height / 2;
            const d = Math.hypot(ex - cx, ey - cy);
            return 1 / (1 + d * biasFactor);
        });
        const sum = weights.reduce((s, w) => s + w, 0);
        let rnd = Math.random() * sum;
        for (let i = 0; i < candidates.length; i++) {
            rnd -= weights[i];
            if (rnd <= 0) return candidates[i];
        }
        return candidates[candidates.length - 1];
    }

    function triggerError() {
        if (isErrorActive) {
            scheduleNextError();
            return;
        }

        const nodes = new Set();
        allowedSelectors.forEach(sel => {
            try {
                document.querySelectorAll(sel).forEach(n => nodes.add(n));
            } catch (e) {}
        });

        const candidates = Array.from(nodes).filter(el => el !== eyeMesh && isElementInViewport(el));
        const now = Date.now();
        const freshCandidates = candidates.filter(el => (now - (lastTargetTime.get(el) || 0)) > TARGET_COOLDOWN_MS);
        const visibleCandidates = freshCandidates.length ? freshCandidates : candidates;

        if (visibleCandidates.length === 0) {
            scheduleNextError();
            return;
        }

        isErrorActive = true;
        const target = chooseWeightedTarget(visibleCandidates);
        if (!target) {
            scheduleNextError();
            return;
        }

        lastTargetTime.set(target, Date.now());

        // Select error type different from last one
        let errorType;
        let attempts = 0;
        do {
            errorType = errorTypes[Math.floor(Math.random() * errorTypes.length)];
            attempts++;
        } while (errorType === lastErrorType && attempts < 10); // Prevent infinite loop

        lastErrorType = errorType;

        // Ensure target has content for text-based errors
        if ((errorType === 'TEXT_CORRUPTION' || errorType === 'SCRAMBLE') && !target.textContent.trim()) {
            scheduleNextError(); // Skip if no text
            return;
        }

        console.log('Triggering error on:', target.tagName, target.className, 'Type:', errorType);

        currentError.element = target;
        currentError.type = errorType;
        currentError.originalClass = target.className;
        currentError.originalContent = target.innerHTML;
        currentError.originalStyle = target.style.cssText;
        currentError.appliedEffects = [];

        // Inject error
        switch (errorType) {
            case 'COLOR_MISMATCH':
                target.classList.add('corrupted-pink');
                currentError.appliedEffects.push('corrupted-pink');
                gsap.fromTo(target, { opacity: 1 }, { opacity: 0.3, duration: 0.1, yoyo: true, repeat: 3 });
                break;
            case 'TEXT_CORRUPTION':
                currentError.originalContent = target.innerHTML;
                target.textContent = randomGlitchString();
                target.classList.add('corrupted-pink');
                currentError.appliedEffects.push('corrupted-pink');
                gsap.fromTo(target, { scale: 1 }, { scale: 1.1, duration: 0.2, yoyo: true, repeat: 2 });
                break;
            case 'SCRAMBLE':
                currentError.originalContent = target.innerHTML;
                target.textContent = scrambleText(target.textContent);
                target.classList.add('glitch-shake');
                currentError.appliedEffects.push('glitch-shake');
                gsap.fromTo(target, { rotation: 0 }, { rotation: 5, duration: 0.1, yoyo: true, repeat: 5 });
                break;
            case 'GLITCH_FLICKER':
                target.classList.add('glitch-flicker');
                currentError.appliedEffects.push('glitch-flicker');
                gsap.fromTo(target, { opacity: 1 }, { opacity: 0.5, duration: 0.05, yoyo: true, repeat: 10 });
                break;
            case 'WORD_SWAP':
                // Find another visible element to swap text with
                const otherCandidates = visibleCandidates.filter(el => el !== target && el.textContent.trim());
                if (otherCandidates.length) {
                    const other = otherCandidates[Math.floor(Math.random() * otherCandidates.length)];
                    currentError.otherElement = other;
                    currentError.otherOriginal = other.innerHTML;
                    const tmp = other.innerHTML;
                    other.innerHTML = target.innerHTML;
                    target.innerHTML = tmp;
                    target.classList.add('corrupted-pink');
                    other.classList.add('corrupted-pink');
                    currentError.appliedEffects.push('word-swap');
                    gsap.fromTo([target, other], { scale: 1 }, { scale: 1.05, duration: 0.2, yoyo: true, repeat: 2 });
                }
                break;
            case 'SPACER_MISSING':
                currentError.originalStyle = target.style.display;
                target.style.display = 'none';
                currentError.appliedEffects.push('spacer-missing');
                // No animation needed for hidden element
                break;
            case 'BLUR':
                target.style.filter = 'blur(3px)';
                currentError.appliedEffects.push('blur');
                gsap.fromTo(target, { opacity: 1 }, { opacity: 0.7, duration: 0.3, yoyo: true, repeat: 2 });
                break;
            case 'INVERT':
                target.style.filter = 'invert(1) hue-rotate(180deg)';
                currentError.appliedEffects.push('invert');
                gsap.fromTo(target, { scale: 1 }, { scale: 0.95, duration: 0.2, yoyo: true, repeat: 3 });
                break;
            case 'SHAKE':
                target.classList.add('glitch-shake');
                currentError.appliedEffects.push('glitch-shake');
                gsap.fromTo(target, { x: 0 }, { x: 5, duration: 0.1, yoyo: true, repeat: 10, ease: "power2.inOut" });
                break;
            case 'CRITICAL':
                // Combine multiple effects
                target.classList.add('corrupted-pink', 'glitch-flicker', 'glitch-shake');
                currentError.appliedEffects.push('corrupted-pink', 'glitch-flicker', 'glitch-shake');
                target.style.filter = 'blur(2px) invert(0.5)';
                currentError.appliedEffects.push('critical-blur-invert');
                gsap.fromTo(target, { rotation: 0, scale: 1 }, { rotation: 10, scale: 1.1, duration: 0.3, yoyo: true, repeat: 3 });
                break;
        }

        // Morph to eye shape and teleport near target
        gsap.to(geometry.attributes.position.array, {
            endArray: eyeTargets,
            duration: 0.5,
            ease: "power2.inOut",
            onUpdate: () => { geometry.attributes.position.needsUpdate = true; }
        });

        const rect = target.getBoundingClientRect();
        gsap.to(eyeMesh.position, {
            x: (rect.left + rect.width / 2 - window.innerWidth / 2) * 0.02,
            y: -(rect.top + rect.height / 2 - window.innerHeight / 2) * 0.02,
            z: 2, // Bring to foreground
            duration: 0.8,
            ease: "power2.inOut"
        });
        gsap.to(eyeMesh.scale, { x: 1, y: 1, z: 1, duration: 0.8 }, "-=0.8"); // Scale up for visibility

        setTimeout(() => {
            fixError();
        }, Math.random() * 2000 + 2000); // Increased to 2-4 seconds
    }

    function fixError() {
        if (!isErrorActive || !currentError.element) return;

        console.log('Fixing error on:', currentError.element.tagName, currentError.type);

        const target = currentError.element;

        // Restore content
        if (currentError.type === 'TEXT_CORRUPTION' || currentError.type === 'SCRAMBLE') {
            if (typeof currentError.originalContent === 'string') {
                target.innerHTML = currentError.originalContent;
            }
        } else if (currentError.type === 'WORD_SWAP') {
            // Swap back
            if (currentError.otherElement && typeof currentError.otherOriginal === 'string') {
                currentError.otherElement.innerHTML = currentError.otherOriginal;
            }
            if (typeof currentError.originalContent === 'string') {
                target.innerHTML = currentError.originalContent;
            }
        } else if (currentError.type === 'SPACER_MISSING') {
            target.style.display = currentError.originalStyle || '';
        } else if (currentError.type === 'BLUR') {
            target.style.filter = target.style.filter.replace('blur(3px)', '').trim();
        } else if (currentError.type === 'INVERT') {
            target.style.filter = target.style.filter.replace('invert(1) hue-rotate(180deg)', '').trim();
        } else if (currentError.type === 'CRITICAL') {
            target.style.filter = target.style.filter.replace('blur(2px) invert(0.5)', '').trim();
        }

        // Remove corruption
        currentError.appliedEffects.forEach(c => {
            try { target.classList.remove(c); } catch(e){}
        });
        target.classList.add('scanned');

        // Change color to green for fixing
        gsap.to(material.color, { r: 0, g: 1, b: 0, duration: 0.2 });
        // Pulse eye for "scan"
        gsap.to(material, { size: 0.06, duration: 0.5, yoyo: true, repeat: 1 });

        setTimeout(() => {
            target.classList.remove('scanned');
            if (typeof currentError.originalClass === 'string') {
                target.className = currentError.originalClass.trim();
            }
            // Change eye color back to cyan
            gsap.to(material.color, { r: 0, g: 1, b: 0.95, duration: 0.5 });
            enterObserveMode();
        }, 1500); // Increased to 1.5 seconds
    }

    function enterObserveMode() {
        isErrorActive = false;
        isEyeFading = false;

        // Morph back to face and return to corner
        gsap.to(geometry.attributes.position.array, {
            endArray: faceTargets,
            duration: 0.5,
            ease: "power2.inOut",
            onUpdate: () => { geometry.attributes.position.needsUpdate = true; }
        });

        gsap.to(eyeMesh.position, {
            x: 6, y: 3, z: -5,
            duration: 1,
            ease: "power2.inOut"
        });
        gsap.to(eyeMesh.scale, { x: 0.5, y: 0.5, z: 0.5, duration: 1 }, "-=1"); // Scale back down

        scheduleNextError();
    }

    function scheduleNextError() {
        if (errorSchedulerTimer) clearTimeout(errorSchedulerTimer);
        const next = Math.random() * 5000 + 5000; // 5-10 seconds
        console.log('Scheduling next error in', next, 'ms');
        errorSchedulerTimer = setTimeout(() => {
            console.log('Triggering scheduled error');
            triggerError();
        }, next);
    }

    // Mouse tracking for iris/pupil movement
    let mouse = { x: 0, y: 0 };
    window.addEventListener('mousemove', (e) => {
        mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
        mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // Assembly & Drift
    let isLoaded = false;

    function awakeGuardian() {
        const tl = gsap.timeline();

        // Assemble into face
        let assemblyProgress = 0;
        tl.to({progress: 1}, {
            progress: 1,
            duration: 4,
            ease: "power3.inOut",
            onUpdate: () => {
                assemblyProgress = tl.progress();
                const currentArray = geometry.attributes.position.array;

                // Interpolate to face positions
                for (let i = 0; i < particleCount * 3; i++) {
                    currentArray[i] = pos[i] + (faceTargets[i] - pos[i]) * assemblyProgress;
                }

                geometry.attributes.position.needsUpdate = true;
            }
        })
        .to(material, { size: 0.08, duration: 0.3, yoyo: true, repeat: 1 }) // Flash!
        .to('#preloader-ui', { opacity: 0, duration: 1 })
        .to(eyeMesh.position, {
            x: 6, y: 3, z: -5, // Drift to top-right corner
            duration: 2,
            ease: "power2.inOut"
        })
        .to(eyeMesh.scale, { x: 0.5, y: 0.5, z: 0.5, duration: 2 }, "-=2")
        .to(material, { opacity: 0.3, duration: 0.5 }) // Set to 0.3 like SVG
        .to('#main-content', { opacity: 1, duration: 1 }, "-=1");

        isLoaded = true;

        // Start glitch detection immediately
        scheduleNextError();
    }

    // Bug patching reaction
    function patchBugReaction() {
        gsap.to(material.color, { r: 1, g: 0, b: 0, duration: 0.1 }); // Turn Red
        gsap.to(eyeMesh.scale, { x: 0.7, y: 0.7, z: 0.7, yoyo: true, repeat: 1, duration: 0.2 }); // Pulse
        setTimeout(() => {
            gsap.to(material.color, { r: 0, g: 1, b: 0.95, duration: 0.5 }); // Turn back to Cyan
        }, 500);
    }

    function animate() {
        requestAnimationFrame(animate);

        if (isLoaded) {
            // Update dynamic lighting position relative to eye
            eyeLight.position.x = eyeMesh.position.x + 3;
            eyeLight.position.y = eyeMesh.position.y + 3;
            eyeLight.position.z = eyeMesh.position.z + 3;
            eyeLight.target.position.copy(eyeMesh.position);
            eyeLight.target.updateMatrixWorld();

            if (!isErrorActive && !isEyeFading) {
                // Turn head to look at mouse (rotation only)
                const mouse3D = new THREE.Vector3(mouse.x * 10, -mouse.y * 10, 0);
                eyeMesh.lookAt(mouse3D);

                // Subtle blinking
                const time = Date.now() * 0.001;
                if (Math.sin(time * 2) > 0.95) {
                    material.opacity = 0.1;
                } else {
                    material.opacity = 0.3;
                }

                // Sinister face jitter
                eyeMesh.position.x += (Math.random() - 0.5) * 0.01;
                eyeMesh.position.y += (Math.random() - 0.5) * 0.01;

                // If in Devil state, violent jitter
                if (material.color.r > 0.8) { // Detecting Red/Sinister state
                    eyeMesh.position.x += (Math.random() - 0.5) * 0.05;
                    eyeMesh.position.y += (Math.random() - 0.5) * 0.05;
                }
            }
        }

        renderer.render(scene, camera);
    }

    animate();
    window.addEventListener('load', awakeGuardian);

    // Expression Engine
    const expressions = {
        happy: { color: 0x00ffff, css: '#00ffff', target: faceTargets },
        sinister: { color: 0xff0000, css: '#ff0000', target: devilTargets },
        surprised: { color: 0xffaa00, css: '#ffaa00', target: surprisedTargets }
    };

    function switchMood(mood) {
        const theme = expressions[mood];

        // 1. Morph Particles
        gsap.to(geometry.attributes.position.array, {
            endArray: theme.target,
            duration: 1,
            ease: "expo.out",
            onUpdate: () => { geometry.attributes.position.needsUpdate = true; }
        });

        // 2. Change Three.js Color
        gsap.to(material.color, {
            r: new THREE.Color(theme.color).r,
            g: new THREE.Color(theme.color).g,
            b: new THREE.Color(theme.color).b,
            duration: 1
        });

        // 3. Update CSS Variables (Site-wide theme)
        document.documentElement.style.setProperty('--color-primary', theme.css);
    }

    // Scan animation for description text
    function scanDescriptionIntoExistence() {
        const descElement = document.getElementById('hero-description-scan');
        if (!descElement) return;

        const text = descElement.textContent;
        descElement.textContent = '';
        descElement.classList.remove('scanned');
        
        let charIndex = 0;
        const scanInterval = setInterval(() => {
            if (charIndex < text.length) {
                descElement.textContent += text[charIndex];
                charIndex++;
            } else {
                clearInterval(scanInterval);
                descElement.classList.add('scanned');
            }
        }, 10); // ~10ms per character = ~5 seconds for full text
    }

    // Trigger scan 2 seconds after page load
    setTimeout(() => {
        console.log('Initiating observer scan...');
        scanDescriptionIntoExistence();
    }, 2000);

    // Devil Glitch
    function triggerDevilGlitch() {
        // Sudden snap to Devil
        switchMood('sinister');
        document.body.classList.add('emergency-glitch'); // Add CSS shake/flicker

        console.warn("SYSTEM_HIJACK_DETECTED");

        // Snap back to Happy after 800ms
        setTimeout(() => {
            switchMood('happy');
            document.body.classList.remove('emergency-glitch');
        }, 800);
    }

    // Trigger devil glitch 10 seconds after page load (after scan completes)
    setTimeout(() => {
        console.log('Triggering initial devil glitch...');
        triggerDevilGlitch();
    }, 10000);

    // Randomly glitch every 20-40 seconds after the initial trigger
    setTimeout(() => {
        setInterval(() => {
            if (Math.random() > 0.7) triggerDevilGlitch();
        }, 20000);
    }, 5000);

    // Export for other scripts
    window.patchBugReaction = patchBugReaction;
    window.switchMood = switchMood;
    window.triggerDevilGlitch = triggerDevilGlitch;

});