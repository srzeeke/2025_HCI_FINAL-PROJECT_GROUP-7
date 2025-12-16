// script.js - Reusable sidebar component for ZFF pages

document.addEventListener('DOMContentLoaded', function() {
    // Inject CSS
    const css = `
:root {
    --sidebar-width: 200px;
    --sidebar-icon-width: 60px;
    --primary-color: #007bff;
    --primary-dark: #0f172a;
    --light-gray: #f4f6f8;
    --border-color: #e0e0e0;
    --bg-color: #ffffff;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background-color: var(--light-gray);
    color: #333;
    min-height: 100vh;
    overflow: auto;
}

.app-container {
    display: flex;
    min-height: 100vh;
}

.sidebar {
    width: var(--sidebar-width);
    background-color: var(--primary-dark);
    color: white;
    padding: 0;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100%;
    transition: width 0.3s ease;
    overflow-x: hidden;
    flex-shrink: 0;
}

.logo-and-toggle-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative; 
    padding: 20px 15px 30px 20px;
}

.logo {
    font-size: 24px;
    font-weight: bold;
    text-align: left;
    margin-bottom: 0;
    white-space: nowrap;
    opacity: 1;
    transition: opacity 0.1s ease, transform 0.3s ease;
}

.sidebar-toggle {
    width: 30px;
    height: 30px;
    background: transparent;
    color: rgba(255,255,255,0.7);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.3s ease, background 0.3s ease;
}

.sidebar-toggle:hover {
    color: white;
}

.sidebar-toggle i {
    display: block;
    line-height: 1;
    font-size: 16px;
}

.main-nav ul, 
.profile-nav ul {
    list-style: none;
}

.main-nav li a, 
.profile-nav li a {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 12px 20px;
    text-decoration: none;
    color: rgba(255,255,255,0.7);
    width: var(--sidebar-width);
    transition: 0.2s;
}

.main-nav li a span, 
.profile-nav li a span {
    opacity: 1;
    white-space: nowrap;
    transition: opacity 0.1s ease, transform 0.3s ease, visibility 0.3s ease;
}

.main-nav li.active, 
.profile-nav li.active {
    background-color: var(--primary-color);
}

.main-nav li.active a, 
.profile-nav li.active a {
    color: white;
}

.main-nav li:hover:not(.active) {
    background-color: rgba(255,255,255,0.1);
}

.main-nav i, 
.profile-nav i { 
    margin-right: 10px; 
    width: 20px; 
    text-align: center; 
    transition: margin 0.3s ease, transform 0.3s ease; 
}

.profile-nav {
    margin-top: auto;
    padding-top: 20px;
    border-top: 1px solid rgba(255,255,255,0.1);
}

.heart-icon {
    text-align: center;
    padding: 10px;
    color: #007bff;
}

.content-area {
    margin-left: var(--sidebar-width);
    flex-grow: 1;
    padding: 30px;
    transition: margin-left 0.3s ease;
}

/* ICON-ONLY COLLAPSE STYLES */
.app-container.sidebar-hidden .sidebar {
    width: var(--sidebar-icon-width);
    transform: none;
}

.app-container.sidebar-hidden .content-area {
    margin-left: var(--sidebar-icon-width);
}

.app-container.sidebar-hidden .logo {
    opacity: 0;
    transform: translateX(-150px);
}

.app-container.sidebar-hidden .main-nav li a span,
.app-container.sidebar-hidden .profile-nav li a span {
    opacity: 0;
    transform: translateX(-150px);
    width: 0;
    visibility: hidden;
}

.app-container.sidebar-hidden .main-nav li a,
.app-container.sidebar-hidden .profile-nav li a {
    padding: 12px 20px;
}

.app-container.sidebar-hidden .main-nav i,
.app-container.sidebar-hidden .profile-nav i {
    margin-right: 0;
    transform: none;
}

.app-container.sidebar-hidden .logo-and-toggle-wrapper {
    justify-content: flex-start; 
    padding: 20px 0 30px 0;
}

.app-container.sidebar-hidden .sidebar-toggle {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 20px;
    color: white;
    background: transparent;
    box-shadow: none;
    z-index: 100;
}

.app-container.sidebar-hidden .sidebar-toggle i {
    color: white;
    margin: 0;
}
    `;

    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    // Create sidebar HTML
    const sidebarHTML = `
        <aside class="sidebar">
            <div class="logo-and-toggle-wrapper">
                <div class="logo">ZFF</div>
                <button class="sidebar-toggle" id="sidebarToggle">
                    <i class="fas fa-bars"></i> 
                </button>
            </div>
            
            <nav class="main-nav">
                <ul>
                    <li><a href="#"><i class="fas fa-th-large"></i> <span>Dashboard</span></a></li>
                    <li><a href="#"><i class="fas fa-calendar-alt"></i> <span>Schedule</span></a></li>
                    <li><a href="#"><i class="fas fa-clock"></i> <span>Hours Tracking</span></a></li>
                    <li><a href="#"><i class="fas fa-exchange-alt"></i> <span>Shift Swaps</span></a></li>
                    <li><a href="#"><i class="fas fa-users"></i> <span>Team Directory</span></a></li>
                    <li><a href="../messages/messages.html"><i class="fas fa-comments"></i> <span>Messages</span></a></li>
                    <li class="active"><a href="../inventory/inventory.html"><i class="fas fa-boxes"></i> <span>Inventory</span></a></li>
                </ul>
            </nav>
            <div class="profile-nav">
                <ul>
                    <li><a href="../profile/profile.html"><i class="fas fa-user-circle"></i> <span>Profile</span></a></li>
                    <li><a href="../notifications/notifications.html"><i class="fas fa-bell"></i> <span>Notifications</span></a></li>
                </ul>
                <div class="heart-icon"><i class="fas fa-heart"></i></div>
            </div>
        </aside>
    `;

    // Insert sidebar before main
    const main = document.querySelector('main');
    if (main) {
        main.insertAdjacentHTML('beforebegin', sidebarHTML);
        main.classList.add('content-area');
    }

    // Wrap body content in app-container
    const body = document.body;
    const appContainer = document.createElement('div');
    appContainer.className = 'app-container';
    while (body.firstChild) {
        appContainer.appendChild(body.firstChild);
    }
    body.appendChild(appContainer);

    // Add toggle functionality
    const SIDEBAR_STATE_KEY = 'sidebarState'; 
    const sidebarToggle = document.getElementById('sidebarToggle');
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