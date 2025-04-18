/**
 * Shiva Shakti Ashram - Horoscope Page JavaScript
 * Functionality for the Vedic Astrology page, including horoscope display,
 * zodiac toggles, birth chart calculation, and testimonial slider
 */

// Horoscope Data Structure
const horoscopeData = {
    aries: {
        nepali: "मेष",
        icon: "fa-ram",
        lucky: ["Red", "Tuesday", "Diamond"],
        unlucky: ["Blue", "Friday", "Pearl"]
    },
    taurus: {
        nepali: "वृषभ",
        icon: "fa-bull",
        lucky: ["Green", "Friday", "Emerald"],
        unlucky: ["Red", "Tuesday", "Ruby"]
    },
    gemini: {
        nepali: "मिथुन",
        icon: "fa-users",
        lucky: ["Yellow", "Wednesday", "Topaz"],
        unlucky: ["Black", "Saturday", "Onyx"]
    },
    cancer: {
        nepali: "कर्कट",
        icon: "fa-crab",
        lucky: ["Silver", "Monday", "Pearl"],
        unlucky: ["Red", "Sunday", "Ruby"]
    },
    leo: {
        nepali: "सिंह",
        icon: "fa-crown",
        lucky: ["Gold", "Sunday", "Ruby"],
        unlucky: ["Silver", "Monday", "Pearl"]
    },
    virgo: {
        nepali: "कन्या",
        icon: "fa-virgin",
        lucky: ["Navy Blue", "Wednesday", "Sapphire"],
        unlucky: ["Red", "Tuesday", "Ruby"]
    },
    libra: {
        nepali: "तुला",
        icon: "fa-balance-scale",
        lucky: ["Pink", "Friday", "Opal"],
        unlucky: ["Black", "Saturday", "Onyx"]
    },
    scorpio: {
        nepali: "वृश्चिक",
        icon: "fa-scorpion",
        lucky: ["Black", "Tuesday", "Black Pearl"],
        unlucky: ["Yellow", "Thursday", "Topaz"]
    },
    sagittarius: {
        nepali: "धनु",
        icon: "fa-bow-arrow",
        lucky: ["Purple", "Thursday", "Amethyst"],
        unlucky: ["Green", "Friday", "Emerald"]
    },
    capricorn: {
        nepali: "मकर",
        icon: "fa-mountain",
        lucky: ["Brown", "Saturday", "Black Onyx"],
        unlucky: ["Yellow", "Thursday", "Topaz"]
    },
    aquarius: {
        nepali: "कुम्भ",
        icon: "fa-water",
        lucky: ["Blue", "Saturday", "Sapphire"],
        unlucky: ["Red", "Tuesday", "Ruby"]
    },
    pisces: {
        nepali: "मीन",
        icon: "fa-fish",
        lucky: ["Sea Green", "Thursday", "Aquamarine"],
        unlucky: ["Red", "Tuesday", "Ruby"]
    }
};

// API Configuration
const API_BASE_URL = "https://python.ankurgajurel.com.np/rashifal";
const RASHI_MAP = {
    aries: "mesh",
    taurus: "brish",
    gemini: "mithun",
    cancer: "karkat",
    leo: "singha",
    virgo: "kanya",
    libra: "tula",
    scorpio: "brischik",
    sagittarius: "dhanu",
    capricorn: "makar",
    aquarius: "kumbha",
    pisces: "meen"
};

// NepaliTime API Configuration
const NEPALI_TIME_API = {
    BASE_URL: "https://nepaltime.herokuapp.com/api/v1",
    ENDPOINTS: {
        TODAY: "/today",
        AD_TO_BS: "/adtobs",
        BS_TO_AD: "/bstoad"
    }
};

