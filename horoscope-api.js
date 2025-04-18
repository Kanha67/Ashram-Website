// Hamro Patro API Integration
// Using mock data since the API endpoints don't exist
const HAMRO_PATRO_API = {
    RASHIFAL: 'https://api.hamropatro.com/rashifal',
    CALENDAR: 'https://api.hamropatro.com/calendar'
};

// Zodiac signs in Nepali and English
const ZODIAC_SIGNS = {
    mesh: { en: 'Aries', np: 'मेष' },
    brish: { en: 'Taurus', np: 'वृष' },
    mithun: { en: 'Gemini', np: 'मिथुन' },
    karkat: { en: 'Cancer', np: 'कर्कट' },
    singha: { en: 'Leo', np: 'सिंह' },
    kanya: { en: 'Virgo', np: 'कन्या' },
    tula: { en: 'Libra', np: 'तुला' },
    brishchik: { en: 'Scorpio', np: 'वृश्चिक' },
    dhanu: { en: 'Sagittarius', np: 'धनु' },
    makar: { en: 'Capricorn', np: 'मकर' },
    kumbha: { en: 'Aquarius', np: 'कुम्भ' },
    meen: { en: 'Pisces', np: 'मीन' }
};

// Mock data for horoscopes
const MOCK_HOROSCOPE_DATA = {
    mesh: {
        date: "Today, May 15, 2023",
        prediction: "Today is a great day for new beginnings. Your energy is high and you should take advantage of this to start new projects or relationships.",
        lucky: ["Red", "Tuesday", "Diamond"],
        unlucky: ["Blue", "Friday", "Pearl"]
    },
    brish: {
        date: "Today, May 15, 2023",
        prediction: "Focus on your financial matters today. A good day for investments and making important decisions about money.",
        lucky: ["Green", "Friday", "Emerald"],
        unlucky: ["Red", "Tuesday", "Ruby"]
    },
    mithun: {
        date: "Today, May 15, 2023",
        prediction: "Communication is highlighted today. Express yourself clearly and listen to others. A good day for networking.",
        lucky: ["Yellow", "Wednesday", "Citrine"],
        unlucky: ["Purple", "Sunday", "Amethyst"]
    },
    karkat: {
        date: "Today, May 15, 2023",
        prediction: "Emotional matters take center stage today. Trust your intuition and spend time with loved ones.",
        lucky: ["Silver", "Monday", "Moonstone"],
        unlucky: ["Gold", "Sunday", "Diamond"]
    },
    singha: {
        date: "Today, May 15, 2023",
        prediction: "Your leadership qualities are highlighted today. Take charge of situations and inspire others.",
        lucky: ["Gold", "Sunday", "Ruby"],
        unlucky: ["Silver", "Saturday", "Pearl"]
    },
    kanya: {
        date: "Today, May 15, 2023",
        prediction: "Focus on details and organization today. A good day for completing tasks and improving your skills.",
        lucky: ["Green", "Wednesday", "Emerald"],
        unlucky: ["Red", "Tuesday", "Garnet"]
    },
    tula: {
        date: "Today, May 15, 2023",
        prediction: "Balance and harmony are important today. Seek peace in your relationships and surroundings.",
        lucky: ["Pink", "Friday", "Rose Quartz"],
        unlucky: ["Black", "Saturday", "Onyx"]
    },
    brishchik: {
        date: "Today, May 15, 2023",
        prediction: "Transformation and change are in the air today. Embrace new opportunities and let go of what no longer serves you.",
        lucky: ["Red", "Tuesday", "Red Coral"],
        unlucky: ["Yellow", "Monday", "Citrine"]
    },
    dhanu: {
        date: "Today, May 15, 2023",
        prediction: "Expansion and growth are highlighted today. Look for opportunities to learn and expand your horizons.",
        lucky: ["Purple", "Thursday", "Amethyst"],
        unlucky: ["Green", "Wednesday", "Emerald"]
    },
    makar: {
        date: "Today, May 15, 2023",
        prediction: "Focus on your career and long-term goals today. A good day for planning and taking action.",
        lucky: ["Brown", "Saturday", "Tiger's Eye"],
        unlucky: ["White", "Monday", "Pearl"]
    },
    kumbha: {
        date: "Today, May 15, 2023",
        prediction: "Innovation and originality are highlighted today. Think outside the box and embrace your unique perspective.",
        lucky: ["Blue", "Saturday", "Sapphire"],
        unlucky: ["Red", "Tuesday", "Ruby"]
    },
    meen: {
        date: "Today, May 15, 2023",
        prediction: "Creativity and intuition are strong today. Trust your instincts and express yourself through art or music.",
        lucky: ["Sea Green", "Thursday", "Aquamarine"],
        unlucky: ["Red", "Tuesday", "Garnet"]
    }
};

