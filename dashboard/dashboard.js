
// Element Selectors
const userMenuButton = document.getElementById('userMenuButton');
const userMenu = document.getElementById('userMenu');
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');
const dateRangeButton = document.getElementById('dateRangeButton');
const dateRangeMenu = document.getElementById('dateRangeMenu');
const selectedDateRange = document.getElementById('selectedDateRange');
const dateRangeOptions = document.querySelectorAll('.date-range-option');
const refreshButton = document.getElementById('refreshButton');
const exportButton = document.getElementById('exportButton');
const exportModal = document.getElementById('exportModal');
const closeExportModal = document.getElementById('closeExportModal');
const cancelExport = document.getElementById('cancelExport');
const exportForm = document.getElementById('exportForm');
const locationFilter = document.getElementById('locationFilter');


// Utility Functions
function toggleMenu(button, menu) {
    menu.classList.toggle('hidden');
    const isExpanded = menu.classList.contains('hidden') ? 'false' : 'true';
    button.setAttribute('aria-expanded', isExpanded);
}

function closeMenu(button, menu) {
    menu.classList.add('hidden');
    button.setAttribute('aria-expanded', 'false');
}

function closeModal() {
    exportModal.classList.add('hidden');
    exportModal.classList.remove('flex');
}


// Menu Toggles
userMenuButton.addEventListener('click', () => toggleMenu(userMenuButton, userMenu));
mobileMenuButton.addEventListener('click', () => toggleMenu(mobileMenuButton, mobileMenu));


// Date Range Selection
const dateRangeLabels = {
    today: 'Today',
    yesterday: 'Yesterday',
    '7days': 'Last 7 Days',
    '30days': 'Last 30 Days',
    '90days': 'Last 90 Days',
    custom: 'Custom Range'
};

dateRangeButton.addEventListener('click', () => {
    dateRangeMenu.classList.toggle('hidden');
});

dateRangeOptions.forEach(option => {
    option.addEventListener('click', () => {
        const range = option.getAttribute('data-range');
        selectedDateRange.textContent = dateRangeLabels[range];
        dateRangeMenu.classList.add('hidden');
        refreshDashboard();
    });
});


// Refresh Button
refreshButton.addEventListener('click', () => {
    refreshButton.classList.add('animate-spin');
    refreshDashboard();
    setTimeout(() => refreshButton.classList.remove('animate-spin'), 1000);
});


// Export Modal
exportButton.addEventListener('click', () => {
    exportModal.classList.remove('hidden');
    exportModal.classList.add('flex');
});

closeExportModal.addEventListener('click', closeModal);
cancelExport.addEventListener('click', closeModal);

exportModal.addEventListener('click', (e) => {
    if (e.target === exportModal) closeModal();
});

exportForm.addEventListener('submit', e => {
    e.preventDefault();
    const format = document.getElementById('exportFormat').value;
    alert(`Exporting dashboard data as ${format.toUpperCase()}...`);
    closeModal();
});


// Click Outside to Close
document.addEventListener('click', e => {
    if (!userMenu.contains(e.target) && !userMenuButton.contains(e.target)) {
        closeMenu(userMenuButton, userMenu);
    }
    if (!dateRangeMenu.contains(e.target) && !dateRangeButton.contains(e.target)) {
        dateRangeMenu.classList.add('hidden');
    }
});


// Escape Close
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeMenu(userMenuButton, userMenu);
        closeMenu(mobileMenuButton, mobileMenu);
        dateRangeMenu.classList.add('hidden');

        if (!exportModal.classList.contains('hidden')) closeModal();
    }
});

// Dashboard Refresh Logic
function refreshDashboard() {
    const lastUpdateTime = document.getElementById('lastUpdateTime');
    lastUpdateTime.textContent = 'Just now';

    setTimeout(() => {
        lastUpdateTime.textContent = '1 minute ago';
    }, 60000);
}

setInterval(() => {
    const lastUpdateTime = document.getElementById('lastUpdateTime');
    const text = lastUpdateTime.textContent;

    if (text === 'Just now') lastUpdateTime.textContent = '1 minute ago';
    else if (text === '1 minute ago') lastUpdateTime.textContent = '2 minutes ago';
    else if (text === '2 minutes ago') lastUpdateTime.textContent = '3 minutes ago';
}, 60000);


// Filters
locationFilter.addEventListener('change', refreshDashboard);



document.addEventListener('DOMContentLoaded', () => {
    userMenuButton.setAttribute('aria-expanded', 'false');
    mobileMenuButton.setAttribute('aria-expanded', 'false');

    // Auto refresh every 5 minutes
    setInterval(refreshDashboard, 300000);
});
