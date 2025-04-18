/**
 * Shiva Shakti Ashram - Particle Background Effect
 * This file creates a beautiful particle background effect for the website
 */

document.addEventListener('DOMContentLoaded', function() {
    initParticles();
});

function initParticles() {
    const particlesContainer = document.getElementById('particles');
    
    if (!particlesContainer) return;
    
    // Create particles
    const particleCount = 50;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer, particles);
    }
    
    // Animate particles
    function animateParticles() {
        particles.forEach(particle => {
            // Move particle
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > window.innerWidth) {
                particle.vx *= -1;
            }
            
            if (particle.y < 0 || particle.y > window.innerHeight) {
                particle.vy *= -1;
            }
            
            // Update position
            particle.element.style.left = `${particle.x}px`;
            particle.element.style.top = `${particle.y}px`;
            
            // Rotate particle
            particle.rotation += particle.rotationSpeed;
            particle.element.style.transform = `rotate(${particle.rotation}deg)`;
            
            // Pulse particle
            particle.scale = 0.8 + Math.sin(Date.now() * 0.001 + particle.id) * 0.2;
            particle.element.style.transform = `rotate(${particle.rotation}deg) scale(${particle.scale})`;
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        particles.forEach(particle => {
            // Keep particles within bounds
            if (particle.x > window.innerWidth) {
                particle.x = window.innerWidth;
            }
            
            if (particle.y > window.innerHeight) {
                particle.y = window.innerHeight;
            }
        });
    });
}

function createParticle(container, particles) {
    // Create particle element
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Randomize particle properties
    const size = Math.random() * 15 + 5;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const vx = (Math.random() - 0.5) * 0.5;
    const vy = (Math.random() - 0.5) * 0.5;
    const rotation = Math.random() * 360;
    const rotationSpeed = (Math.random() - 0.5) * 0.5;
    const opacity = Math.random() * 0.5 + 0.2;
    const id = Math.random();
    
    // Set particle styles
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.opacity = opacity;
    particle.style.transform = `rotate(${rotation}deg)`;
    
    // Add particle to container
    container.appendChild(particle);
    
    // Add particle to array
    particles.push({
        element: particle,
        x,
        y,
        vx,
        vy,
        rotation,
        rotationSpeed,
        scale: 1,
        id
    });
    
    // Add special symbols to some particles
    if (Math.random() > 0.7) {
        const symbols = ['ॐ', '☮', '☯', '✺', '✹', '✸', '✶', '✷', '✵', '✴'];
        const symbol = document.createElement('span');
        symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        symbol.style.position = 'absolute';
        symbol.style.top = '50%';
        symbol.style.left = '50%';
        symbol.style.transform = 'translate(-50%, -50%)';
        symbol.style.fontSize = `${size * 0.8}px`;
        symbol.style.color = 'rgba(142, 68, 173, 0.5)';
        particle.appendChild(symbol);
    }
}

// Add CSS for particles
function addParticleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .particle {
            position: absolute;
            background: radial-gradient(circle, rgba(142, 68, 173, 0.3) 0%, rgba(142, 68, 173, 0) 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 0;
            transition: transform 0.3s ease;
        }
        
        body.dark-mode .particle {
            background: radial-gradient(circle, rgba(243, 156, 18, 0.3) 0%, rgba(243, 156, 18, 0) 70%);
        }
        
        .background-particles {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            overflow: hidden;
        }
    `;
    
    document.head.appendChild(style);
}

// Add styles when the script loads
addParticleStyles(); 