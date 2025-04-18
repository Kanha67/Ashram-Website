/**
 * Shiva Shakti Ashram - Animations and Enhanced Effects
 * This file contains JavaScript to implement animations and enhance interactivity
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animation features
    initScrollAnimations();
    initParallaxEffects();
    initHoverEffects();
    initImageHoverEffects();
    initStaggeredAnimations();
    initParticleEffects();
    initCountdownAnimation();
    initMantraAnimation();
    initAnimations();
    initScrollReveal();
    initStaggerAnimations();
    initParallax();
    initTypingAnimations();
    initNavigationEffects();
    initCardEffects();
    initMantraPlayer();
    initThemeToggle();
    initLanguageToggle();
});

/**
 * Initialize scroll animations
 * Adds reveal animations to elements as they come into view
 */
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Offset from the viewport edge
    });
    
    // Observe each reveal element
    revealElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Initialize parallax effects
 * Creates a subtle parallax scrolling effect for elements with the parallax class
 */
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = scrollPosition * speed;
            element.style.backgroundPositionY = `${yPos}px`;
        });
    });
}

/**
 * Initialize hover effects
 * Enhances hover interactions for various elements
 */
function initHoverEffects() {
    // Add 3D tilt effect to cards
    const cards = document.querySelectorAll('.card-3d');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.querySelector('.card-3d-inner').style.transform = 
                `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.querySelector('.card-3d-inner').style.transform = 
                'rotateX(0) rotateY(0)';
        });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

/**
 * Initialize image hover effects
 * Enhances image hover interactions with overlay content
 */
function initImageHoverEffects() {
    const imageHovers = document.querySelectorAll('.image-hover');
    
    imageHovers.forEach(container => {
        // Create overlay content if it doesn't exist
        if (!container.querySelector('.overlay-content')) {
            const img = container.querySelector('img');
            const alt = img.getAttribute('alt') || '';
            
            const overlay = document.createElement('div');
            overlay.classList.add('overlay-content');
            overlay.innerHTML = `<h3>${alt}</h3>`;
            
            container.appendChild(overlay);
        }
    });
}

/**
 * Initialize staggered animations
 * Adds staggered animation delays to elements
 */
function initStaggeredAnimations() {
    const staggeredContainers = document.querySelectorAll('.stagger-container');
    
    staggeredContainers.forEach(container => {
        const items = container.querySelectorAll('.stagger-item');
        
        items.forEach((item, index) => {
            item.classList.add(`stagger-${(index % 5) + 1}`);
        });
    });
}

/**
 * Initialize particle effects
 * Creates a particle background effect
 */
function initParticleEffects() {
    const particleContainer = document.getElementById('particles-js');
    
    if (particleContainer && typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#8e44ad'
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.5,
                    random: true
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#8e44ad',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

/**
 * Initialize countdown animation
 * Creates an animated countdown for events
 */
function initCountdownAnimation() {
    const countdownElement = document.querySelector('.countdown');
    
    if (countdownElement) {
        const countdownItems = countdownElement.querySelectorAll('.countdown-item');
        
        countdownItems.forEach(item => {
            item.classList.add('pulse');
            
            // Add a slight delay between each item's pulse
            const index = Array.from(countdownItems).indexOf(item);
            item.style.animationDelay = `${index * 0.2}s`;
        });
    }
}

/**
 * Initialize mantra animation
 * Creates a special animation for mantras
 */
function initMantraAnimation() {
    const mantraElement = document.querySelector('.mantra');
    
    if (mantraElement) {
        // Add a subtle floating animation
        mantraElement.classList.add('float');
        
        // Add a text glow effect
        mantraElement.classList.add('text-glow');
        
        // Create a pulsing effect on hover
        mantraElement.addEventListener('mouseenter', () => {
            mantraElement.classList.add('pulse');
        });
        
        mantraElement.addEventListener('mouseleave', () => {
            mantraElement.classList.remove('pulse');
        });
    }
}

/**
 * Add CSS for ripple effect
 * This needs to be added dynamically since it uses pseudo-elements
 */
function addRippleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Call the function to add ripple styles
addRippleStyles();

// Initialize all animations
function initAnimations() {
    // Add fade-in animation to elements with fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        element.style.opacity = '1';
    });
    
    // Add slide-up animation to elements with slide-up class
    const slideUpElements = document.querySelectorAll('.slide-up');
    slideUpElements.forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    });
    
    // Add slide-in-left animation to elements with slide-in-left class
    const slideInLeftElements = document.querySelectorAll('.slide-in-left');
    slideInLeftElements.forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'translateX(0)';
    });
    
    // Add slide-in-right animation to elements with slide-in-right class
    const slideInRightElements = document.querySelectorAll('.slide-in-right');
    slideInRightElements.forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'translateX(0)';
    });
    
    // Add scale-up animation to elements with scale-up class
    const scaleUpElements = document.querySelectorAll('.scale-up');
    scaleUpElements.forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'scale(1)';
    });
    
    // Add rotate animation to elements with rotate class
    const rotateElements = document.querySelectorAll('.rotate');
    rotateElements.forEach(element => {
        element.style.animation = 'rotate 10s linear infinite';
    });
    
    // Add shimmer effect to elements with shimmer class
    const shimmerElements = document.querySelectorAll('.shimmer');
    shimmerElements.forEach(element => {
        element.style.animation = 'shimmer 2s infinite';
    });
    
    // Add float animation to elements with float class
    const floatElements = document.querySelectorAll('.float');
    floatElements.forEach(element => {
        element.style.animation = 'float 3s ease-in-out infinite';
    });
    
    // Add glow effect to elements with glow class
    const glowElements = document.querySelectorAll('.glow');
    glowElements.forEach(element => {
        element.style.animation = 'glow 2s infinite';
    });
}

// Initialize scroll reveal animations
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            } else {
                element.classList.remove('active');
            }
        });
    }
    
    // Check on load
    checkReveal();
    
    // Check on scroll
    window.addEventListener('scroll', checkReveal);
}

// Initialize stagger animations
function initStaggerAnimations() {
    const staggerItems = document.querySelectorAll('.stagger-item');
    
    function checkStagger() {
        const windowHeight = window.innerHeight;
        const staggerPoint = 150;
        
        staggerItems.forEach((item, index) => {
            const itemTop = item.getBoundingClientRect().top;
            
            if (itemTop < windowHeight - staggerPoint) {
                // Add delay based on index
                setTimeout(() => {
                    item.classList.add('active');
                }, index * 100);
            }
        });
    }
    
    // Check on load
    checkStagger();
    
    // Check on scroll
    window.addEventListener('scroll', checkStagger);
}

// Initialize parallax effects
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    function updateParallax() {
        const scrollPosition = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const yPos = -(scrollPosition * speed);
            element.style.backgroundPositionY = yPos + 'px';
        });
    }
    
    // Update on scroll
    window.addEventListener('scroll', updateParallax);
}

// Initialize typing animations
function initTypingAnimations() {
    const typingElements = document.querySelectorAll('.typing-animation');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
}

// Initialize navigation effects
function initNavigationEffects() {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    
    // Add hover effect to nav links
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.classList.add('hover-lift');
        });
        
        link.addEventListener('mouseleave', function() {
            this.classList.remove('hover-lift');
        });
    });
    
    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (hamburger && navMenu && !hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Add scroll effect to navigation
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            nav.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Initialize card effects
function initCardEffects() {
    const cards = document.querySelectorAll('.card-3d');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.querySelector('.card-3d-inner').style.transform = 
                `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.querySelector('.card-3d-inner').style.transform = 
                'rotateX(0) rotateY(0)';
        });
    });
}

