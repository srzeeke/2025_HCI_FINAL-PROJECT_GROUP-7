document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const password = document.getElementById('reg-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Simulate successful registration
        alert('Account created successfully! Redirecting to login...');
        
        // Redirect to Login page
        window.location.href = '../login/login.html';
    });
});