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

    // Three.js Observer Shell Preloader
    const container = document.getElementById('canvas-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // 1. The Anatomical Particle Eye
    const particleCount = 12000;
    const geometry = new THREE.BufferGeometry();
    const pos = new Float32Array(particleCount * 3);
    const targets = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        // Chaos Start
        pos[i*3] = (Math.random()-0.5)*50;
        pos[i*3+1] = (Math.random()-0.5)*50;
        pos[i*3+2] = (Math.random()-0.5)*50;

        // Eye Target Math (Sphere + Iris Dent)
        const phi = Math.acos(-1 + (2 * i) / particleCount);
        const theta = Math.sqrt(particleCount * Math.PI) * phi;
        let x = 3 * Math.cos(theta) * Math.sin(phi);
        let y = 3 * Math.sin(theta) * Math.sin(phi);
        let z = 3 * Math.cos(phi);

        // Create the "Iris Dent" on the front (z > 2)
        const distToFront = Math.sqrt(x*x + y*y + (z-3)*(z-3));
        if(distToFront < 1.8) { z -= 0.6; } // Carve the pupil hole

        targets[i*3] = x;
        targets[i*3+1] = y;
        targets[i*3+2] = z;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const material = new THREE.PointsMaterial({ size: 0.04, color: 0x00fff2, transparent: true, blending: THREE.AdditiveBlending });
    const eyeMesh = new THREE.Points(geometry, material);
    scene.add(eyeMesh);

    camera.position.z = 10;

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // 3. The "Awakening" & Drift
    let isLoaded = false;

    function awakeGuardian() {
        const tl = gsap.timeline();

        // Assemble the eye
        let assemblyProgress = 0;
        tl.to({progress: 1}, {
            progress: 1,
            duration: 4,
            ease: "power3.inOut",
            onUpdate: () => {
                assemblyProgress = tl.progress();
                const currentArray = geometry.attributes.position.array;

                // Interpolate positions
                for (let i = 0; i < particleCount * 3; i++) {
                    currentArray[i] = pos[i] + (targets[i] - pos[i]) * assemblyProgress;
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
        .to('#main-content', { opacity: 1, duration: 1 }, "-=1");

        isLoaded = true;
    }

    // 4. The Bug Patching Reaction
    function patchBugReaction() {
        gsap.to(material.color, { r: 1, g: 0, b: 0, duration: 0.1 }); // Turn Red
        gsap.to(eyeMesh.scale, { x: 0.7, y: 0.7, z: 0.7, yoyo: true, repeat: 1, duration: 0.2 }); // Pulse
        setTimeout(() => {
            gsap.to(material.color, { r: 0, g: 1, b: 0.95, duration: 0.5 }); // Turn back to Cyan
        }, 500);
    }

    // 5. Interactive Eye Rotation
    let mouse = { x: 0, y: 0 };
    window.addEventListener('mousemove', (e) => {
        mouse.x = (e.clientX / window.innerWidth) - 0.5;
        mouse.y = (e.clientY / window.innerHeight) - 0.5;
    });

    function animate() {
        requestAnimationFrame(animate);

        // Look-at logic (follows mouse with a slight lag)
        if (isLoaded) {
            eyeMesh.rotation.y += (mouse.x * 1.5 - eyeMesh.rotation.y) * 0.1;
            eyeMesh.rotation.x += (-mouse.y * 1.5 - eyeMesh.rotation.x) * 0.1;
        }

        renderer.render(scene, camera);
    }

    animate();
    window.addEventListener('load', awakeGuardian);

    // Export the patch function (for use in other scripts)
    window.patchBugReaction = patchBugReaction;

});