// Calendar Events Data
const calendarEvents = [
    {
        date: "2024-03-21",
        title: "Navaratri Begins",
        titleNp: "नवरात्री सुरु हुन्छ",
        description: "Nine nights of divine celebration",
        descriptionNp: "दिव्य उत्सवको नौ रात"
    },
    {
        date: "2024-03-25",
        title: "Ram Navami",
        titleNp: "राम नवमी",
        description: "Birth celebration of Lord Rama",
        descriptionNp: "भगवान रामको जन्मोत्सव"
    },
    {
        date: "2024-04-13",
        title: "Baisakh Sankranti",
        titleNp: "बैशाख संक्रान्ति",
        description: "Nepali New Year",
        descriptionNp: "नेपाली नयाँ वर्ष"
    }
];

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all horoscope page functionality
    initDailyHoroscope();
    initZodiacToggles();
    initZodiacReadMore();
    initBirthChartForm();
    initTestimonialSlider();
    initFaqAccordion();
    initAnimationOnScroll();
    initializeHoroscopeCards();
    initializeCalendar();
    updateCurrentDate();
});

/**
 * Initialize Daily Horoscope functionality with date navigation
 */
function initDailyHoroscope() {
    const prevDateBtn = document.querySelector('.date-btn.prev');
    const nextDateBtn = document.querySelector('.date-btn.next');
    const currentDateEl = document.getElementById('current-date');
    
    if (!prevDateBtn || !nextDateBtn || !currentDateEl) return;
    
    let currentDate = new Date();
    updateDisplayDate();
    
    prevDateBtn.addEventListener('click', function() {
        currentDate.setDate(currentDate.getDate() - 1);
        updateDisplayDate();
        updateHoroscopeContent();
    });
    
    nextDateBtn.addEventListener('click', function() {
        // Can't go to future dates
        if (isFutureDate(currentDate)) return;
        
        currentDate.setDate(currentDate.getDate() + 1);
        updateDisplayDate();
        updateHoroscopeContent();
    });
    
    function updateDisplayDate() {
        const options = { weekday: 'long', month: 'short', day: 'numeric' };
        currentDateEl.textContent = currentDate.toLocaleDateString('en-US', options);
        
        // Disable next button if we're at today's date
        if (isToday(currentDate)) {
            nextDateBtn.classList.add('disabled');
            nextDateBtn.disabled = true;
        } else {
            nextDateBtn.classList.remove('disabled');
            nextDateBtn.disabled = false;
        }
    }
    
    function updateHoroscopeContent() {
        // In a real implementation, this would fetch horoscope data for the selected date
        // For now, we'll just show a loading animation and simulate a content update
        
        const overviewContent = document.querySelector('.cosmic-overview .planetary-grid');
        const messageContent = document.querySelector('.cosmic-message .message-content');
        
        if (!overviewContent || !messageContent) return;
        
        // Show loading state
        overviewContent.style.opacity = '0.5';
        messageContent.style.opacity = '0.5';
        
        setTimeout(() => {
            // Reset opacity after "loading"
            overviewContent.style.opacity = '1';
            messageContent.style.opacity = '1';
            
            // In a real implementation, we would update the content with actual data
            // For the demo, we'll just leave it as is
        }, 800);
    }
    
    function isToday(date) {
        const today = new Date();
        return date.getDate() === today.getDate() &&
               date.getMonth() === today.getMonth() &&
               date.getFullYear() === today.getFullYear();
    }
    
    function isFutureDate(date) {
        const today = new Date();
        return date > today;
    }
}

/**
 * Initialize Zodiac Toggle buttons (Daily, Weekly, Monthly)
 */
function initZodiacToggles() {
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    
    if (!toggleBtns.length) return;
    
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            toggleBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the time period from data attribute
            const timePeriod = this.getAttribute('data-period');
            
            // Update the zodiac content based on time period
            updateZodiacContent(timePeriod);
        });
    });
    
    function updateZodiacContent(period) {
        // In a real implementation, this would show different horoscope content 
        // based on the selected time period (daily/weekly/monthly)
        // For now, we'll just show a loading animation and simulate a content update
        
        const zodiacGrid = document.querySelector('.zodiac-grid');
        
        if (!zodiacGrid) return;
        
        // Show loading state
        zodiacGrid.style.opacity = '0.5';
        
        setTimeout(() => {
            // Reset opacity after "loading"
            zodiacGrid.style.opacity = '1';
            
            // Update the title based on period
            const sectionTitle = document.querySelector('.zodiac-readings h2');
            if (sectionTitle) {
                sectionTitle.textContent = `${period.charAt(0).toUpperCase() + period.slice(1)} Zodiac Readings`;
            }
            
            // In a real implementation, we would update the content with actual data
        }, 800);
    }
}

