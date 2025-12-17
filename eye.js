// =========================================================================
// OBSERVER EYE SYSTEM MAINTENANCE MODULE
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
    const observerEyeContainer = document.getElementById('observer-eye-container');
    const observerEye = document.getElementById('observer-eye');
    const pupil = document.getElementById('pupil');
    const iris = document.getElementById('iris');
    const scanTargets = document.querySelectorAll('.scanned-target');
    const heroSubtitle = document.getElementById('hero-subtitle');

    if (observerEyeContainer && observerEye && pupil) {
        console.log('Observer eye initialized');
        // --- State Variables ---
        let lastMouseX = 0;
        let lastMouseY = 0;
        let isErrorActive = false;
        let isEyeFading = false;
        let isObservingUser = false;
        let errorFixTimer = null;
        let userWatchTimer = null;
        let laserTimer = null;
        let errorSchedulerTimer = null; // tracks scheduled next error

        // Elements eligible for glitches (broad but targeted)
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

        // Track recently targeted elements to avoid repeat glitches
        const lastTargetTime = new WeakMap();
        const TARGET_COOLDOWN_MS = 3000; // 3s cooldown per element (reduced)

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

        // --- Error Tracking Object ---
        let currentError = {
            element: null,
            type: null,
            originalContent: null,
            originalClass: null,
            originalStyle: null,
            appliedEffects: []
        }; 

        const createParticles = (x, y, count = 5) => {
            for (let i = 0; i < count; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = `${x + (Math.random() - 0.5) * 20}px`;
                particle.style.top = `${y + (Math.random() - 0.5) * 20}px`;
                document.body.appendChild(particle);
                setTimeout(() => document.body.removeChild(particle), 2000);
            }
        };

        const createEchoes = (x, y, count = 2) => {
            for (let i = 0; i < count; i++) {
                const echo = document.createElement('div');
                echo.className = 'echo-eye';
                echo.style.left = `${x - 24 + (Math.random() - 0.5) * 40}px`;
                echo.style.top = `${y - 24 + (Math.random() - 0.5) * 40}px`;
                document.body.appendChild(echo);
                setTimeout(() => document.body.removeChild(echo), 1000);
            }
        };

        // Check whether an element is significantly visible in the viewport (at least 25% visible)
        const isElementInViewport = (el) => {
            if (!el || !el.getBoundingClientRect) return false;
            const r = el.getBoundingClientRect();
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
            
            // Element must be at least partially in viewport
            const isPartiallyInViewport = r.bottom > 0 && r.right > 0 && r.top < viewportHeight && r.left < viewportWidth;
            if (!isPartiallyInViewport) return false;
            
            // Calculate visibility percentage - must be at least 25% visible
            const visibleHeight = Math.min(r.bottom, viewportHeight) - Math.max(r.top, 0);
            const visibleWidth = Math.min(r.right, viewportWidth) - Math.max(r.left, 0);
            const elementArea = r.width * r.height;
            const visibleArea = Math.max(0, visibleHeight) * Math.max(0, visibleWidth);
            const visibilityPercent = elementArea > 0 ? (visibleArea / elementArea) * 100 : 0;
            
            return visibilityPercent >= 25;
        };

        // Helper: scramble text letters
        const scrambleText = (text) => {
            if (!text) return text;
            const arr = text.split('');
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr.join('');
        };

        // Helper: produce a short glitch string
        const randomGlitchString = () => {
            const samples = ['[DATA_ERR]', '[SYS:404]', '█▇▆▅', '??!?', '[MONITORING]', '[CORE_FAIL]'];
            return samples[Math.floor(Math.random() * samples.length)];
        };

        // Helper: spawn critical error code snippets
        const spawnCodeBleed = () => {
            const codeSnippets = [
                'const init = () => {',
                'let memory = new Array(1024)',
                'if (!authenticate()) {',
                'throw new ReferenceError()',
                'buffer.overflow()',
                'system.critical()',
                'return undefined',
                'socket.close()',
                '}',
                'function reboot() {}'
            ];
            const count = Math.floor(Math.random() * 3) + 2; // 2-4 snippets
            for (let i = 0; i < count; i++) {
                const snippet = document.createElement('div');
                snippet.className = 'code-bleed';
                snippet.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
                snippet.style.left = Math.random() * 100 + '%';
                snippet.style.top = (Math.random() * 50 - 10) + '%';
                snippet.style.zIndex = '1000';
                snippet.style.pointerEvents = 'none';
                document.body.appendChild(snippet);
                currentError.bleedSnippets = currentError.bleedSnippets || [];
                currentError.bleedSnippets.push(snippet);
                const removeTimer = setTimeout(() => { try { document.body.removeChild(snippet); } catch(e){} }, 8000);
                if (!currentError.timers) currentError.timers = [];
                currentError.timers.push(removeTimer);
            }
        };

        // Helper: pick a target biased toward the viewport center but only from visible candidates
        const chooseWeightedTarget = (candidates) => {
            if (!candidates || candidates.length === 0) return null;

            // 20% of the time pick uniformly at random to spread glitches
            if (Math.random() < 0.2) return candidates[Math.floor(Math.random() * candidates.length)];

            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            const biasFactor = 0.005; // mild center bias
            const weights = candidates.map((el) => {
                const r = el.getBoundingClientRect();
                const ex = r.left + r.width / 2;
                const ey = r.top + r.height / 2;
                const d = Math.hypot(ex - cx, ey - cy);
                // mild bias toward center
                return 1 / (1 + d * biasFactor);
            });
            const sum = weights.reduce((s, w) => s + w, 0);
            let rnd = Math.random() * sum;
            for (let i = 0; i < candidates.length; i++) {
                rnd -= weights[i];
                if (rnd <= 0) return candidates[i];
            }
            return candidates[candidates.length - 1];
        };

        const teleportEye = (targetX = null, targetY = null, options = { fadeTo: 0.3 }) => {
            if (isEyeFading) return;
            isEyeFading = true;
            const rect = observerEyeContainer.getBoundingClientRect();
            const oldX = rect.left + rect.width / 2;
            const oldY = rect.top + rect.height / 2;

            observerEyeContainer.style.opacity = '0';
            observerEyeContainer.style.transition = 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

            setTimeout(() => {
                createParticles(oldX, oldY);
                createEchoes(oldX, oldY);

                const eyeSize = observerEye.offsetWidth;
                const viewportW = window.innerWidth;
                const viewportH = window.innerHeight;

                let randomX, randomY;
                if (targetX !== null && targetY !== null) {
                    const offset = 150;
                    randomX = Math.max(100, Math.min(viewportW - 100 - eyeSize, targetX + (Math.random() - 0.5) * offset));
                    randomY = Math.max(100, Math.min(viewportH - 100 - eyeSize, targetY + (Math.random() - 0.5) * offset));
                } else {
                    const margin = 100;
                    const maxX = viewportW - eyeSize - margin;
                    const maxY = viewportH - eyeSize - margin;
                    randomX = Math.random() * (maxX - margin) + margin;
                    randomY = Math.random() * (maxY - margin) + margin;
                }

                observerEyeContainer.style.left = `${randomX}px`;
                observerEyeContainer.style.top = `${randomY}px`;
                observerEyeContainer.style.transition = 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                observerEyeContainer.style.opacity = String(options.fadeTo);
                isEyeFading = false;
            }, 300);
        };

        // Pupil/laser focus and short scan animation
        const pupilFocusAndScan = (targetX, targetY, showLaser = false) => {
            if (!observerEyeContainer || !observerEye || !pupil) return;

            const eyeRect = observerEye.getBoundingClientRect();
            const eyeCenterX = eyeRect.left + eyeRect.width / 2;
            const eyeCenterY = eyeRect.top + eyeRect.height / 2;

            const angle = Math.atan2(targetY - eyeCenterY, targetX - eyeCenterX);
            const dist = Math.hypot(targetX - eyeCenterX, targetY - eyeCenterY);

            // small pupil offset toward target
            const movementRange = Math.min(18, Math.max(8, Math.min(dist * 0.08, 18)));
            const dx = Math.cos(angle) * movementRange;
            const dy = Math.sin(angle) * movementRange;

            try { pupil.setAttribute('transform', `translate(${dx}, ${dy})`); } catch(e){}
            try { iris.setAttribute('transform', `translate(${dx * 0.25}, ${dy * 0.25})`); } catch(e){}

            // particles at impact
            createParticles(targetX, targetY, 6);

            // clear previous timer and set a fade-out
            if (laserTimer) clearTimeout(laserTimer);
            laserTimer = setTimeout(() => {
                // reset pupil slowly
                try { pupil.setAttribute('transform', `translate(0, 0)`); } catch(e){}
                try { iris.setAttribute('transform', `translate(0, 0)`); } catch(e){}
            }, 900);
        };

        // =========================================================================
        // CORE FUNCTION: INJECT ERROR
        // =========================================================================
        const triggerError = () => {
            // Keep scheduler healthy: catch any unexpected errors and reschedule
            let target = null;
            let errorType = null;
            try {
                // If an error is already active, reschedule rather than silently returning
                if (isErrorActive) {
                    console.log('triggerError: error already active, rescheduling');
                    scheduleNextError();
                    return;
                }

                // Build a broader candidate list from allowed selectors
                const nodes = new Set();
                allowedSelectors.forEach(sel => {
                    try {
                        document.querySelectorAll(sel).forEach(n => nodes.add(n));
                    } catch (e) { /* ignore invalid selectors */ }
                });

                const candidates = Array.from(nodes).filter(el => el !== observerEyeContainer && el !== observerEye && isElementInViewport(el));

                // Apply cooldown so a single element doesn't glitch repeatedly
                const now = Date.now();
                const freshCandidates = candidates.filter(el => {
                    const t = lastTargetTime.get(el) || 0;
                    return (now - t) > TARGET_COOLDOWN_MS;
                });

                const visibleCandidates = freshCandidates.length ? freshCandidates : candidates;

                if (visibleCandidates.length === 0) {
                    scheduleNextError();
                    return;
                }

                isErrorActive = true;
                isObservingUser = false;

                // Pick a target biased toward the viewport center to ensure glitches are visible to the user
                target = chooseWeightedTarget(visibleCandidates);
                if (!target) {
                    console.log('triggerError: chooseWeightedTarget returned null, rescheduling');
                    scheduleNextError();
                    return;
                }
                errorType = errorTypes[Math.floor(Math.random() * errorTypes.length)];

                // Record the time this element was targeted
                lastTargetTime.set(target, Date.now());

                currentError.element = target;
                currentError.type = errorType;
                currentError.originalClass = target.className;
                currentError.originalContent = target.innerHTML;
                currentError.originalStyle = target.style.cssText;
                currentError.appliedEffects = [];

                console.log('Triggering error', { target: target.tagName, classes: target.className, errorType });

                // 1. Inject the Error (diversified)
                switch (errorType) {
                    case 'COLOR_MISMATCH':
                        target.classList.add('corrupted-pink');
                        currentError.appliedEffects.push('corrupted-pink');
                        break;
                    case 'TEXT_CORRUPTION':
                        // replace visible text with a glitch string
                        currentError.originalContent = target.innerHTML;
                        try { target.textContent = randomGlitchString(); } catch (e) { target.innerHTML = randomGlitchString(); }
                        target.classList.add('corrupted-pink');
                        currentError.appliedEffects.push('corrupted-pink');
                        break;
                    case 'WORD_SWAP':
                        // find another visible candidate and swap texts
                        const otherCandidates = visibleCandidates.filter(el => el !== target);
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
                        }
                        break;
                    case 'SPACER_MISSING':
                        currentError.originalStyle = target.style.display;
                        target.style.display = 'none';
                        currentError.appliedEffects.push('spacer-missing');
                        break;
                    case 'SCRAMBLE':
                        currentError.originalContent = target.innerHTML;
                        try { target.textContent = scrambleText(target.textContent); } catch (e) { target.innerHTML = scrambleText(target.innerText || target.textContent || ''); }
                        target.classList.add('glitch-shake');
                        currentError.appliedEffects.push('glitch-shake');
                        break;
                    case 'GLITCH_FLICKER':
                        target.classList.add('glitch-flicker');
                        currentError.appliedEffects.push('glitch-flicker');
                        break;
                    case 'BLUR':
                        target.classList.add('glitch-blur');
                        currentError.appliedEffects.push('glitch-blur');
                        break;
                    case 'INVERT':
                        target.classList.add('glitch-invert');
                        currentError.appliedEffects.push('glitch-invert');
                        break;
                    case 'SHAKE':
                        target.classList.add('glitch-shake');
                        currentError.appliedEffects.push('glitch-shake');
                        break;
                    case 'CRITICAL':
                        // Spawn code snippets bleeding across page
                        target.classList.add('critical-alert');
                        currentError.appliedEffects.push('critical-alert');
                        spawnCodeBleed();
                        break;
                }

                // teleport eye near the target and schedule the Fix
                try {
                    const rect = target.getBoundingClientRect();
                    teleportEye(rect.left + rect.width / 2, rect.top + rect.height / 2, { fadeTo: 1.0 });
                } catch (e) { /* ignore */ }

                setTimeout(() => {
                    fixError();
                }, Math.random() * 1000 + 300); // 0.3 - 1.3s
            } catch (err) {
                console.error('triggerError failed:', err);
                // Ensure scheduler continues
                try { scheduleNextError(); } catch (e) { /* ignore */ }
                return;
            }


 
        };

        // =========================================================================
        // CORE FUNCTION: FIX ERROR (The Eye's Action)
        // =========================================================================
        const fixError = () => {
            if (!isErrorActive || !currentError.element) return;

            const target = currentError.element;
            const targetRect = target.getBoundingClientRect();

            // Handle invisible elements (e.g., display:none)
            if (targetRect.width === 0 && targetRect.height === 0) {
                if (currentError.type === 'SPACER_MISSING') {
                    target.style.display = currentError.originalStyle;
                    target.classList.remove('corrupted-color');
                    target.classList.add('scanned');
                    enterObserveMode();
                    return;
                }
            } 

            // 1. Calculate Target Position
            const targetCenterX = targetRect.left + targetRect.width / 2;
            const targetCenterY = targetRect.top + targetRect.height / 2;

            // 2. Move Eye to Target
            isEyeFading = true;
            observerEyeContainer.style.opacity = '1';

            const eyeSize = observerEye.offsetWidth;
            const eyeTargetX = Math.max(0, targetCenterX - eyeSize * 2.5);
            const eyeTargetY = Math.max(0, targetCenterY - eyeSize / 2);

            observerEyeContainer.style.transition = 'left 0.7s cubic-bezier(0.4, 0, 0.2, 1), top 0.7s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-in-out';
            observerEyeContainer.style.left = `${eyeTargetX}px`;
            observerEyeContainer.style.top = `${eyeTargetY}px`;

            // 3. Initiate Scan/Fix
            setTimeout(() => {
                target.classList.remove('corrupted-color');
                target.classList.add('scanned');

                pupilFocusAndScan(targetCenterX, targetCenterY, true);
            }, 800);

            // 4. Final Revert: apply a brief 'scanned' highlight, then fully restore original state
            errorFixTimer = setTimeout(() => {
                // Restore content / display
                if (currentError.type === 'TEXT_CORRUPTION') {
                    if (typeof currentError.originalContent === 'string') {
                        target.innerHTML = currentError.originalContent;
                    }
                } else if (currentError.type === 'WORD_SWAP') {
                    // swap back if other element was stored
                    if (currentError.otherElement && typeof currentError.otherOriginal === 'string') {
                        currentError.otherElement.innerHTML = currentError.otherOriginal;
                    }
                    if (typeof currentError.originalContent === 'string') {
                        target.innerHTML = currentError.originalContent;
                    }
                } else if (currentError.type === 'SPACER_MISSING') {
                    target.style.display = currentError.originalStyle;
                } else if (currentError.type === 'SCRAMBLE') {
                    if (typeof currentError.originalContent === 'string') target.innerHTML = currentError.originalContent;
                }

                // Remove corruption visuals but keep a short scanned highlight
                currentError.appliedEffects.forEach(c => {
                    try { target.classList.remove(c); } catch(e){}
                });
                target.classList.add('scanned');

                // After brief highlight, remove 'scanned' and restore original classes exactly
                setTimeout(() => {
                    target.classList.remove('scanned');
                    if (typeof currentError.originalClass === 'string') {
                        // Restore to original class list exactly
                        target.className = currentError.originalClass.trim();
                    } else {
                        // remove any lingering special classes
                        ['corrupted-pink','glitch-flicker','glitch-blur','glitch-invert','glitch-shake'].forEach(c => { try { target.classList.remove(c); } catch(e){} });
                    }

                    // clear appliedEffects
                    currentError.appliedEffects = [];

                    // Enter observe mode once the visual revert is complete
                    enterObserveMode();
                }, 700);
            }, 800);
        };

        // Helper function to clean up after the fix
        const resetErrorState = (hide = false) => {
             isErrorActive = false;
             isEyeFading = false;

             if (hide) {
                 // Snap Eye Off-Screen
                 observerEyeContainer.style.left = '-100px';
                 observerEyeContainer.style.top = '-100px';
                 observerEyeContainer.style.opacity = '0';
             }

             currentError = { element: null, type: null, originalContent: null, originalClass: null, originalStyle: null };
        }

        // =========================================================================
        // OBSERVATION MODE & SCHEDULER
        // =========================================================================

        const enterObserveMode = () => {
            // Eye remains visible and follows the user until a new visible glitch occurs
            isErrorActive = false;
            isEyeFading = false;
            isObservingUser = true;

            observerEyeContainer.style.transition = 'left 0.35s cubic-bezier(0.4, 0, 0.2, 1), top 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease-in-out';

            const eyeX = Math.max(10, Math.min(window.innerWidth - observerEye.offsetWidth - 10, lastMouseX - observerEye.offsetWidth / 2));
            const eyeY = Math.max(10, Math.min(window.innerHeight - observerEye.offsetHeight - 10, lastMouseY - observerEye.offsetHeight / 2));
            observerEyeContainer.style.left = `${eyeX}px`;
            observerEyeContainer.style.top = `${eyeY}px`;
            observerEyeContainer.style.opacity = '0.95';

            // Schedule the next glitch
            scheduleNextError();
        };

        const scheduleNextError = () => {
            // Clear any previously scheduled attempt so we don't silently stop or duplicate timers
            if (errorSchedulerTimer) {
                clearTimeout(errorSchedulerTimer);
                errorSchedulerTimer = null;
            }
            const next = Math.random() * 7000 + 8000; // 8-15 seconds
            console.log('Scheduling next error in', Math.round(next), 'ms');
            errorSchedulerTimer = setTimeout(() => {
                errorSchedulerTimer = null;
                triggerError();
            }, next);
        };

        // =========================================================================
        // MOUSE TRACKING UPDATE
        // =========================================================================

        // Throttle mousemove for better performance
        let lastMouseMove = 0;
        const MOUSEMOVE_THROTTLE = 16; // ~60fps
        window.addEventListener('mousemove', (e) => {
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
            const now = performance.now();
            if (now - lastMouseMove < MOUSEMOVE_THROTTLE) return;
            lastMouseMove = now;

            // Only track if the eye is visible and NOT fixing an error
            if (observerEyeContainer && observerEyeContainer.style.opacity > 0.1 && !isErrorActive && !isEyeFading) {
                const eyeRect = observerEye.getBoundingClientRect();
                const eyeCenterX = eyeRect.left + eyeRect.width / 2;
                const eyeCenterY = eyeRect.top + eyeRect.height / 2;

                const predictionTime = 0.5;
                const predictedX = e.clientX + (e.movementX || 0) * predictionTime;
                const predictedY = e.clientY + (e.movementY || 0) * predictionTime;

                const angle = Math.atan2(predictedY - eyeCenterY, predictedX - eyeCenterX);
                const mouseDistance = Math.hypot(predictedX - eyeCenterX, predictedY - eyeCenterY);

                const movementRange = 15;
                const dx = Math.cos(angle) * movementRange;
                const dy = Math.sin(angle) * movementRange;

                pupil.setAttribute('transform', `translate(${dx}, ${dy})`);
                iris.setAttribute('transform', `translate(${dx * 0.2}, ${dy * 0.2})`);

                // If cursor approaches the eye while observing, gently move it away (do not hide)
                if (mouseDistance < 150 && isObservingUser) {
                    const awayX = Math.max(10, Math.min(window.innerWidth - observerEye.offsetWidth - 10, eyeCenterX - dx * 4));
                    const awayY = Math.max(10, Math.min(window.innerHeight - observerEye.offsetHeight - 10, eyeCenterY - dy * 4));
                    observerEyeContainer.style.left = `${awayX}px`;
                    observerEyeContainer.style.top = `${awayY}px`;
                }
            } else {
                 if (userWatchTimer) {
                     clearTimeout(userWatchTimer);
                     userWatchTimer = null;
                 }
            }
        });

        // =========================================================================
        // BLINKING
        // =========================================================================

        setInterval(() => {
            const op = parseFloat(window.getComputedStyle(observerEyeContainer).opacity || '0');
            if (op > 0.05) {
                observerEye.classList.add('blink');
                setTimeout(() => observerEye.classList.remove('blink'), 100);
            }
        }, Math.random() * 2000 + 3000);

        // =========================================================================
        // INITIALIZATION
        // =========================================================================

        // Trigger an initial error shortly after load (for demonstration)
        const initialErrorTimer = setTimeout(triggerError, 500);

        // Start the randomized scheduler
        scheduleNextError();

        // Initial position off-screen
        observerEyeContainer.style.left = '-100px';
        observerEyeContainer.style.top = '-100px';
        observerEyeContainer.style.opacity = '0';

        // Cleanup on page unload to prevent memory leaks
        window.addEventListener('beforeunload', () => {
            if (initialErrorTimer) clearTimeout(initialErrorTimer);
            if (errorSchedulerTimer) clearTimeout(errorSchedulerTimer);
            if (errorFixTimer) clearTimeout(errorFixTimer);
            if (userWatchTimer) clearTimeout(userWatchTimer);
            if (laserTimer) clearTimeout(laserTimer);
            if (currentError.timers) currentError.timers.forEach(t => clearTimeout(t));
        });
    }
});
