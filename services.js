document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles
    particlesJS.load('particles', '../js/particles-config.json');

    // Hide form initially
    const serviceForm = document.getElementById('service-form');
    serviceForm.style.display = 'none';

    // Handle form submission
    const serviceRequestForm = document.getElementById('serviceRequestForm');
    serviceRequestForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(serviceRequestForm);
        const serviceData = Object.fromEntries(formData.entries());
        
        // Handle payment based on selected method
        if (serviceData.paymentMethod === 'bank') {
            showBankDetails();
        } else if (serviceData.paymentMethod === 'esewa') {
            initiateEsewaPayment(serviceData);
        }
    });

    // Add event listeners for card number formatting
    document.addEventListener('input', function(e) {
        if (e.target.id === 'cardNumber') {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{4})/g, '$1 ').trim();
            e.target.value = value;
        }
        if (e.target.id === 'expiryDate') {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2);
            }
            e.target.value = value;
        }
    });
});

// Function to show the form when a service is selected
function showForm(serviceType) {
    const serviceForm = document.getElementById('service-form');
    const serviceTypeSelect = document.getElementById('serviceType');
    
    serviceForm.style.display = 'block';
    serviceTypeSelect.value = serviceType;
    
    // Scroll to form
    serviceForm.scrollIntoView({ behavior: 'smooth' });
}

// Function to show bank details
function showBankDetails() {
    const bankDetails = `
        <div class="bank-details">
            <h3>Bank Transfer Details</h3>
            <p>Bank Name: Nepal Investment Bank</p>
            <p>Account Name: Shiva Shakti Ashram</p>
            <p>Account Number: 1234567890</p>
            <p>Please use your name as reference</p>
            
            <div class="payment-options">
                <h4>Or Pay with Card</h4>
                <div class="card-payment-form">
                    <div class="form-group">
                        <label for="cardNumber">Card Number</label>
                        <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" maxlength="19">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="expiryDate">Expiry Date</label>
                            <input type="text" id="expiryDate" placeholder="MM/YY" maxlength="5">
                        </div>
                        <div class="form-group">
                            <label for="cvv">CVV</label>
                            <input type="text" id="cvv" placeholder="123" maxlength="3">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="cardName">Name on Card</label>
                        <input type="text" id="cardName" placeholder="Full Name">
                    </div>
                    <button class="btn primary-btn hover-scale" onclick="processCardPayment()">Pay Now</button>
                </div>
            </div>
        </div>
    `;
    
    // Show bank details and hide form
    const formContainer = document.querySelector('.form-container');
    formContainer.innerHTML = bankDetails;
}

// Function to initiate eSewa payment
function initiateEsewaPayment(serviceData) {
    const amount = calculateServiceAmount(serviceData.serviceType);
    
    const paymentDetails = `
        <div class="esewa-details">
            <h3>eSewa Payment</h3>
            <p>Amount: NPR ${amount}</p>
            
            <div class="esewa-payment-form">
                <div class="form-group">
                    <label for="esewaNumber">eSewa Number</label>
                    <input type="text" id="esewaNumber" placeholder="98XXXXXXXX" maxlength="10">
                </div>
                <div class="form-group">
                    <label for="esewaPin">eSewa PIN</label>
                    <input type="password" id="esewaPin" placeholder="Enter PIN" maxlength="4">
                </div>
                <div class="qr-section">
                    <p>Or scan the QR code below to pay:</p>
                    <img src="../images/esewa-qr.png" alt="eSewa QR Code" style="max-width: 200px;">
                    <p>eSewa ID: 1234567890</p>
                </div>
                <button class="btn primary-btn hover-scale" onclick="processEsewaPayment()">Pay Now</button>
            </div>
        </div>
    `;
    
    // Show payment details and hide form
    const formContainer = document.querySelector('.form-container');
    formContainer.innerHTML = paymentDetails;
}

// Function to process card payment
function processCardPayment() {
    const cardNumber = document.getElementById('cardNumber').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;
    const cardName = document.getElementById('cardName').value;
    
    // Basic validation
    if (!cardNumber || !expiryDate || !cvv || !cardName) {
        showPaymentError('Please fill in all card details');
        return;
    }
    
    // Show processing message
    const formContainer = document.querySelector('.form-container');
    formContainer.innerHTML = `
        <div class="payment-processing">
            <h3>Processing Payment</h3>
            <div class="spinner"></div>
            <p>Please wait while we process your payment...</p>
        </div>
    `;
    
    // Simulate payment processing
    setTimeout(() => {
        showPaymentSuccess();
    }, 2000);
}

// Function to process eSewa payment
function processEsewaPayment() {
    const esewaNumber = document.getElementById('esewaNumber').value;
    const esewaPin = document.getElementById('esewaPin').value;
    
    // Basic validation
    if (!esewaNumber || !esewaPin) {
        showPaymentError('Please enter eSewa number and PIN');
        return;
    }
    
    // Show processing message
    const formContainer = document.querySelector('.form-container');
    formContainer.innerHTML = `
        <div class="payment-processing">
            <h3>Processing eSewa Payment</h3>
            <div class="spinner"></div>
            <p>Please wait while we process your payment...</p>
        </div>
    `;
    
    // Simulate payment processing
    setTimeout(() => {
        showPaymentSuccess();
    }, 2000);
}

// Function to show payment error
function showPaymentError(message) {
    const formContainer = document.querySelector('.form-container');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'payment-error';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <p>${message}</p>
    `;
    formContainer.appendChild(errorDiv);
    
    // Remove error after 3 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

// Function to show payment success
function showPaymentSuccess() {
    const formContainer = document.querySelector('.form-container');
    formContainer.innerHTML = `
        <div class="payment-success">
            <i class="fas fa-check-circle"></i>
            <h3>Payment Successful!</h3>
            <p>Thank you for your payment. We will contact you shortly regarding your service request.</p>
            <button class="btn primary-btn hover-scale" onclick="window.location.href='../index.html'">Return to Home</button>
        </div>
    `;
}

// Function to calculate service amount
function calculateServiceAmount(serviceType) {
    const prices = {
        'graha-shanti': 5000,
        'pitri-yagya': 7500,
        'dev-yagya': 10000
    };
    
    return prices[serviceType] || 0;
} 