/**
 * Initialize Read More functionality for Zodiac cards
 */
function initZodiacReadMore() {
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    
    if (!readMoreBtns.length) return;
    
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const card = this.closest('.zodiac-card');
            const preview = card.querySelector('.zodiac-preview');
            const fullContent = card.querySelector('.zodiac-full');
            
            if (!preview || !fullContent) return;
            
            if (this.textContent === 'Read More') {
                // Show full content
                preview.style.display = 'none';
                fullContent.style.display = 'block';
                this.textContent = 'Read Less';
                
                // Add fade-in animation to full content
                fullContent.style.animation = 'fadeIn 0.5s ease';
            } else {
                // Show preview
                preview.style.display = 'block';
                fullContent.style.display = 'none';
                this.textContent = 'Read More';
            }
        });
    });
}

/**
 * Initialize Birth Chart Calculator Form
 */
function initBirthChartForm() {
    const birthChartForm = document.querySelector('.chart-form form');
    
    if (!birthChartForm) return;
    
    birthChartForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[name="name"]').value;
        const birthdate = this.querySelector('input[name="birthdate"]').value;
        const birthtime = this.querySelector('input[name="birthtime"]').value;
        const birthplace = this.querySelector('input[name="birthplace"]').value;
        
        // Validate form
        if (!name || !birthdate || !birthtime || !birthplace) {
            alert('Please fill in all fields to calculate your birth chart.');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Calculating...';
        submitBtn.disabled = true;
        
        // In a real implementation, this would call an API to generate the birth chart
        // For now, we'll just simulate the calculation
        setTimeout(() => {
            // Reset button
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
            
            // Show success message
            showChartSuccess(name);
            
            // Clear form
            this.reset();
        }, 2000);
    });
    
    function showChartSuccess(name) {
        const chartResult = document.createElement('div');
        chartResult.className = 'chart-result';
        chartResult.innerHTML = `
            <div class="success-message">
                <h3>Birth Chart Generated Successfully!</h3>
                <p>Dear ${name}, your personalized birth chart has been created. Our astrologer will review it and contact you within 24 hours with detailed insights.</p>
                <p>Thank you for your patience.</p>
            </div>
        `;
        
        const chartForm = document.querySelector('.chart-form');
        chartForm.style.display = 'none';
        
        const chartCalculator = document.querySelector('.chart-calculator');
        chartCalculator.appendChild(chartResult);
        
        // Scroll to the result
        chartResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

/**
 * Initialize Testimonial Slider
 */
function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!slides.length || !indicators.length) return;
    
    let currentSlide = 0;
    let slideInterval;
    
    // Initialize the slider
    showSlide(currentSlide);
    startSlideInterval();
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            // Stop auto sliding when user interacts
            clearInterval(slideInterval);
            
            // Show the clicked slide
            currentSlide = index;
            showSlide(currentSlide);
            
            // Restart auto sliding
            startSlideInterval();
        });
    });
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all indicators
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Show the current slide
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function startSlideInterval() {
        // Auto slide every 5 seconds
        slideInterval = setInterval(nextSlide, 5000);
    }
}

/**
 * Initialize FAQ Accordion
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (!faqItems.length) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (!question) return;
        
        question.addEventListener('click', function() {
            // Check if this item is already active
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // If the clicked item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

/**
 * Initialize Animation on Scroll
 * Uses Intersection Observer to animate elements as they come into view
 */
