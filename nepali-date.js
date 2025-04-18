// Nepali Date Conversion Library
const nepaliYearMonths = {
    2080: [31, 31, 31, 32, 31, 31, 30, 30, 29, 30, 29, 31], // 2023-2024
    2081: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2024-2025
    2082: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30]  // 2025-2026
};

const nepaliMonths = [
    "बैशाख", "जेठ", "असार", "श्रावण", "भद्र", "आश्विन",
    "कार्तिक", "मंसिर", "पुष", "माघ", "फाल्गुन", "चैत्र"
];

const nepaliDays = [
    "आइतबार", "सोमबार", "मंगलबार", "बुधबार",
    "बिहिबार", "शुक्रबार", "शनिबार"
];

// Reference date (2080-01-01 in Nepali calendar)
const referenceEnglishDate = new Date(2023, 3, 14); // April 14, 2023
const referenceNepaliDate = {
    year: 2080,
    month: 0, // 0-based index (Baisakh)
    day: 1
};

function englishToNepali(englishDate) {
    // Calculate days difference from reference date
    const timeDiff = englishDate.getTime() - referenceEnglishDate.getTime();
    let daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

    let nepaliYear = referenceNepaliDate.year;
    let nepaliMonth = referenceNepaliDate.month;
    let nepaliDay = referenceNepaliDate.day;

    // Add the days difference to reference Nepali date
    while (daysDiff > 0) {
        // Get days in current Nepali month
        const daysInMonth = nepaliYearMonths[nepaliYear][nepaliMonth];
        
        if (nepaliDay + daysDiff > daysInMonth) {
            daysDiff -= (daysInMonth - nepaliDay + 1);
            nepaliMonth++;
            nepaliDay = 1;
            
            if (nepaliMonth >= 12) {
                nepaliYear++;
                nepaliMonth = 0;
            }
        } else {
            nepaliDay += daysDiff;
            daysDiff = 0;
        }
    }

    return {
        year: nepaliYear,
        month: nepaliMonth,
        day: nepaliDay,
        weekDay: englishDate.getDay(),
        format: function() {
            return `${nepaliDays[this.weekDay]}, ${nepaliMonths[this.month]} ${this.day}, ${this.year}`;
        },
        formatBS: function() {
            return `${this.day} ${nepaliMonths[this.month]} ${this.year} बि.सं.`;
        }
    };
}

function getNepaliMonth(monthIndex) {
    return nepaliMonths[monthIndex];
}

function getNepaliDay(dayIndex) {
    return nepaliDays[dayIndex];
}

// Export functions
window.NepaliDate = {
    convert: englishToNepali,
    getMonth: getNepaliMonth,
    getDay: getNepaliDay
}; 