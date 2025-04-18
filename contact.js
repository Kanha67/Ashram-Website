/**
 * Shiva Shakti Ashram - Contact Page JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the FAQ accordion
    initFaqAccordion();
    
    // Initialize contact form validation
    initContactFormValidation();
});

/**
 * Initialize FAQ accordion functionality
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (!faqItems.length) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        // Set initial height for each answer to 0
        answer.style.height = '0px';
        
        question.addEventListener('click', () => {
            // Toggle active class
            const isActive = item.classList.contains('active');
            
            // Close all FAQs
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                const faqAnswer = faq.querySelector('.faq-answer');
                faqAnswer.style.height = '0px';
            });
            
            // If the clicked item wasn't active before, open it
            if (!isActive) {
                item.classList.add('active');
                answer.style.height = answer.scrollHeight + 'px';
            }
        });
    });
    
    // Open the first FAQ by default
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
        const firstAnswer = faqItems[0].querySelector('.faq-answer');
        setTimeout(() => {
            firstAnswer.style.height = firstAnswer.scrollHeight + 'px';
        }, 100);
    }
}

/**
 * Initialize contact form validation
 */
function initContactFormValidation() {
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(contactForm)) {
            // If form is valid, show success message
            showFormSubmitFeedback(true);
            
            // In a real implementation, you would send the form data to a server here
            // For demo purposes, we'll just reset the form after a delay
            setTimeout(() => {
                contactForm.reset();
                // Hide success message after 5 seconds
                setTimeout(() => {
                    removeFormFeedback();
                }, 5000);
            }, 1000);
        } else {
            // If form is invalid, show error message
            showFormSubmitFeedback(false);
        }
    });
    
    // Add input event listeners for real-time validation
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            validateField(input);
        });
        
        input.addEventListener('blur', function() {
            validateField(input);
        });
    });
}

/**
 * Validate the entire form
 * @param {HTMLFormElement} form - The form to validate
 * @returns {boolean} - True if valid, false if invalid
 */
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    // Validate email format
    const emailField = form.querySelector('#email');
    if (emailField && emailField.value && !isValidEmail(emailField.value)) {
        showFieldError(emailField, 'Please enter a valid email address');
        isValid = false;
    }
    
    return isValid;
}

/**
 * Validate a single form field
 * @param {HTMLElement} field - The field to validate
 * @returns {boolean} - True if valid, false if invalid
 */
function validateField(field) {
    // Check if the field is required and empty
    if (field.hasAttribute('required') && !field.value.trim()) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    // If it's an email field, check email format
    if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    // If it's a select, check if default option is selected
    if (field.tagName === 'SELECT' && field.value === "") {
        showFieldError(field, 'Please select an option');
        return false;
    }
    
    // Remove error if field is valid
    removeFieldError(field);
    return true;
}

/**
 * Check if email format is valid
 * @param {string} email - The email to validate
 * @returns {boolean} - True if valid, false if invalid
 */
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Show error message for a field
 * @param {HTMLElement} field - The field with error
 * @param {string} message - The error message
 */
function showFieldError(field, message) {
    // Remove any existing error first
    removeFieldError(field);
    
    // Add error class to the field
    field.classList.add('error');
    
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    
    // Insert error after the field
    field.parentNode.appendChild(errorElement);
}

/**
 * Remove error message from a field
 * @param {HTMLElement} field - The field to remove error from
 */
function removeFieldError(field) {
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

/**
 * Show form submission feedback
 * @param {boolean} success - Whether submission was successful
 */
function showFormSubmitFeedback(success) {
    // Remove any existing feedback
    removeFormFeedback();
    
    const form = document.querySelector('.contact-form');
    const feedbackElement = document.createElement('div');
    feedbackElement.className = success ? 'form-feedback success' : 'form-feedback error';
    
    if (success) {
        feedbackElement.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for your message. We will respond soon.';
    } else {
        feedbackElement.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please fix the errors in the form and try again.';
    }
    
    // Insert at the top of the form
    form.insertBefore(feedbackElement, form.firstChild);
    
    // Scroll to feedback
    feedbackElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Remove form submission feedback
 */
function removeFormFeedback() {
    const existingFeedback = document.querySelector('.form-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
}

/**
 * Add styles for form validation and feedback
 */
function addFormStyles() {
    // Create style element if it doesn't exist
    if (!document.getElementById('contact-form-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'contact-form-styles';
        
        // CSS for validation and feedback
        styleElement.textContent = `
            .field-error {
                color: #ff3b30;
                font-size: 0.85rem;
                margin-top: 5px;
                animation: fadeIn 0.3s ease;
            }
            
            input.error, select.error, textarea.error {
                border-color: #ff3b30 !important;
                box-shadow: 0 0 0 3px rgba(255, 59, 48, 0.1) !important;
            }
            
            .form-feedback {
                padding: 12px 15px;
                border-radius: 8px;
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                animation: fadeIn 0.5s ease;
            }
            
            .form-feedback i {
                margin-right: 10px;
                font-size: 1.2rem;
            }
            
            .form-feedback.success {
                background-color: rgba(52, 199, 89, 0.1);
                border: 1px solid #34c759;
                color: #34c759;
            }
            
            .form-feedback.error {
                background-color: rgba(255, 59, 48, 0.1);
                border: 1px solid #ff3b30;
                color: #ff3b30;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .dark-mode .form-feedback.success {
                background-color: rgba(52, 199, 89, 0.2);
                color: #4cd964;
            }
            
            .dark-mode .form-feedback.error {
                background-color: rgba(255, 59, 48, 0.2);
                color: #ff6b66;
            }
            
            .dark-mode .field-error {
                color: #ff6b66;
            }
        `;
        
        document.head.appendChild(styleElement);
    }
}

// Add form styles when DOM is loaded
document.addEventListener('DOMContentLoaded', addFormStyles); 