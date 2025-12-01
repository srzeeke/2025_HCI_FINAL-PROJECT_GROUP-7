// Basic interactivity: save profile to localStorage (demo)
document.getElementById('saveProfile').addEventListener('click', () => {
    const data = {
    fullName: document.getElementById('fullName').value,
    username: document.getElementById('username').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    bio: document.getElementById('bio').value
    };
    localStorage.setItem('profile', JSON.stringify(data));
    alert('Profile saved (local demo).');
});
document.getElementById('logout').addEventListener('click', () => {
    window.location = 'login.html';
});
