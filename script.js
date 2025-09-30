document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const successMessage = document.getElementById('successMessage');
    const resetBtn = document.getElementById('resetBtn');

    // Email validation regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation functions
    function validateName() {
        const name = nameInput.value.trim();
        if (name === '') {
            showError(nameInput, nameError, 'Name is required');
            return false;
        } else if (name.length < 3) {
            showError(nameInput, nameError, 'Name must be at least 3 characters long');
            return false;
        } else {
            showSuccess(nameInput, nameError);
            return true;
        }
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        if (email === '') {
            showError(emailInput, emailError, 'Email is required');
            return false;
        } else if (!emailRegex.test(email)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
            return false;
        } else {
            showSuccess(emailInput, emailError);
            return true;
        }
    }

    function validateMessage() {
        const message = messageInput.value.trim();
        if (message === '') {
            showError(messageInput, messageError, 'Message is required');
            return false;
        } else if (message.length < 10) {
            showError(messageInput, messageError, 'Message must be at least 10 characters long');
            return false;
        } else {
            showSuccess(messageInput, messageError);
            return true;
        }
    }

    // Helper functions for showing errors/success
    function showError(input, errorElement, message) {
        errorElement.textContent = message;
        input.classList.add('error');
        input.classList.remove('success');
    }

    function showSuccess(input, errorElement) {
        errorElement.textContent = '';
        input.classList.remove('error');
        input.classList.add('success');
    }

    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    messageInput.addEventListener('input', validateMessage);

    // Form submission handler
    contactForm.addEventListener('submit', function(event) {
        // Prevent default form submission
        event.preventDefault();

        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        // If all validations pass
        if (isNameValid && isEmailValid && isMessageValid) {
            // Show success message
            successMessage.textContent = 'Thank you! Your message has been sent successfully.';
            successMessage.style.display = 'block';
            
            // Reset form after 3 seconds
            setTimeout(() => {
                contactForm.reset();
                successMessage.style.display = 'none';
                
                // Remove success classes
                nameInput.classList.remove('success');
                emailInput.classList.remove('success');
                messageInput.classList.remove('success');
            }, 3000);
        }
    });

    // Reset button handler
    resetBtn.addEventListener('click', function() {
        contactForm.reset();
        successMessage.style.display = 'none';
        
        // Clear all error messages and classes
        nameError.textContent = '';
        emailError.textContent = '';
        messageError.textContent = '';
        
        nameInput.classList.remove('error', 'success');
        emailInput.classList.remove('error', 'success');
        messageInput.classList.remove('error', 'success');
    });

    // Additional validation on blur for better UX
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    messageInput.addEventListener('blur', validateMessage);
});