// Mock data for Nepali calendar
const MOCK_CALENDAR_DATA = {
    nepaliDate: "जेठ २, २०८०",
    englishDate: "May 15, 2023",
    events: [
        { date: "जेठ २", name: "Akshaya Tritiya" },
        { date: "जेठ ५", name: "Buddha Jayanti" },
        { date: "जेठ १५", name: "Ganga Dussehra" }
    ]
};

// Fetch daily horoscope
async function fetchDailyHoroscope(sign) {
    try {
        // Using mock data instead of API call
        return MOCK_HOROSCOPE_DATA[sign] || null;
    } catch (error) {
        console.error('Error fetching horoscope:', error);
        return null;
    }
}

// Fetch Nepali calendar data
async function fetchNepaliCalendar() {
    try {
        // Using mock data instead of API call
        return MOCK_CALENDAR_DATA;
    } catch (error) {
        console.error('Error fetching calendar:', error);
        return null;
    }
}

// Update horoscope display
function updateHoroscopeDisplay(sign, data) {
    const horoscopeContainer = document.querySelector(`.horoscope-card[data-sign="${sign}"]`);
    if (!horoscopeContainer || !data) return;

    const dateElement = horoscopeContainer.querySelector('.horoscope-date');
    const predictionElement = horoscopeContainer.querySelector('.horoscope-prediction');
    const luckyItemsElement = horoscopeContainer.querySelector('.lucky-items .items');
    const unluckyItemsElement = horoscopeContainer.querySelector('.unlucky-items .items');

    if (dateElement) dateElement.textContent = data.date;
    if (predictionElement) predictionElement.textContent = data.prediction;
    
    if (luckyItemsElement && data.lucky) {
        luckyItemsElement.innerHTML = data.lucky.map(item => `<span>${item}</span>`).join('');
    }
    
    if (unluckyItemsElement && data.unlucky) {
        unluckyItemsElement.innerHTML = data.unlucky.map(item => `<span>${item}</span>`).join('');
    }
}

// Initialize horoscope page
async function initHoroscopePage() {
    // Fetch horoscope for all signs
    for (const sign of Object.keys(ZODIAC_SIGNS)) {
        const data = await fetchDailyHoroscope(sign);
        updateHoroscopeDisplay(sign, data);
    }

    // Fetch and update Nepali calendar
    const calendarData = await fetchNepaliCalendar();
    if (calendarData) {
        updateCalendarDisplay(calendarData);
    }
}

// Update calendar display
function updateCalendarDisplay(data) {
    const calendarContainer = document.querySelector('.calendar-container');
    if (!calendarContainer || !data) return;

    const nepaliDateElement = calendarContainer.querySelector('.nepali-date');
    const englishDateElement = calendarContainer.querySelector('.english-date');
    const eventsElement = calendarContainer.querySelector('.calendar-events');

    if (nepaliDateElement) nepaliDateElement.textContent = data.nepaliDate;
    if (englishDateElement) englishDateElement.textContent = data.englishDate;

    if (eventsElement && data.events) {
        eventsElement.innerHTML = data.events.map(event => `
            <div class="calendar-event">
                <span class="event-date">${event.date}</span>
                <span class="event-name">${event.name}</span>
            </div>
        `).join('');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initHoroscopePage);

// Export functions for use in other files
export {
    fetchDailyHoroscope,
    fetchNepaliCalendar,
    updateHoroscopeDisplay,
    updateCalendarDisplay,
    ZODIAC_SIGNS
}; 