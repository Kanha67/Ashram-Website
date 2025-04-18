/**
 * Shiva Shakti Ashram Website
 * Main JavaScript File
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initParticles();
    initDarkMode();
    initLanguageSwitch();
    initMobileMenu();
    initScrollAnimations();
    initAudioPlayer();
    
    // Initialize background audio
    initBackgroundAudio();
    
    // Initialize event slider
    initEventSlider();
    
    // Initialize blessing generator
    initBlessingGenerator();
    
    // Initialize countdown timer
    initCountdownTimer();
    
    // Add fade-in animations
    initFadeInAnimations();
    
    // Initialize audio control
    initAudioControl();
});

// Language translations
const translations = {
    en: {
        // Navigation
        'nav-home': 'Home',
        'nav-about': 'About Us',
        'nav-goal': 'Our Goal',
        'nav-programs': 'Programs',
        'nav-horoscope': 'Horoscope',
        'nav-calendar': 'Calendar',
        'nav-gallery': 'Gallery',
        'nav-news': 'News',
        'nav-contact': 'Contact',
        'nav-donate': 'Donate',
        
        // Common
        'toggle-mantra': 'Toggle Mantra',
        'learn-more': 'Learn More',
        'view-details': 'View Details',
        'subscribe': 'Subscribe',
        'read-more': 'Read More',
        'view-all': 'View All',
        'send-message': 'Send Message',
        'submit': 'Submit',
        'cancel': 'Cancel',
        'back': 'Back',
        'next': 'Next',
        'previous': 'Previous',
        'close': 'Close',
        'menu': 'Menu',
        
        // Home page
        'welcome': 'Welcome to Shiva Shakti Ashram',
        'welcome-desc': 'A sacred space dedicated to spiritual growth, divine connection, and inner peace',
        'discover-ashram': 'Discover Our Ashram',
        'todays-blessing': "Today's Blessing",
        'upcoming-events': 'Upcoming Sacred Events',
        'request-puja': 'Request Puja',
        'request-puja-desc': 'Sacred rituals performed by our priests',
        'request-now': 'Request Now',
        'view-calendar': 'View Calendar',
        'view-calendar-desc': 'Auspicious dates and upcoming events',
        'make-donation': 'Make a Donation',
        'make-donation-desc': 'Support our spiritual and community work',
        'daily-horoscope': 'Daily Horoscope',
        'daily-horoscope-desc': 'Vedic astrological guidance for your day',
        'read-horoscope': 'Read Horoscope',
        'blessing-day': 'Blessing of the Day',
        'receive-blessing': 'Receive New Blessing',
        'countdown-title': 'Countdown to Maha Shivaratri',
        'view-festival': 'View Festival Details',
        'days': 'Days',
        'hours': 'Hours',
        'minutes': 'Minutes',
        'seconds': 'Seconds',
        
        // Footer
        'footer-about': 'About Us',
        'footer-programs': 'Programs',
        'footer-gallery': 'Gallery',
        'footer-contact': 'Contact',
        'footer-address': 'Pashupatinath Area, Kathmandu, Nepal',
        'footer-phone': '+977 1234 5678',
        'footer-email': 'info@shivashaktiashram.org',
        'footer-connect': 'Connect With Us',
        'footer-newsletter': 'Subscribe to Our Newsletter',
        'footer-email-placeholder': 'Your email address',
        'footer-copyright': '© 2025 Shiva Shakti Ashram. All Rights Reserved.',
        'footer-designed': 'Designed with devotion to Lord Shiva',
        
        // Event details
        'rudrabhishekam': 'Rudrabhishekam',
        'rudrabhishekam-desc': 'Special Puja for Lord Shiva with 108 offerings',
        'yogic-meditation': 'Yogic Meditation',
        'yogic-meditation-desc': 'Intensive meditation session with Guru Ji',
        'full-moon-ceremony': 'Full Moon Ceremony',
        'full-moon-ceremony-desc': 'Spiritual gathering under the full moon',
        
        // Mantra
        'mantra-text': 'Tryambakam yajamahe sugandhim pushtivardhanam Urvarukamiva bandhanan mrityor mukshiya mamritat',
        'mantra-meaning': 'We worship the three-eyed Lord who is fragrant and who nourishes and nurtures all beings. As is the ripened cucumber freed from its bondage, may He liberate us from death for the sake of immortality.'
    },
    np: {
        // Navigation
        'nav-home': 'गृह',
        'nav-about': 'हाम्रोबारे',
        'nav-goal': 'हाम्रो लक्ष्य',
        'nav-programs': 'कार्यक्रमहरू',
        'nav-horoscope': 'राशिफल',
        'nav-calendar': 'पात्रो',
        'nav-gallery': 'ग्यालरी',
        'nav-news': 'समाचार',
        'nav-contact': 'सम्पर्क',
        'nav-donate': 'दान गर्नुहोस्',
        
        // Common
        'toggle-mantra': 'मन्त्र टगल गर्नुहोस्',
        'learn-more': 'थप जान्नुहोस्',
        'view-details': 'विवरण हेर्नुहोस्',
        'subscribe': 'सदस्यता लिनुहोस्',
        'read-more': 'थप पढ्नुहोस्',
        'view-all': 'सबै हेर्नुहोस्',
        'send-message': 'सन्देश पठाउनुहोस्',
        'submit': 'पेश गर्नुहोस्',
        'cancel': 'रद्द गर्नुहोस्',
        'back': 'पछाडि',
        'next': 'अर्को',
        'previous': 'अघिल्लो',
        'close': 'बन्द गर्नुहोस्',
        'menu': 'मेनु',
        
        // Home page
        'welcome': 'शिव शक्ति आश्रममा स्वागत छ',
        'welcome-desc': 'आध्यात्मिक विकास, दिव्य जडान र आन्तरिक शान्तिको लागि समर्पित पवित्र स्थान',
        'discover-ashram': 'हाम्रो आश्रम पत्ता लगाउनुहोस्',
        'todays-blessing': 'आजको आशीर्वाद',
        'upcoming-events': 'आउँदा पवित्र कार्यक्रमहरू',
        'request-puja': 'पूजा अनुरोध',
        'request-puja-desc': 'हाम्रा पुजारीहरूद्वारा गरिने पवित्र अनुष्ठानहरू',
        'request-now': 'अहिले अनुरोध गर्नुहोस्',
        'view-calendar': 'पात्रो हेर्नुहोस्',
        'view-calendar-desc': 'शुभ मिति र आउँदा कार्यक्रमहरू',
        'make-donation': 'दान गर्नुहोस्',
        'make-donation-desc': 'हाम्रो आध्यात्मिक र सामुदायिक कार्यलाई सहयोग गर्नुहोस्',
        'daily-horoscope': 'दैनिक राशिफल',
        'daily-horoscope-desc': 'तपाईंको दिनको लागि वैदिक ज्योतिषीय मार्गदर्शन',
        'read-horoscope': 'राशिफल पढ्नुहोस्',
        'blessing-day': 'आजको आशीर्वाद',
        'receive-blessing': 'नयाँ आशीर्वाद प्राप्त गर्नुहोस्',
        'countdown-title': 'महाशिवरात्रिको उल्टो गणना',
        'view-festival': 'पर्व विवरण हेर्नुहोस्',
        'days': 'दिन',
        'hours': 'घण्टा',
        'minutes': 'मिनेट',
        'seconds': 'सेकेन्ड',
        
        // Footer
        'footer-about': 'हाम्रोबारे',
        'footer-programs': 'कार्यक्रमहरू',
        'footer-gallery': 'ग्यालरी',
        'footer-contact': 'सम्पर्क',
        'footer-address': 'पशुपतिनाथ क्षेत्र, काठमाडौं, नेपाल',
        'footer-phone': '+977 1234 5678',
        'footer-email': 'info@shivashaktiashram.org',
        'footer-connect': 'हामीसँग जोडिनुहोस्',
        'footer-newsletter': 'हाम्रो न्युजलेटरको लागि सदस्यता लिनुहोस्',
        'footer-email-placeholder': 'तपाईंको इमेल ठेगाना',
        'footer-copyright': '© 2025 शिव शक्ति आश्रम। सर्वाधिकार सुरक्षित।',
        'footer-designed': 'भगवान शिवको प्रति समर्पणसँग डिजाइन गरिएको',
        
        // Event details
        'rudrabhishekam': 'रुद्राभिषेक',
        'rudrabhishekam-desc': '108 अर्पणसँग भगवान शिवको विशेष पूजा',
        'yogic-meditation': 'योगिक ध्यान',
        'yogic-meditation-desc': 'गुरु जीको साथ गहन ध्यान सत्र',
        'full-moon-ceremony': 'पूर्णिमा समारोह',
        'full-moon-ceremony-desc': 'पूर्णिमाको अधीन आध्यात्मिक सभा',
        
        // Mantra
        'mantra-text': 'त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्',
        'mantra-meaning': 'हामी तीन आँखा भएको भगवानलाई पूजा गर्छौं जो सुगन्धित छ र सबै प्राणीहरूलाई पोषण र पालनपोषण गर्छ। पाकेको ककडी जस्तै आफ्नो बन्धनबाट मुक्त हुन्छ, उहाँले हामीलाई मृत्युबाट मुक्ति दिनुहोस् र अमरत्वको लागि।'
    }
};

/**
 * Initialize particles background
 */