function initAnimationOnScroll() {
    // Elements to observe
    const elementsToAnimate = [
        ...document.querySelectorAll('.zodiac-card'),
        ...document.querySelectorAll('.info-card'),
        ...document.querySelectorAll('.service-card')
    ];
    
    if (!elementsToAnimate.length) return;
    
    const options = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the element visible
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class when element is visible
                entry.target.classList.add('animate-in');
                
                // Stop observing the element once it's animated
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    // Add initial styles to elements
    elementsToAnimate.forEach(element => {
        // Set initial opacity and transform
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Start observing the element
        observer.observe(element);
    });
    
    // Add animate-in class CSS in JS (could also be in CSS file)
    const style = document.createElement('style');
    style.innerHTML = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Initialize Planetary Positions
 * In a real implementation, this would fetch actual planetary data
 */
function initPlanetaryPositions() {
    // Current planetary positions could be fetched from an astrological API
    const planets = [
        { name: 'Sun', position: 'Aries' },
        { name: 'Moon', position: 'Cancer' },
        { name: 'Mercury', position: 'Pisces' },
        { name: 'Venus', position: 'Aries' },
        { name: 'Mars', position: 'Gemini' },
        { name: 'Jupiter', position: 'Taurus' },
        { name: 'Saturn', position: 'Aquarius' },
        { name: 'Rahu', position: 'Aries' }
    ];
    
    const planetaryGrid = document.querySelector('.planetary-grid');
    
    if (!planetaryGrid) return;
    
    planets.forEach(planet => {
        const planetCard = document.createElement('div');
        planetCard.className = 'planet-card';
        planetCard.innerHTML = `
            <div class="planet-icon ${planet.name.toLowerCase()}">
                ${planet.name.charAt(0)}
            </div>
            <div class="planet-info">
                <h4>${planet.name}</h4>
                <p>${planet.position}</p>
            </div>
        `;
        
        planetaryGrid.appendChild(planetCard);
    });
}

// Initialize Horoscope Cards
async function initializeHoroscopeCards() {
    const horoscopeGrid = document.querySelector('.horoscope-grid');
    if (!horoscopeGrid) return;

    // Show loading state
    horoscopeGrid.innerHTML = '<div class="loading">Loading horoscopes...</div>';

    try {
        // Create all cards with loading state
        const cards = await Promise.all(
            Object.entries(horoscopeData).map(async ([sign, data]) => {
                const card = createHoroscopeCard(sign, data);
                // Fetch predictions for this sign
                await updateCardPredictions(card, sign);
                return card;
            })
        );

        // Clear loading state and add cards
        horoscopeGrid.innerHTML = '';
        cards.forEach(card => horoscopeGrid.appendChild(card));

    } catch (error) {
        console.error('Error initializing horoscope cards:', error);
        horoscopeGrid.innerHTML = '<div class="error">Failed to load horoscopes. Please try again later.</div>';
    }
}

// Create Horoscope Card
function createHoroscopeCard(sign, data) {
    const card = document.createElement('div');
    card.className = 'horoscope-card';
    card.setAttribute('data-sign', sign);
    card.innerHTML = `
        <div class="zodiac-icon">
            <i class="fas ${data.icon}"></i>
        </div>
        <h3>${sign.charAt(0).toUpperCase() + sign.slice(1)} <span class="nepali">${data.nepali}</span></h3>
        <div class="horoscope-date" data-translate="todays-horoscope">Today's Horoscope</div>
        <div class="horoscope-prediction">
            <div class="prediction-loading">Loading prediction...</div>
            <p class="en" style="display: none;"></p>
            <p class="np" style="display: none;"></p>
        </div>
        <div class="lucky-items">
            <h4 data-translate="lucky-items">Lucky Items</h4>
            <div class="items">
                ${data.lucky.map(item => `<span>${item}</span>`).join('')}
            </div>
        </div>
        <div class="unlucky-items">
            <h4 data-translate="unlucky-items">Unlucky Items</h4>
            <div class="items">
                ${data.unlucky.map(item => `<span>${item}</span>`).join('')}
            </div>
        </div>
    `;

    return card;
}

// Fetch and Update Card Predictions
async function updateCardPredictions(card, sign) {
    const predictionContainer = card.querySelector('.horoscope-prediction');
    const loadingDiv = predictionContainer.querySelector('.prediction-loading');
    const enPrediction = predictionContainer.querySelector('.en');
    const npPrediction = predictionContainer.querySelector('.np');

    try {
        // Get the corresponding Nepali rashi name
        const rashiName = RASHI_MAP[sign.toLowerCase()];
        if (!rashiName) throw new Error('Invalid rashi name');

        // Fetch daily prediction
        const response = await fetch(`${API_BASE_URL}/daily/${rashiName}`);
        if (!response.ok) throw new Error('Failed to fetch prediction');
        
        const data = await response.json();

        // Update predictions
        enPrediction.textContent = data.prediction || 'Prediction not available';
        npPrediction.textContent = data.prediction_np || 'राशिफल उपलब्ध छैन';

        // Show predictions and hide loading
        loadingDiv.style.display = 'none';
        enPrediction.style.display = 'block';
        npPrediction.style.display = 'none';

    } catch (error) {
        console.error(`Error fetching prediction for ${sign}:`, error);
        loadingDiv.textContent = 'Failed to load prediction';
    }
}

// Initialize Calendar
async function initializeCalendar() {
    const calendarEventsContainer = document.querySelector('.calendar-events');
    if (!calendarEventsContainer) return;

    try {
        // Get today's date in both AD and BS
        const today = await fetchTodayDate();
        updateCurrentDate(today);
        initializeDateConverter();

        // Convert event dates to BS
        const eventsWithBSDates = await Promise.all(
            calendarEvents.map(async (event) => {
                const bsDate = await convertADtoBS(event.date);
                return {
                    ...event,
                    bsDate
                };
            })
        );

        // Create and append event elements
        eventsWithBSDates.forEach(event => {
            const eventElement = createEventElement(event);
            calendarEventsContainer.appendChild(eventElement);
        });

    } catch (error) {
        console.error('Error initializing calendar:', error);
        calendarEventsContainer.innerHTML = '<div class="error">Failed to load calendar events. Please try again later.</div>';
    }
}

// Initialize Date Converter
function initializeDateConverter() {
    const converterType = document.querySelector('.conversion-type');
    const convertBtns = document.querySelectorAll('.convert-btn');
    
    if (converterType) {
        converterType.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                // Update active button
                converterType.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                
                // Show/hide appropriate conversion form
                const type = e.target.dataset.type;
                document.querySelector('.conversion-inputs.adtobs').style.display = type === 'adtobs' ? 'block' : 'none';
                document.querySelector('.conversion-inputs.bstoad').style.display = type === 'bstoad' ? 'block' : 'none';
                document.querySelector('.conversion-result').innerHTML = '';
            }
        });
    }

    convertBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            const type = converterType.querySelector('.active').dataset.type;
            const resultDiv = document.querySelector('.conversion-result');
            
            try {
                if (type === 'adtobs') {
                    const year = document.getElementById('ad-year').value;
                    const month = document.getElementById('ad-month').value;
                    const day = document.getElementById('ad-day').value;
                    
                    if (!year || !month || !day) {
                        throw new Error('Please fill in all fields');
                    }
                    
                    const result = await convertADtoBS(`${year}-${month}-${day}`);
                    if (result) {
                        resultDiv.innerHTML = `
                            <div class="result-success">
                                <p>${result.bs_year} ${getNepaliMonth(result.bs_month - 1)} ${result.bs_day} बि.सं.</p>
                            </div>
                        `;
                    }
                } else {
                    const year = document.getElementById('bs-year').value;
                    const month = document.getElementById('bs-month').value;
                    const day = document.getElementById('bs-day').value;
                    
                    if (!year || !month || !day) {
                        throw new Error('Please fill in all fields');
                    }
                    
                    const result = await convertBStoAD(parseInt(year), parseInt(month), parseInt(day));
                    if (result) {
                        resultDiv.innerHTML = `
                            <div class="result-success">
                                <p>${result.ad_year} ${getEnglishMonth(result.ad_month - 1)} ${result.ad_day} A.D.</p>
                            </div>
                        `;
                    }
                }
            } catch (error) {
                resultDiv.innerHTML = `
                    <div class="result-error">
                        <p>${error.message}</p>
                    </div>
                `;
            }
        });
    });
}

