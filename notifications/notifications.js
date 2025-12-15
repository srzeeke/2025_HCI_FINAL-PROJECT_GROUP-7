document.addEventListener('DOMContentLoaded', () => {
    const SIDEBAR_STATE_KEY = 'sidebarState'; 

    const toggles = document.querySelectorAll('input[type="checkbox"]');
    toggles.forEach(toggle => {
        toggle.addEventListener('change', (e) => {
            const name = e.target.closest('.notification-item').querySelector('strong').innerText;
            console.log(`${name} is now ${e.target.checked ? 'ON' : 'OFF'}`);
        });
    });

    const sidebarToggle = document.getElementById('sidebarToggle');
    const appContainer = document.querySelector('.app-container');
    const icon = sidebarToggle ? sidebarToggle.querySelector('i') : null;

    function updateToggleIcon() {
        if (!icon) return;
        if (appContainer.classList.contains('sidebar-hidden')) {
            icon.classList.remove('fa-arrow-right');
            icon.classList.add('fa-bars');
        } else {
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