/**
 * Shiva Shakti Ashram - Donation Page JavaScript
 * This file contains functionality for the donation page
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all donation page features
    initAmountSelection();
    initDonationForm();
    initFaqAccordion();
    initImpactStories();
    initDonationOptions();
});

/**
 * Initialize amount selection buttons
 * Handles the selection of donation amounts
 */
function initAmountSelection() {
    const amountButtons = document.querySelectorAll('.amount-btn');
    const amountInput = document.getElementById('donation-amount');
    
    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            amountButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the amount from the data attribute
            const amount = this.getAttribute('data-amount');
            
            // If it's a custom amount, focus the input field
            if (amount === 'custom') {
                amountInput.value = '';
                amountInput.focus();
            } else {
                // Otherwise, set the input value to the selected amount
                amountInput.value = amount;
            }
        });
    });
    
    // When user types in the custom amount, update the active state
    amountInput.addEventListener('input', function() {
        amountButtons.forEach(btn => btn.classList.remove('active'));
    });
}

/**
 * Initialize donation form
 * Handles form submission and validation
 */
function initDonationForm() {
    const donationForm = document.getElementById('donation-form');
    const donationType = document.getElementById('donation-type');
    
    // Handle donation type change
    donationType.addEventListener('change', function() {
        const isMonthly = this.value === 'monthly';
        const submitButton = donationForm.querySelector('button[type="submit"]');
        
        // Update button text based on donation type
        if (isMonthly) {
            submitButton.textContent = getTranslation('donate-form-submit-monthly');
        } else {
            submitButton.textContent = getTranslation('donate-form-submit');
        }
    });
    
    // Handle form submission
    donationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (validateDonationForm()) {
            // Show success message
            showDonationSuccess();
            
            // In a real implementation, you would send the form data to a server here
            console.log('Form submitted successfully');
        }
    });
}

/**
 * Validate the donation form
 * @returns {boolean} Whether the form is valid
 */
function validateDonationForm() {
    const donationForm = document.getElementById('donation-form');
    const requiredFields = donationForm.querySelectorAll('[required]');
    let isValid = true;
    
    // Check all required fields
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
            
            // Add error message if it doesn't exist
            if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
                const errorMessage = document.createElement('div');
                errorMessage.classList.add('error-message');
                errorMessage.textContent = getTranslation('donate-form-error-required');
                field.parentNode.insertBefore(errorMessage, field.nextSibling);
            }
        } else {
            field.classList.remove('error');
            
            // Remove error message if it exists
            const errorMessage = field.nextElementSibling;
            if (errorMessage && errorMessage.classList.contains('error-message')) {
                errorMessage.remove();
            }
        }
    });
    
    // Validate email format
    const emailField = document.getElementById('donor-email');
    if (emailField.value.trim() && !isValidEmail(emailField.value)) {
        isValid = false;
        emailField.classList.add('error');
        
        // Add error message if it doesn't exist
        if (!emailField.nextElementSibling || !emailField.nextElementSibling.classList.contains('error-message')) {
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('error-message');
            errorMessage.textContent = getTranslation('donate-form-error-email');
            emailField.parentNode.insertBefore(errorMessage, emailField.nextSibling);
        }
    }
    
    // Validate amount is positive
    const amountField = document.getElementById('donation-amount');
    if (amountField.value && parseFloat(amountField.value) <= 0) {
        isValid = false;
        amountField.classList.add('error');
        
        // Add error message if it doesn't exist
        if (!amountField.nextElementSibling || !amountField.nextElementSibling.classList.contains('error-message')) {
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('error-message');
            errorMessage.textContent = getTranslation('donate-form-error-amount');
            amountField.parentNode.insertBefore(errorMessage, amountField.nextSibling);
        }
    }
    
    return isValid;
}

/**
 * Check if an email is valid
 * @param {string} email - The email to validate
 * @returns {boolean} Whether the email is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show donation success message
 */