function initParticles() {
    if (document.getElementById('particles')) {
        particlesJS('particles', {
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
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
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
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
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
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
}

/**
 * Initialize dark mode functionality
 */
function initDarkMode() {
    const themeToggle = document.querySelector('.theme-toggle');
    const toggleBall = document.querySelector('.toggle-ball');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.classList.add('active');
    }
    
    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        themeToggle.classList.toggle('active');
        
        // Save preference
        const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    });
}

/**
 * Initialize language switcher
 */
function initLanguageSwitch() {
    const languageButtons = document.querySelectorAll('.language-toggle button');
    
    // Check for saved language preference
    const savedLang = localStorage.getItem('language') || 'en';
    setLanguage(savedLang);
    
    // Update active button
    languageButtons.forEach(button => {
        if (button.dataset.lang === savedLang) {
            button.classList.add('active');
        }
        
        // Switch language on click
        button.addEventListener('click', () => {
            const lang = button.dataset.lang;
            setLanguage(lang);
            
            // Update active button
            languageButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Save preference
            localStorage.setItem('language', lang);
        });
    });
}

// Set language and update content
function setLanguage(lang) {
    document.body.setAttribute('data-lang', lang);
    updatePageContent(lang);
}

/**
 * Update page content based on selected language
 */
function updatePageContent(lang) {
    // Update all translatable elements
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.dataset.translate;
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' && element.type === 'text') {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    // Update page title
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const pageTitles = {
        'index.html': {
            en: 'Shiva Shakti Ashram - Home',
            np: 'शिव शक्ति आश्रम - गृह'
        },
        'about.html': {
            en: 'About Us - Shiva Shakti Ashram',
            np: 'हाम्रोबारे - शिव शक्ति आश्रम'
        },
        // Add more pages as needed
    };

    if (pageTitles[currentPage] && pageTitles[currentPage][lang]) {
        document.title = pageTitles[currentPage][lang];
    }
}

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav ul');
    
    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !nav.contains(event.target)) {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    }
}

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => observer.observe(element));
}

