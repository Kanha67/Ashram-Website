/**
 * Shiva Shakti Ashram - Calendar Page JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize calendar functionality
    initCalendar();
    
    // Initialize view toggle
    initViewToggle();
    
    // Initialize date accordion
    initDateAccordion();
});

/**
 * Calendar data - In a real application, this would come from a database
 * Each event has:
 * - date: YYYY-MM-DD format
 * - title: Event title
 * - time: Time of event
 * - type: festival, ritual, workshop, or moon
 * - description: Event description
 */
const calendarEvents = [
    {
        date: '2025-04-21',
        title: 'Hanuman Jayanti',
        time: '5:00 AM - 9:00 PM',
        type: 'festival',
        description: 'Celebration of Lord Hanuman\'s birth with special puja, bhajans, and Sundarkand recitation.'
    },
    {
        date: '2025-04-14',
        title: 'Rudrabhishekam',
        time: '6:00 AM - 8:00 AM',
        type: 'ritual',
        description: 'Special abhishekam to Lord Shiva with sacred offerings and mantras.'
    },
    {
        date: '2025-04-25',
        title: 'New Moon Meditation',
        time: '7:00 PM - 9:00 PM',
        type: 'moon',
        description: 'Deep meditation practice during the new moon for spiritual renewal.'
    },
    {
        date: '2025-04-18',
        title: 'Vedanta Philosophy Workshop',
        time: '10:00 AM - 1:00 PM',
        type: 'workshop',
        description: 'Exploration of Advaita Vedanta concepts and their application in daily life.'
    },
    {
        date: '2025-04-28',
        title: 'Sanskrit Chanting Class',
        time: '5:00 PM - 6:30 PM',
        type: 'workshop',
        description: 'Learn and practice ancient Sanskrit mantras and their proper pronunciation.'
    },
    {
        date: '2025-05-04',
        title: 'Akshaya Tritiya',
        time: 'All Day',
        type: 'festival',
        description: 'Auspicious day of prosperity and eternal success. Special pujas and havan ceremony.'
    },
    {
        date: '2025-05-12',
        title: 'Narasimha Jayanti',
        time: '6:00 PM - 9:00 PM',
        type: 'festival',
        description: 'Celebration of Lord Narasimha\'s appearance with special abhishekam and prayers.'
    },
    {
        date: '2025-05-15',
        title: 'Buddha Purnima (Full Moon)',
        time: '6:00 PM - 10:00 PM',
        type: 'moon',
        description: 'Full moon celebration with meditation on compassion and wisdom teachings.'
    },
    {
        date: '2025-05-20',
        title: 'Ayurvedic Healing Workshop',
        time: '10:00 AM - 4:00 PM',
        type: 'workshop',
        description: 'Learn about Ayurvedic principles and practices for holistic health.'
    },
    {
        date: '2025-05-25',
        title: 'Mrityunjaya Homa',
        time: '7:00 AM - 9:00 AM',
        type: 'ritual',
        description: 'Sacred fire ceremony dedicated to Lord Shiva as the conqueror of death.'
    },
    {
        date: '2025-06-13',
        title: 'Ganga Dussehra',
        time: '6:00 AM - 12:00 PM',
        type: 'festival',
        description: 'Celebration of the descent of Goddess Ganga to Earth with water rituals.'
    },
    {
        date: '2025-06-20',
        title: 'Summer Solstice Retreat',
        time: 'Three-day event',
        type: 'workshop',
        description: 'Intensive yoga and meditation retreat harnessing maximum solar energy.'
    },
    {
        date: '2025-06-29',
        title: 'Full Moon Kirtan',
        time: '7:30 PM - 10:00 PM',
        type: 'moon',
        description: 'Devotional singing under the full moon with traditional instruments.'
    }
];

/**
 * Initialize the interactive calendar
 */
