// Authentication logic
document.addEventListener('DOMContentLoaded', () => {
    // Auth modal elements
    const authModal = document.getElementById('authModal');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');
    
    // Auth buttons
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const profileBtn = document.getElementById('profile-btn');
    
    // Mobile auth buttons
    const mobileLoginBtn = document.getElementById('mobile-login-btn');
    const mobileRegisterBtn = document.getElementById('mobile-register-btn');
    const mobileLogoutBtn = document.getElementById('mobile-logout-btn');
    const mobileProfileBtn = document.getElementById('mobile-profile-btn');
    
    // Close modal buttons
    const closeModalBtns = document.querySelectorAll('.close-modal');
    
    // Show login form
    function showLoginForm() {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    }
    
    // Show register form
    function showRegisterForm() {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
    
    // Open auth modal
    function openAuthModal(formType = 'login') {
        authModal.style.display = 'block';
        if (formType === 'login') {
            showLoginForm();
        } else {
            showRegisterForm();
        }
    }
    
    // Close auth modal
    function closeAuthModal() {
        authModal.style.display = 'none';
    }
    
    // Event listeners
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openAuthModal('login');
    });
    
    registerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openAuthModal('register');
    });
    
    mobileLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openAuthModal('login');
    });
    
    mobileRegisterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openAuthModal('register');
    });
    
    showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        showRegisterForm();
    });
    
    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        showLoginForm();
    });
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            closeAuthModal();
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === authModal) {
            closeAuthModal();
        }
    });
    
    // Login form submission
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                localStorage.setItem('token', data.token);
                closeAuthModal();
                checkAuthStatus();
                alert('Login successful!');
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (err) {
            console.error('Login error:', err);
            alert('An error occurred during login');
        }
    });
    
    // Register form submission
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                localStorage.setItem('token', data.token);
                closeAuthModal();
                checkAuthStatus();
                alert('Registration successful!');
            } else {
                alert(data.message || 'Registration failed');
            }
        } catch (err) {
            console.error('Registration error:', err);
            alert('An error occurred during registration');
        }
    });
    
    // Logout
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        checkAuthStatus();
        alert('Logged out successfully');
    });
    
    mobileLogoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        checkAuthStatus();
        alert('Logged out successfully');
    });
});