/**
 * Creates confetti effect on the screen
 * @param {number} duration - How long confetti should fall (in ms)
 * @param {number} particleCount - Number of confetti pieces
 * @param {boolean} isNewYear - Whether this is a New Year celebration (more intense)
 */
export function createConfetti(duration = 5000, particleCount = 150, isNewYear = false) {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    document.body.appendChild(confettiContainer);

    const colors = isNewYear 
        ? ['#FFD700', '#FFA500', '#FF6B6B', '#4ECDC4', '#45B7D1', '#F38181', '#AA96DA', '#FCBAD3', '#00FF00', '#FF1493']
        : ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4ecdc4', '#45b7d1', '#f38181', '#aa96da', '#fcbad3'];

    // Increase particle count for New Year
    const finalParticleCount = isNewYear ? particleCount * 2 : particleCount;

    for (let i = 0; i < finalParticleCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.animationDelay = (Math.random() * (isNewYear ? 1 : 2)) + 's';
        confetti.style.width = (Math.random() * (isNewYear ? 15 : 10) + 5) + 'px';
        confetti.style.height = (Math.random() * (isNewYear ? 15 : 10) + 5) + 'px';
        
        // Random shapes - more variety for New Year
        const shapeRandom = Math.random();
        if (shapeRandom > 0.7) {
            confetti.style.borderRadius = '50%';
        } else if (isNewYear && shapeRandom > 0.4) {
            confetti.style.borderRadius = '2px';
            confetti.style.transform = 'rotate(45deg)';
        }
        
        confettiContainer.appendChild(confetti);
    }

    // Remove confetti container after animation
    setTimeout(() => {
        confettiContainer.remove();
    }, duration + 3000);
}

/**
 * Creates fireworks effect
 * @param {number} count - Number of fireworks to create
 * @param {boolean} isNewYear - Whether this is a New Year celebration (more intense)
 */
export function createFireworks(count = 5, isNewYear = false) {
    const colors = isNewYear
        ? ['#FFD700', '#FFA500', '#ff6b6b', '#ffd93d', '#6bcf7f', '#4ecdc4', '#45b7d1', '#f38181', '#00FF00', '#FF1493']
        : ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4ecdc4', '#45b7d1', '#f38181'];
    
    const finalCount = isNewYear ? count * 3 : count;
    const particlesPerBurst = isNewYear ? 40 : 30;
    
    for (let i = 0; i < finalCount; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * (window.innerHeight * 0.5);
            
            for (let j = 0; j < particlesPerBurst; j++) {
                const firework = document.createElement('div');
                firework.className = 'firework';
                firework.style.left = x + 'px';
                firework.style.top = y + 'px';
                firework.style.background = colors[Math.floor(Math.random() * colors.length)];
                
                const angle = (Math.PI * 2 * j) / particlesPerBurst;
                const velocity = Math.random() * (isNewYear ? 150 : 100) + 50;
                firework.style.setProperty('--tx', Math.cos(angle) * velocity + 'px');
                firework.style.setProperty('--ty', Math.sin(angle) * velocity + 'px');
                
                // Add glow effect for New Year
                if (isNewYear) {
                    firework.style.boxShadow = `0 0 10px ${colors[Math.floor(Math.random() * colors.length)]}`;
                    firework.style.width = '6px';
                    firework.style.height = '6px';
                }
                
                document.body.appendChild(firework);
                
                setTimeout(() => firework.remove(), 1000);
            }
        }, i * (isNewYear ? 300 : 400));
    }
}

/**
 * Creates shooting stars effect (New Year exclusive)
 */