// Fetch Today's Date
async function fetchTodayDate() {
    try {
        const response = await fetch(`${NEPALI_TIME_API.BASE_URL}${NEPALI_TIME_API.ENDPOINTS.TODAY}`);
        if (!response.ok) throw new Error('Failed to fetch today\'s date');
        return await response.json();
    } catch (error) {
        console.error('Error fetching today\'s date:', error);
        return null;
    }
}

// Convert AD to BS
async function convertADtoBS(adDate) {
    try {
        const [year, month, day] = adDate.split('-');
        const response = await fetch(`${NEPALI_TIME_API.BASE_URL}${NEPALI_TIME_API.ENDPOINTS.AD_TO_BS}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                year: parseInt(year),
                month: parseInt(month),
                day: parseInt(day)
            })
        });
        if (!response.ok) throw new Error('Failed to convert AD to BS');
        return await response.json();
    } catch (error) {
        console.error('Error converting AD to BS:', error);
        return null;
    }
}

// Convert BS to AD
async function convertBStoAD(bsYear, bsMonth, bsDay) {
    try {
        const response = await fetch(`${NEPALI_TIME_API.BASE_URL}${NEPALI_TIME_API.ENDPOINTS.BS_TO_AD}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                year: bsYear,
                month: bsMonth,
                day: bsDay
            })
        });
        if (!response.ok) throw new Error('Failed to convert BS to AD');
        return await response.json();
    } catch (error) {
        console.error('Error converting BS to AD:', error);
        return null;
    }
}

