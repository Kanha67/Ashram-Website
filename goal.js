/**
 * Shiva Shakti Ashram - Goal Page JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Spiritual Pillars Tabs
    initPillarTabs();
});

/**
 * Initialize the spiritual pillars tabs functionality
 */
function initPillarTabs() {
    const tabs = document.querySelectorAll('.pillar-tab');
    const contents = document.querySelectorAll('.pillar-content');
    
    if (!tabs.length || !contents.length) return;
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Get the pillar type from data attribute
            const pillarType = tab.getAttribute('data-pillar');
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Add active class to corresponding content
            const activeContent = document.getElementById(pillarType);
            if (activeContent) {
                activeContent.classList.add('active');
            }
            
            // Add subtle animation
            if (activeContent) {
                activeContent.style.animation = 'none';
                void activeContent.offsetWidth; // Trigger reflow
                activeContent.style.animation = 'fadeIn 0.5s ease forwards';
            }
        });
    });
    
    // On page load, make sure the default tab is active
    const defaultTab = document.querySelector('.pillar-tab.active');
    if (defaultTab) {
        const pillarType = defaultTab.getAttribute('data-pillar');
        const defaultContent = document.getElementById(pillarType);
        if (defaultContent) {
            defaultContent.classList.add('active');
        }
    } else if (tabs.length > 0) {
        // If no tab is active by default, activate the first one
        tabs[0].classList.add('active');
        const pillarType = tabs[0].getAttribute('data-pillar');
        const firstContent = document.getElementById(pillarType);
        if (firstContent) {
            firstContent.classList.add('active');
        }
    }
}

/**
 * Add animation to value cards when they come into view
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Animation on Scroll
    initAnimationOnScroll();
});

function initAnimationOnScroll() {
    const elements = document.querySelectorAll('.value-card, .outreach-card');
    
    if (!elements.length) return;
    
    const options = {
        root: null, // viewport
        threshold: 0.1, // trigger when 10% of the element is visible
        rootMargin: '-50px 0px' // offset from the viewport edge
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                // Optional: Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Enhance hover effects for images
 */
document.addEventListener('DOMContentLoaded', function() {
    initEnhancedHoverEffects();
});

function initEnhancedHoverEffects() {
    const images = document.querySelectorAll('.vision-image, .mission-image');
    
    images.forEach(image => {
        image.addEventListener('mouseenter', function() {
            // Add a subtle glow effect
            this.style.boxShadow = '0 15px 30px rgba(255, 165, 0, 0.3)';
            
            // Make the overlay visible with smooth transition
            const overlay = this.querySelector('.image-overlay');
            if (overlay) {
                overlay.style.transform = 'translateY(0)';
            }
        });
        
        image.addEventListener('mouseleave', function() {
            // Remove the glow effect
            this.style.boxShadow = '';
            
            // Hide the overlay with smooth transition
            const overlay = this.querySelector('.image-overlay');
            if (overlay) {
                overlay.style.transform = '';
            }
        });
    });
} 