(function() {
    // Constants
    const VALID_CREDENTIALS = {
        username: 'admin',
        password: 'admin'
    };
    
    // DOM elements
    const DOM = {
        usernameInput: document.getElementById('username'),
        passwordInput: document.getElementById('password'),
        errorMessage: document.getElementById('error-message'),
        loginForm: document.getElementById('loginForm')
    };
    
    // Functions
    function validateLogin(event) {
        if (event) event.preventDefault();
        
        const username = DOM.usernameInput.value.trim();
        const password = DOM.passwordInput.value;
        
        if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = '/dashboard';
        } else {
            DOM.errorMessage.textContent = 'Invalid username or password';
            // Add animation class
            DOM.errorMessage.classList.add('shake-error');
            // Remove class after animation finishes
            setTimeout(() => {
                DOM.errorMessage.classList.remove('shake-error');
            }, 500);
        }
    }
    
    function checkLoginStatus() {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            window.location.href = '/dashboard';
        }
    }
    
    function handleEnterKey(event) {
        if (event.key === 'Enter') {
            validateLogin();
        }
    }
    
    // Initialize
    function init() {
        checkLoginStatus();
        
        // Set up event listeners
        if (DOM.loginForm) {
            DOM.loginForm.addEventListener('submit', validateLogin);
        } else {
            // Fallback for inline button click
            window.validateLogin = validateLogin;
        }
        
        // Add keyboard event listeners
        DOM.usernameInput.addEventListener('keypress', handleEnterKey);
        DOM.passwordInput.addEventListener('keypress', handleEnterKey);
    }
    
    // Run initialization when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();