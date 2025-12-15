document.addEventListener('DOMContentLoaded', () => {
    const SIDEBAR_STATE_KEY = 'sidebarState'; 

    const saveBtn = document.querySelector('.save-btn');
    const logoutBtn = document.querySelector('.log-out-btn');
    
    saveBtn.addEventListener('click', () => {
        alert('Profile details saved!');
    });

    logoutBtn.addEventListener('click', () => {
        if(confirm('Are you sure you want to log out?')) {
            window.location.href = '../login/login.html';
        }
    });

    const sidebarToggle = document.getElementById('sidebarToggle');
    const appContainer = document.querySelector('.app-container');
    const icon = sidebarToggle ? sidebarToggle.querySelector('i') : null;

    function updateToggleIcon() {
        if (!icon) return;
        if (appContainer.classList.contains('sidebar-hidden')) {
            // Hidden: Show Hamburger icon
            icon.classList.remove('fa-arrow-right');
            icon.classList.add('fa-bars'); 
        } else {
            // Expanded: Show Arrow icon
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-arrow-right');
        }
    }

    if (sidebarToggle && appContainer) {
        
        const savedState = localStorage.getItem(SIDEBAR_STATE_KEY);
        if (savedState === 'hidden') {
            appContainer.classList.add('sidebar-hidden');
        } else {
            appContainer.classList.remove('sidebar-hidden');
        }
        
        updateToggleIcon();

        sidebarToggle.addEventListener('click', () => {
            appContainer.classList.toggle('sidebar-hidden');
            
            const newState = appContainer.classList.contains('sidebar-hidden') ? 'hidden' : 'expanded';
            localStorage.setItem(SIDEBAR_STATE_KEY, newState);

            updateToggleIcon();
        });
    }
});