export function createShootingStars() {
    const starContainer = document.createElement('div');
    starContainer.className = 'shooting-stars-container';
    starContainer.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 998;';
    document.body.appendChild(starContainer);
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const star = document.createElement('div');
            star.className = 'shooting-star';
            star.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: white;
                border-radius: 50%;
                box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.8),
                           0 0 20px 4px rgba(135, 206, 250, 0.6);
                top: ${Math.random() * 30}%;
                left: ${Math.random() * 100}%;
                animation: shootingStar ${2 + Math.random()}s linear forwards;
            `;
            starContainer.appendChild(star);
            setTimeout(() => star.remove(), 3000);
        }, i * 600);
    }
    
    setTimeout(() => starContainer.remove(), 6000);
}

/**
 * Creates sparkle effect around the screen (New Year exclusive)
 */
export function createSparkles() {
    const sparkleContainer = document.createElement('div');
    sparkleContainer.className = 'sparkle-container';
    sparkleContainer.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 997;';
    document.body.appendChild(sparkleContainer);
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.cssText = `
                position: absolute;
                width: ${4 + Math.random() * 8}px;
                height: ${4 + Math.random() * 8}px;
                background: radial-gradient(circle, #fff 0%, transparent 70%);
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: sparkleAnimation ${1 + Math.random() * 2}s ease-in-out forwards;
                opacity: 0;
            `;
            sparkleContainer.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 3000);
        }, i * 100);
    }
    
    setTimeout(() => sparkleContainer.remove(), 8000);
}

/**
 * Creates a countdown number animation (3, 2, 1, Happy New Year!)
 */
export function createCountdownAnimation() {
    return new Promise((resolve) => {
        const countdownEl = document.createElement('div');
        countdownEl.className = 'countdown-animation';
        countdownEl.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 15vw;
            font-weight: bold;
            color: #FFD700;
            text-shadow: 0 0 20px rgba(255, 215, 0, 0.8),
                        0 0 40px rgba(255, 215, 0, 0.6),
                        0 0 60px rgba(255, 215, 0, 0.4);
            z-index: 1001;
            opacity: 0;
            animation: countdownPulse 1s ease-in-out;
        `;
        
        document.body.appendChild(countdownEl);
        
        let count = 3;
        const interval = setInterval(() => {
            if (count > 0) {
                countdownEl.textContent = count;
                countdownEl.style.animation = 'none';
                setTimeout(() => {
                    countdownEl.style.animation = 'countdownPulse 1s ease-in-out';
                }, 10);
                count--;
            } else {
                clearInterval(interval);
                countdownEl.textContent = '🎊';
                countdownEl.style.fontSize = '20vw';
                setTimeout(() => {
                    countdownEl.remove();
                    resolve();
                }, 1000);
            }
        }, 1000);
    });
}

/**
 * Shows celebration overlay with message
 * @param {string} title - Main celebration title
 * @param {string} message - Celebration message
 * @param {boolean} isNewYear - Whether this is a New Year celebration
 */
export function showCelebrationOverlay(title, message, isNewYear = false) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'celebration-overlay';
    
    // Different styling for New Year
    if (isNewYear) {
        overlay.style.background = 'rgba(0, 0, 20, 0.95)';
    }
    
    // Determine emoji based on celebration type
    const emoji = isNewYear ? '🎊🎉🎆' : '🎉🎊🎈';
    
    const gradientStyle = isNewYear 
        ? 'background: linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF6B6B 100%);'
        : 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);';
    
    overlay.innerHTML = `
        <div class="celebration-content" style="${gradientStyle}">
            <div class="celebration-title">${title}</div>
            <div class="celebration-emoji">${emoji}</div>
            <div class="celebration-message">${message}</div>
            <button class="celebration-close">Continue</button>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Close button handler
    const closeBtn = overlay.querySelector('.celebration-close');
    closeBtn.addEventListener('click', () => {
        overlay.style.animation = 'fadeIn 0.3s ease-out reverse';
        setTimeout(() => overlay.remove(), 300);
    });
    
    // Auto-close after 10 seconds (15 for New Year)
    setTimeout(() => {
        if (overlay.parentElement) {
            overlay.style.animation = 'fadeIn 0.3s ease-out reverse';
            setTimeout(() => overlay.remove(), 300);
        }
    }, isNewYear ? 15000 : 10000);
}

/**
 * Pulses the clock elements with visual feedback
 * @param {HTMLElement} clockRow - The clock row element
 * @param {boolean} isNewYear - Whether this is a New Year celebration
 */
export function pulseClockEffect(clockRow, isNewYear = false) {
    if (!clockRow) return;
    
    clockRow.classList.add('countdown-elapsed-effect');
    
    // Add extra glow for New Year
    if (isNewYear) {
        clockRow.style.boxShadow = '0 0 50px rgba(255, 215, 0, 0.9)';
    }
    
    setTimeout(() => {
        clockRow.classList.remove('countdown-elapsed-effect');
        if (isNewYear) {
            clockRow.style.boxShadow = '';
        }
    }, 1200);
}

/**
 * Creates screen flash effect for countdown elapsed moment
 * @param {boolean} isNewYear - Whether this is a New Year celebration
 */
export function createScreenFlash(isNewYear = false) {
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: ${isNewYear ? 'radial-gradient(circle, rgba(255,215,0,0.8) 0%, rgba(255,165,0,0.4) 50%, transparent 100%)' : 'rgba(255, 255, 255, 0.8)'};
        z-index: 9999;
        pointer-events: none;
        animation: screenFlash 0.5s ease-out forwards;
    `;
    
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 500);
}