// Update Current Date Display
function updateCurrentDate(todayData) {
    const currentDateContainer = document.querySelector('.current-date');
    const currentTithiContainer = document.querySelector('.current-tithi');
    if (!currentDateContainer || !currentTithiContainer || !todayData) return;

    const { bs_year, bs_month, bs_day, bs_day_name, ad_year, ad_month, ad_day, ad_day_name, tithi } = todayData;

    currentDateContainer.innerHTML = `
        <div class="nepali-date">
            ${bs_day_name}, ${getNepaliMonth(bs_month - 1)} ${bs_day}, ${bs_year} बि.सं.
        </div>
        <div class="english-date">
            ${ad_day_name}, ${getEnglishMonth(ad_month - 1)} ${ad_day}, ${ad_year} A.D.
        </div>
    `;

    currentTithiContainer.innerHTML = `
        <div class="tithi">
            <span class="label" data-translate="tithi">Tithi:</span>
            <span class="value">${tithi}</span>
        </div>
    `;
}

// Create Event Element
function createEventElement(event) {
    const eventElement = document.createElement('div');
    eventElement.className = 'event-item';
    
    const bsDate = event.bsDate;
    const dateDisplay = bsDate ? 
        `${bsDate.bs_day} ${getNepaliMonth(bsDate.bs_month - 1)} ${bsDate.bs_year} बि.सं.` :
        formatDate(event.date);

    eventElement.innerHTML = `
        <h3 class="en">${event.title}</h3>
        <h3 class="np" style="display: none;">${event.titleNp}</h3>
        <p class="en">${event.description}</p>
        <p class="np" style="display: none;">${event.descriptionNp}</p>
        <small>${dateDisplay}</small>
    `;
    return eventElement;
}

// Helper function to get English month name
function getEnglishMonth(monthIndex) {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return months[monthIndex];
}

// Format Date
function formatDate(dateString) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Update Language
function updateLanguage(language) {
    // Update horoscope predictions
    const predictions = document.querySelectorAll('.horoscope-prediction');
    predictions.forEach(predictionContainer => {
        const enPrediction = predictionContainer.querySelector('.en');
        const npPrediction = predictionContainer.querySelector('.np');

        if (language === 'en') {
            enPrediction.style.display = 'block';
            npPrediction.style.display = 'none';
        } else {
            enPrediction.style.display = 'none';
            npPrediction.style.display = 'block';
        }
    });
    
    // Update section titles
    const sectionTitles = document.querySelectorAll('[data-translate]');
    sectionTitles.forEach(title => {
        const key = title.getAttribute('data-translate');
        if (language === 'np') {
            title.textContent = translations.np[key] || title.textContent;
        } else {
            title.textContent = translations.en[key] || title.textContent;
        }
    });
}

// Translations
const translations = {
    en: {
        "todays-horoscope": "Today's Horoscope",
        "lucky-items": "Lucky Items",
        "unlucky-items": "Unlucky Items"
    },
    np: {
        "todays-horoscope": "आजको राशिफल",
        "lucky-items": "शुभ वस्तुहरू",
        "unlucky-items": "अशुभ वस्तुहरू"
    }
};

// Theme Toggle Handler
document.addEventListener('themeChanged', () => {
    // Refresh any theme-dependent elements
    const cards = document.querySelectorAll('.horoscope-card');
    cards.forEach(card => {
        card.style.transition = 'none';
        setTimeout(() => {
            card.style.transition = 'all 0.3s ease';
        }, 50);
    });
}); 