function showDonationSuccess() {
    // Create success message element
    const successMessage = document.createElement('div');
    successMessage.classList.add('donation-success');
    successMessage.innerHTML = `
        <div class="success-icon">
            <i class="fas fa-check-circle"></i>
        </div>
        <h3>${getTranslation('donate-success-title')}</h3>
        <p>${getTranslation('donate-success-text')}</p>
        <button class="btn primary-btn" id="close-success">${getTranslation('donate-success-close')}</button>
    `;
    
    // Add to the page
    document.body.appendChild(successMessage);
    
    // Add active class after a small delay for animation
    setTimeout(() => {
        successMessage.classList.add('active');
    }, 10);
    
    // Handle close button
    document.getElementById('close-success').addEventListener('click', function() {
        successMessage.classList.remove('active');
        setTimeout(() => {
            successMessage.remove();
        }, 300);
    });
}

/**
 * Initialize FAQ accordion
 * Handles the expansion and collapse of FAQ items
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Toggle active class on the clicked item
            item.classList.toggle('active');
            
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
}

/**
 * Initialize impact stories
 * Adds hover effects and animations to impact story cards
 */
function initImpactStories() {
    const storyCards = document.querySelectorAll('.story-card');
    
    storyCards.forEach(card => {
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });
}

/**
 * Initialize donation options
 * Handles the donation option cards
 */
function initDonationOptions() {
    const optionButtons = document.querySelectorAll('.option-card .btn');
    
    optionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the option type from the parent card
            const card = this.closest('.option-card');
            const optionTitle = card.querySelector('h3').textContent;
            
            // Scroll to the donation form
            const formSection = document.querySelector('.donation-form-section');
            formSection.scrollIntoView({ behavior: 'smooth' });
            
            // Set the donation type based on the option
            const donationType = document.getElementById('donation-type');
            
            if (optionTitle.includes('One-Time')) {
                donationType.value = 'one-time';
            } else if (optionTitle.includes('Monthly')) {
                donationType.value = 'monthly';
            }
            
            // Trigger the change event to update the form
            const event = new Event('change');
            donationType.dispatchEvent(event);
        });
    });
}

/**
 * Get translation for a key
 * @param {string} key - The translation key
 * @returns {string} The translated text
 */
function getTranslation(key) {
    // This is a simplified version - in a real implementation, 
    // you would use the translations from main.js
    const translations = {
        'donate-form-submit': 'Proceed to Payment',
        'donate-form-submit-monthly': 'Set Up Monthly Payment',
        'donate-form-error-required': 'This field is required',
        'donate-form-error-email': 'Please enter a valid email address',
        'donate-form-error-amount': 'Please enter a positive amount',
        'donate-success-title': 'Thank You for Your Donation!',
        'donate-success-text': 'Your generosity will help us continue our mission. You will receive a confirmation email shortly.',
        'donate-success-close': 'Close'
    };
    
    return translations[key] || key;
}

/**
 * Add CSS for donation success message
 */
function addDonationSuccessStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .donation-success {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.8);
            background-color: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            text-align: center;
            z-index: 1000;
            opacity: 0;
            transition: all 0.3s ease;
            max-width: 500px;
            width: 90%;
        }
        
        .donation-success.active {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        
        .success-icon {
            font-size: 4rem;
            color: var(--primary-color);
            margin-bottom: 20px;
        }
        
        .donation-success h3 {
            font-size: 1.8rem;
            margin-bottom: 15px;
            color: var(--primary-color);
        }
        
        .donation-success p {
            margin-bottom: 25px;
            color: var(--text-color);
            line-height: 1.6;
        }
        
        .error-message {
            color: #e74c3c;
            font-size: 0.9rem;
            margin-top: 5px;
        }
        
        .form-group input.error,
        .form-group select.error,
        .form-group textarea.error {
            border-color: #e74c3c;
        }
        
        body.dark-mode .donation-success {
            background-color: var(--bg-dark);
        }
    `;
    
    document.head.appendChild(style);
}

// Call the function to add donation success styles
addDonationSuccessStyles(); 