// Initialize mantra player
function initMantraPlayer() {
    const audioControl = document.querySelector('.audio-control');
    
    if (audioControl) {
        const audio = new Audio('audio/om-mantra.mp3');
        audio.loop = true;
        
        let isPlaying = false;
        
        audioControl.addEventListener('click', function() {
            if (isPlaying) {
                audio.pause();
                this.innerHTML = '<i class="fas fa-volume-up"></i><span>Play Mantra</span>';
            } else {
                audio.play();
                this.innerHTML = '<i class="fas fa-volume-mute"></i><span>Stop Mantra</span>';
            }
            
            isPlaying = !isPlaying;
        });
    }
}

// Initialize theme toggle
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // Save preference to localStorage
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
        });
        
        // Check for saved preference
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode === 'true') {
            document.body.classList.add('dark-mode');
        }
    }
}

// Initialize language toggle
function initLanguageToggle() {
    const languageButtons = document.querySelectorAll('.language-toggle button');
    
    languageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            
            // Remove active class from all buttons
            languageButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Set language attribute on body
            document.body.setAttribute('data-lang', lang);
            
            // Save preference to localStorage
            localStorage.setItem('language', lang);
        });
    });
    
    // Check for saved preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        document.body.setAttribute('data-lang', savedLanguage);
        
        // Update active button
        languageButtons.forEach(button => {
            if (button.getAttribute('data-lang') === savedLanguage) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
}

// Add smooth scrolling to all links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}); 