/**
 * Initialize background audio functionality with enhanced features
 */
function initBackgroundAudio() {
    const audioToggle = document.getElementById('toggleAudio');
    const audioElement = document.getElementById('bgAudio');
    
    if (audioToggle && audioElement) {
        // Get saved audio state from localStorage
        const savedAudioState = localStorage.getItem('audioState');
        const savedVolume = localStorage.getItem('audioVolume');
        
        // Set initial volume (default to 30% if not saved)
        audioElement.volume = savedVolume ? parseFloat(savedVolume) : 0.3;
        
        // Start muted by default to comply with browser policies
        audioElement.muted = true;
        
        // Update button state based on saved preferences
        updateAudioButtonState(audioToggle, false);
        
        audioToggle.addEventListener('click', () => {
            if (audioElement.paused) {
                // Unmute and play
                audioElement.muted = false;
                audioElement.play()
                    .then(() => {
                        updateAudioButtonState(audioToggle, true);
                        localStorage.setItem('audioState', 'playing');
                    })
                    .catch(error => {
                        console.error('Audio playback error:', error);
                        updateAudioButtonState(audioToggle, false);
                        localStorage.setItem('audioState', 'paused');
                    });
            } else {
                // Pause audio
                audioElement.pause();
                updateAudioButtonState(audioToggle, false);
                localStorage.setItem('audioState', 'paused');
            }
        });
        
        // Add volume change handler
        audioElement.addEventListener('volumechange', () => {
            localStorage.setItem('audioVolume', audioElement.volume);
        });
        
        // Handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && !audioElement.paused) {
                audioElement.pause();
                updateAudioButtonState(audioToggle, false);
            }
        });
        
        // Auto-play if previously playing (requires user interaction first)
        if (savedAudioState === 'playing') {
            // Wait for user interaction before auto-playing
            const playOnInteraction = () => {
                audioElement.muted = false;
                audioElement.play()
                    .then(() => {
                        updateAudioButtonState(audioToggle, true);
                    })
                    .catch(() => {
                        // Ignore autoplay errors
                    });
                document.removeEventListener('click', playOnInteraction);
            };
            document.addEventListener('click', playOnInteraction);
        }
    }
}