/**
 * Shows "ELAPSED" banner immediately when countdown reaches zero
 * @param {string} countdownTitle - Title of the countdown
 * @param {boolean} isNewYear - Whether this is a New Year celebration
 * @returns {Promise} Resolves when banner is dismissed
 */
export function showElapsedBanner(countdownTitle, isNewYear = false) {
    return new Promise((resolve) => {
        const banner = document.createElement('div');
        banner.className = `elapsed-banner ${isNewYear ? 'new-year' : ''}`;
        
        const emoji = isNewYear ? '🎊' : '⏰';
        const mainText = isNewYear ? 'HAPPY NEW YEAR!' : 'TIME\'S UP!';
        const subtitle = countdownTitle || 'Countdown has ended';
        
        banner.innerHTML = `
            <span class="elapsed-banner-text">${emoji} ${mainText} ${emoji}</span>
            <span class="elapsed-banner-subtitle">${subtitle}</span>
        `;
        
        document.body.appendChild(banner);
        
        // Auto-remove after 2.5 seconds (3 seconds for New Year)
        const duration = isNewYear ? 3000 : 2500;
        setTimeout(() => {
            banner.style.animation = 'elapsedBannerAppear 0.4s ease-out reverse';
            setTimeout(() => {
                banner.remove();
                resolve();
            }, 400);
        }, duration);
    });
}

/**
 * Main celebration function that triggers all effects
 * @param {string} countdownTitle - Title of the countdown that elapsed
 * @param {boolean} isNewYear - Whether this is a New Year countdown
 */
export async function triggerCelebration(countdownTitle, isNewYear = false) {
    console.log('🎉 Triggering celebration effects!', { countdownTitle, isNewYear });
    
    // Screen flash at the moment of elapsed
    createScreenFlash(isNewYear);
    
    // Pulse effect on clock
    const clockRow = document.querySelector('.clock-row');
    pulseClockEffect(clockRow, isNewYear);
    
    if (isNewYear) {
        // NEW YEAR CELEBRATION - More spectacular!
        console.log('🎊 NEW YEAR CELEBRATION MODE 🎊');
        
        // Show ELAPSED banner for New Year
        const bannerPromise = showElapsedBanner(countdownTitle, isNewYear);
        
        // Start effects immediately
        createShootingStars();
        setTimeout(() => createSparkles(), 300);
        
        // Triple confetti waves
        createConfetti(8000, 150, true);
        setTimeout(() => createConfetti(8000, 100, true), 2000);
        setTimeout(() => createConfetti(8000, 100, true), 4000);
        
        // Multiple fireworks bursts
        setTimeout(() => createFireworks(5, true), 500);
        setTimeout(() => createFireworks(4, true), 3000);
        setTimeout(() => createFireworks(3, true), 5500);
        
        // Wait for elapsed banner to finish, then show celebration overlay
        await bannerPromise;
        
        const year = new Date().getFullYear();
        const title = `🎊 Happy New Year ${year}! 🎊`;
        const message = `Welcome to ${year}! May this year bring you joy, success, and wonderful memories! 🌟`;
        
        showCelebrationOverlay(title, message, true);
        
    } else {
        // NORMAL COUNTDOWN - Simple elapsed banner only, no confetti/fireworks
        console.log('⏰ Simple elapsed notification');
        
        // Just show the elapsed banner and that's it
        await showElapsedBanner(countdownTitle, false);
        
        // No confetti, no fireworks, no celebration overlay
        // User gets: screen flash + clock pulse + elapsed banner
        // That's all - clean and simple!
    }
}
