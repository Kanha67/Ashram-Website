// News Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initFeaturedSlider();
    initNewsFilter();
    initSocialFeed();
    initNewsletterForm();
});

// Featured News Slider
function initFeaturedSlider() {
    const slides = document.querySelectorAll('.featured-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        let next = currentSlide + 1;
        if (next >= slides.length) next = 0;
        showSlide(next);
    }

    function prevSlide() {
        let prev = currentSlide - 1;
        if (prev < 0) prev = slides.length - 1;
        showSlide(prev);
    }

    // Event Listeners
    if (prevBtn) prevBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        prevSlide();
        startSlideInterval();
    });

    if (nextBtn) nextBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        nextSlide();
        startSlideInterval();
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            clearInterval(slideInterval);
            showSlide(index);
            startSlideInterval();
        });
    });

    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Initialize first slide and start interval
    if (slides.length > 0) {
        showSlide(0);
        startSlideInterval();
    }
}

// News Filter
function initNewsFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const newsCards = document.querySelectorAll('.news-card');
    const newsGrid = document.querySelector('.news-grid');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.dataset.category;

            // Filter news cards
            newsCards.forEach(card => {
                const cardCategory = card.dataset.category;
                if (category === 'all' || category === cardCategory) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Social Media Feed
function initSocialFeed() {
    const socialPosts = document.querySelectorAll('.social-post');
    
    // Add hover effects
    socialPosts.forEach(post => {
        post.addEventListener('mouseenter', () => {
            post.style.transform = 'translateY(-5px)';
            post.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
        });

        post.addEventListener('mouseleave', () => {
            post.style.transform = 'translateY(0)';
            post.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });

    // Like button functionality
    const likeBtns = document.querySelectorAll('.like-btn');
    likeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const count = this.querySelector('.count');
            let likes = parseInt(count.textContent);
            
            if (this.classList.contains('liked')) {
                likes--;
                this.classList.remove('liked');
                this.style.color = '#666';
            } else {
                likes++;
                this.classList.add('liked');
                this.style.color = '#8e44ad';
            }
            
            count.textContent = likes;
        });
    });
}

// Newsletter Form
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            // Basic email validation
            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showFormMessage('Thank you for subscribing to our newsletter!', 'success');
            this.reset();
        });
    }
}

// Utility Functions
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showFormMessage(message, type) {
    const formNote = document.querySelector('.form-note');
    if (formNote) {
        formNote.textContent = message;
        formNote.style.color = type === 'error' ? '#ff4444' : '#00C851';
        
        setTimeout(() => {
            formNote.textContent = 'We respect your privacy. Unsubscribe at any time.';
            formNote.style.color = 'rgba(255, 255, 255, 0.8)';
        }, 3000);
    }
}

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.news-card, .event-item, .social-post').forEach(el => {
    observer.observe(el);
}); 