/**
 * Update audio button state and appearance
 */
function updateAudioButtonState(button, isPlaying) {
    if (isPlaying) {
        button.innerHTML = '<i class="fas fa-volume-up"></i><span>Mute Mantra</span>';
        button.classList.add('playing');
    } else {
        button.innerHTML = '<i class="fas fa-volume-mute"></i><span>Play Mantra</span>';
        button.classList.remove('playing');
    }
}

/**
 * Initialize the event slider
 */
function initEventSlider() {
    const slider = document.querySelector('.event-slider');
    const cards = document.querySelectorAll('.event-card');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');
    
    if (!slider || cards.length === 0) return;
    
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + parseInt(window.getComputedStyle(cards[0]).marginLeft) * 2;
    const visibleCards = Math.floor(slider.offsetWidth / cardWidth);
    const maxIndex = Math.max(0, cards.length - visibleCards);
    
    // Hide previous button initially
    if (prevBtn) prevBtn.style.opacity = '0.5';
    
    // Handle next button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateSliderPosition();
            }
        });
    }
    
    // Handle previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSliderPosition();
            }
        });
    }
    
    // Update the slider position
    function updateSliderPosition() {
        const translateX = -currentIndex * cardWidth;
        
        // Apply the transform with a smooth transition
        cards.forEach(card => {
            card.style.transform = `translateX(${translateX}px)`;
        });
        
        // Update button states
        if (prevBtn) {
            prevBtn.style.opacity = currentIndex > 0 ? '1' : '0.5';
        }
        
        if (nextBtn) {
            nextBtn.style.opacity = currentIndex < maxIndex ? '1' : '0.5';
        }
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        // Recalculate visible cards and max index
        const visibleCards = Math.floor(slider.offsetWidth / cardWidth);
        const newMaxIndex = Math.max(0, cards.length - visibleCards);
        
        // Adjust current index if needed
        if (currentIndex > newMaxIndex) {
            currentIndex = newMaxIndex;
            updateSliderPosition();
        }
    });
}

