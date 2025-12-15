document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if(email && password) {
            // Simulate successful login
            console.log('Login successful for:', email);
            
            // Redirect to the main app (Messages page)
            window.location.href = '../messages/messages.html';
        } else {
            alert('Please fill in all fields');
        }
    });
});