function initCalendar() {
    // Get current date information
    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    
    // DOM elements
    const daysContainer = document.getElementById('calendar-days');
    const monthDisplay = document.getElementById('current-month-display');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const eventsListContainer = document.getElementById('events-list');
    
    // Navigation buttons
    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });
    
    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });
    
    /**
     * Render the calendar for the current month and year
     */
    function renderCalendar() {
        // Update month display
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                           'July', 'August', 'September', 'October', 'November', 'December'];
        monthDisplay.textContent = `${monthNames[currentMonth]} ${currentYear}`;
        
        // Clear previous days
        if (daysContainer) {
            daysContainer.innerHTML = '';
        }
        
        // Get first day of month and total days
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();
        
        // Get last date of previous month
        const prevMonthLastDate = new Date(currentYear, currentMonth, 0).getDate();
        
        // Variables for tracking
        let dateCount = 1;
        let nextMonthDate = 1;
        
        // Create day cells
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 7; col++) {
                const dayCell = document.createElement('div');
                dayCell.className = 'calendar-day';
                
                if (row === 0 && col < firstDay) {
                    // Previous month days
                    const prevMonthDay = prevMonthLastDate - (firstDay - col - 1);
                    dayCell.innerHTML = `<div class="day-number other-month">${prevMonthDay}</div>
                                        <div class="day-events"></div>`;
                    dayCell.classList.add('other-month');
                } 
                else if (dateCount > lastDate) {
                    // Next month days
                    dayCell.innerHTML = `<div class="day-number other-month">${nextMonthDate}</div>
                                        <div class="day-events"></div>`;
                    dayCell.classList.add('other-month');
                    nextMonthDate++;
                } 
                else {
                    // Current month days
                    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(dateCount).padStart(2, '0')}`;
                    
                    // Check if this is today
                    const isToday = dateCount === today.getDate() && 
                                   currentMonth === today.getMonth() && 
                                   currentYear === today.getFullYear();
                    
                    if (isToday) {
                        dayCell.classList.add('current-day');
                    }
                    
                    // Create day number element
                    dayCell.innerHTML = `<div class="day-number">${dateCount}</div>
                                        <div class="day-events"></div>`;
                    
                    // Add events for this day
                    const dayEvents = dayCell.querySelector('.day-events');
                    const eventsForDay = calendarEvents.filter(event => event.date === dateString);
                    
                    eventsForDay.forEach(event => {
                        const eventElem = document.createElement('div');
                        eventElem.className = `day-event ${event.type}`;
                        eventElem.textContent = event.title;
                        eventElem.setAttribute('data-date', dateString);
                        eventElem.setAttribute('data-title', event.title);
                        
                        // Show event details on click
                        eventElem.addEventListener('click', () => {
                            showEventDetails(event);
                        });
                        
                        dayEvents.appendChild(eventElem);
                    });
                    
                    dateCount++;
                }
                
                if (daysContainer) {
                    daysContainer.appendChild(dayCell);
                }
            }
        }
        
        // Render list view as well
        renderListView();
    }
    
    /**
     * Render the list view of events
     */
    function renderListView() {
        if (!eventsListContainer) return;
        
        // Clear previous events
        eventsListContainer.innerHTML = '';
        
        // Get all events for current month
        const monthStart = new Date(currentYear, currentMonth, 1);
        const monthEnd = new Date(currentYear, currentMonth + 1, 0);
        
        const monthStartStr = formatDateForComparison(monthStart);
        const monthEndStr = formatDateForComparison(monthEnd);
        
        const eventsForMonth = calendarEvents.filter(event => {
            const eventDate = event.date;
            return eventDate >= monthStartStr && eventDate <= monthEndStr;
        });
        
        // Sort events by date
        eventsForMonth.sort((a, b) => a.date.localeCompare(b.date));
        
        // Group events by date
        const eventsByDate = {};
        eventsForMonth.forEach(event => {
            if (!eventsByDate[event.date]) {
                eventsByDate[event.date] = [];
            }
            eventsByDate[event.date].push(event);
        });
        
        // Create event list
        for (const date in eventsByDate) {
            // Create date heading
            const dateObj = new Date(date);
            const formattedDate = dateObj.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
            });
            
            const dateHeading = document.createElement('h3');
            dateHeading.className = 'event-date-heading';
            dateHeading.textContent = formattedDate;
            eventsListContainer.appendChild(dateHeading);
            
            // Add events for this date
            eventsByDate[date].forEach(event => {
                const eventItem = document.createElement('div');
                eventItem.className = 'event-item';
                
                eventItem.innerHTML = `
                    <div class="event-time">${event.time}</div>
                    <div class="event-details">
                        <div class="event-tag ${event.type}">${capitalizeFirstLetter(event.type)}</div>
                        <h4 class="event-title">${event.title}</h4>
                        <p class="event-description">${event.description}</p>
                    </div>
                `;
                
                eventsListContainer.appendChild(eventItem);
            });
        }
        
        // If no events for this month
        if (Object.keys(eventsByDate).length === 0) {
            const noEvents = document.createElement('p');
            noEvents.textContent = 'No events scheduled for this month.';
            noEvents.style.textAlign = 'center';
            noEvents.style.padding = '30px 0';
            noEvents.style.color = '#666';
            eventsListContainer.appendChild(noEvents);
        }
    }
    
    /**
     * Show detailed information for an event
     * @param {Object} event - The event object
     */
    function showEventDetails(event) {
        // In a real application, this could show a modal with details
        // For simplicity, we'll just log it to console
        console.log('Event details:', event);
        
        // Create a simple alert for demo purposes
        const dateObj = new Date(event.date);
        const formattedDate = dateObj.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
        });
        
        alert(`${event.title}\n${formattedDate}\nTime: ${event.time}\nType: ${capitalizeFirstLetter(event.type)}\n\n${event.description}`);
    }
    
    /**
     * Format a date object to YYYY-MM-DD string for comparison
     * @param {Date} date - Date object
     * @returns {string} - Formatted date string
     */
    function formatDateForComparison(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    // Initialize calendar
    renderCalendar();
}

/**
 * Initialize the view toggle functionality
 */
function initViewToggle() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const calendarViews = document.querySelectorAll('.calendar-view');
    
    if (!viewButtons.length || !calendarViews.length) return;
    
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get view type from data attribute
            const viewType = button.getAttribute('data-view');
            
            // Remove active class from all buttons and views
            viewButtons.forEach(btn => btn.classList.remove('active'));
            calendarViews.forEach(view => view.classList.remove('active'));
            
            // Add active class to selected button and view
            button.classList.add('active');
            document.querySelector(`.${viewType}-view`).classList.add('active');
        });
    });
}

/**
 * Initialize the date accordion functionality
 */
function initDateAccordion() {
    const dateItems = document.querySelectorAll('.date-item');
    
    if (!dateItems.length) return;
    
    dateItems.forEach(item => {
        const header = item.querySelector('.date-header');
        
        header.addEventListener('click', () => {
            // Toggle active class for clicked item
            const isActive = item.classList.contains('active');
            
            // Close all items
            dateItems.forEach(dateItem => {
                dateItem.classList.remove('active');
            });
            
            // If the clicked item wasn't active before, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Open the first item by default
    if (dateItems.length > 0) {
        dateItems[0].classList.add('active');
    }
}

/**
 * Helper function to capitalize the first letter of a string
 * @param {string} string - The string to capitalize
 * @returns {string} - Capitalized string
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
} 