/**
 * Initialize the blessing generator
 */
function initBlessingGenerator() {
    const blessingBtn = document.getElementById('newBlessingBtn');
    const blessingText = document.getElementById('daily-mantra');
    
    if (!blessingBtn || !blessingText) return;
    
    // Array of mantras and blessings
    const blessings = [
        {
            mantra: "ॐ नमः शिवाय",
            translation: "Om Namah Shivaya - I bow to Shiva, the supreme deity of transformation who represents the truest, highest self."
        },
        {
            mantra: "करपूरगौरं करुणावतारं संसारसारं भुजगेन्द्रहारम्।\nसदा वसन्तं हृदयारविन्दे भवं भवानीसहितं नमामि॥",
            translation: "I bow to Lord Shiva, who is white as camphor, the incarnation of compassion, the essence of worldly existence, who wears the king of serpents as a garland, and who always dwells in the lotus of my heart along with Goddess Bhavani."
        },
        {
            mantra: "महादेवाय नमः",
            translation: "Salutations to the Great God (Mahadeva), who is the supreme reality."
        },
        {
            mantra: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्\nउर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्॥",
            translation: "We worship the three-eyed Lord who is fragrant and who nourishes and nurtures all beings. As is the ripened cucumber freed from its bondage, may He liberate us from death for the sake of immortality."
        },
        {
            mantra: "शिवोऽहम् शिवोऽहम्",
            translation: "I am Shiva, I am Shiva - The pure consciousness that pervades everything is my true nature."
        }
    ];
    
    // Show a random blessing initially
    showRandomBlessing();
    
    // Set up click event for new blessing
    blessingBtn.addEventListener('click', showRandomBlessing);
    
    function showRandomBlessing() {
        const randomIndex = Math.floor(Math.random() * blessings.length);
        const blessing = blessings[randomIndex];
        
        blessingText.textContent = blessing.mantra;
        
        // Update the meaning text if it exists
        const meaningElement = document.querySelector('.blessing-meaning');
        if (meaningElement) {
            meaningElement.textContent = blessing.translation;
        }
        
        // Add animation effect
        blessingText.classList.remove('fade-in');
        void blessingText.offsetWidth; // Trigger reflow
        blessingText.classList.add('fade-in');
    }
}

/**
 * Initialize countdown timer to next Shivaratri
 */
function initCountdownTimer() {
    const daysElement = document.getElementById('countdown-days');
    const hoursElement = document.getElementById('countdown-hours');
    const minsElement = document.getElementById('countdown-mins');
    const secsElement = document.getElementById('countdown-secs');
    
    if (!daysElement || !hoursElement || !minsElement || !secsElement) return;
    
    // Function to calculate next Shivaratri date
    function getNextShivaratri() {
        const today = new Date();
        const currentYear = today.getFullYear();
        
        // Approximate Shivaratri dates for next few years (would need to be updated with actual dates)
        const shivaratriDates = {
            2025: new Date('March 10, 2025'),
            2026: new Date('February 27, 2026'),
            2027: new Date('February 16, 2027')
        };
        
        // Get the next Shivaratri based on current date
        let nextDate = shivaratriDates[currentYear];
        
        // If current year's Shivaratri has passed, get next year's date
        if (!nextDate || today > nextDate) {
            nextDate = shivaratriDates[currentYear + 1];
        }
        
        // If no specific date is available, approximate based on lunar calendar
        // This is a simplification; actual date calculation would be more complex
        if (!nextDate) {
            // Approximate: Shivaratri usually falls in February/March
            nextDate = new Date(currentYear, 1, 20); // February 20th as fallback
            
            // If today is past February 20th, use next year
            if (today > nextDate) {
                nextDate = new Date(currentYear + 1, 1, 20);
            }
        }
        
        return nextDate;
    }
    
    // Calculate time remaining to next Shivaratri
    function updateCountdown() {
        const targetDate = getNextShivaratri();
        const currentDate = new Date();
        
        // Calculate time difference in milliseconds
        const difference = targetDate - currentDate;
        
        // Calculate days, hours, minutes, seconds
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        // Update the DOM
        daysElement.textContent = days.toString().padStart(2, '0');
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minsElement.textContent = minutes.toString().padStart(2, '0');
        secsElement.textContent = seconds.toString().padStart(2, '0');
    }
    
    // Update countdown immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

/**
 * Initialize fade-in animations on scroll
 */
function initFadeInAnimations() {
    // Select all sections that should animate on scroll
    const sections = document.querySelectorAll('section');
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                // Optionally unobserve after animation is triggered
                // observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // viewport
        threshold: 0.1, // trigger when 10% of the element is visible
        rootMargin: '-50px 0px' // offset from the viewport edge
    });
    
    // Observe each section
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Initialize audio player
function initAudioPlayer() {
    const audioPlayer = document.querySelector('.audio-player');
    const playPauseBtn = document.querySelector('.play-pause-btn');
    const audio = document.querySelector('.background-audio');
    
    if (audioPlayer && playPauseBtn && audio) {
        // Check if audio was playing before
        const wasPlaying = localStorage.getItem('audioPlaying') === 'true';
        
        if (wasPlaying) {
            audio.play();
            playPauseBtn.classList.add('playing');
        }
        
        playPauseBtn.addEventListener('click', function() {
            if (audio.paused) {
                audio.play();
                playPauseBtn.classList.add('playing');
                localStorage.setItem('audioPlaying', 'true');
            } else {
                audio.pause();
                playPauseBtn.classList.remove('playing');
                localStorage.setItem('audioPlaying', 'false');
            }
        });
        
        // Update audio time
        audio.addEventListener('timeupdate', function() {
            const progress = (audio.currentTime / audio.duration) * 100;
            document.querySelector('.audio-progress').style.width = progress + '%';
        });
    }
}

// Audio Control
function initAudioControl() {
    const audioControl = document.querySelector('.audio-control');
    const audio = new Audio('omshiva.mp3');
    audio.loop = true;
    let isPlaying = false;

    // Check if audio was previously playing
    const savedAudioState = localStorage.getItem('audioPlaying');
    if (savedAudioState === 'true') {
        audio.play().then(() => {
            isPlaying = true;
            audioControl.classList.add('playing');
        }).catch(error => {
            console.error('Audio autoplay failed:', error);
            // Most browsers require user interaction before playing audio
        });
    }

    audioControl.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            audioControl.classList.remove('playing');
            localStorage.setItem('audioPlaying', 'false');
        } else {
            audio.play().then(() => {
                audioControl.classList.add('playing');
                localStorage.setItem('audioPlaying', 'true');
            }).catch(error => {
                console.error('Audio playback failed:', error);
            });
        }
        isPlaying = !isPlaying;
    });
}

// Shivaratri Countdown Function
function updateShivaratriCountdown() {
    // Maha Shivaratri 2025 date (March 26, 2025)
    const shivaratriDate = new Date('2025-03-26T00:00:00');
    const now = new Date();
    const difference = shivaratriDate - now;

    // Calculate time units
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Update countdown elements with animation
    updateCountdownElement('countdown-days', days);
    updateCountdownElement('countdown-hours', hours);
    updateCountdownElement('countdown-mins', minutes);
    updateCountdownElement('countdown-secs', seconds);
}

function updateCountdownElement(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        const currentValue = parseInt(element.textContent);
        if (currentValue !== value) {
            element.classList.add('countdown-update');
            element.textContent = value.toString().padStart(2, '0');
            setTimeout(() => {
                element.classList.remove('countdown-update');
            }, 500);
        }
    }
}

// Initialize countdown
if (document.querySelector('.countdown-timer')) {
    updateShivaratriCountdown();
    setInterval(updateShivaratriCountdown, 1000);
} 