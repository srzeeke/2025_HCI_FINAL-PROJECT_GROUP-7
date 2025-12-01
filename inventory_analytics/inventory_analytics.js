console.log('Inventory Analytics Center - JavaScript loaded');

// Initialize page functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inventory Analytics Center initialized');
});

        // Modal Management
        const bulkActionsModal = document.getElementById('bulkActionsModal');
        const exportModal = document.getElementById('exportModal');
        const bulkActionsBtn = document.getElementById('bulkActionsBtn');
        const exportReportBtn = document.getElementById('exportReportBtn');
        const closeBulkModalBtn = document.getElementById('closeBulkModalBtn');
        const closeExportModalBtn = document.getElementById('closeExportModalBtn');

        // Open Bulk Actions Modal
        bulkActionsBtn.addEventListener('click', () => {
            bulkActionsModal.classList.remove('hidden');
            bulkActionsModal.classList.add('flex');
        });

        // Close Bulk Actions Modal
        closeBulkModalBtn.addEventListener('click', () => {
            bulkActionsModal.classList.add('hidden');
            bulkActionsModal.classList.remove('flex');
        });

        // Open Export Modal
        exportReportBtn.addEventListener('click', () => {
            exportModal.classList.remove('hidden');
            exportModal.classList.add('flex');
        });

        // Close Export Modal
        closeExportModalBtn.addEventListener('click', () => {
            exportModal.classList.add('hidden');
            exportModal.classList.remove('flex');
        });

        // Close modals on backdrop click
        [bulkActionsModal, exportModal].forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.add('hidden');
                    modal.classList.remove('flex');
                }
            });
        });

        // Close modals on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                bulkActionsModal.classList.add('hidden');
                bulkActionsModal.classList.remove('flex');
                exportModal.classList.add('hidden');
                exportModal.classList.remove('flex');
            }
        });

        // Filter Management
        const applyFiltersBtn = document.getElementById('applyFiltersBtn');
        const resetFiltersBtn = document.getElementById('resetFiltersBtn');
        const saveFilterBtn = document.getElementById('saveFilterBtn');

        applyFiltersBtn.addEventListener('click', () => {
            // Simulate filter application
            alert('Filters applied successfully! Inventory grid will update with filtered results.');
        });

        resetFiltersBtn.addEventListener('click', () => {
            // Reset all filter inputs
            document.getElementById('searchInventory').value = '';
            document.getElementById('categoryFilter').value = '';
            document.getElementById('abcFilter').value = '';
            document.getElementById('supplierFilter').value = '';
            document.getElementById('velocityFilter').value = '';
            document.getElementById('stockFilter').value = '';
            document.getElementById('savedFilters').value = '';
        });

        saveFilterBtn.addEventListener('click', () => {
            const filterName = prompt('Enter a name for this filter combination:');
            if (filterName) {
                alert(`Filter "${filterName}" saved successfully!`);
            }
        });

        // Select All Checkbox
        const selectAllCheckbox = document.getElementById('selectAll');
        const itemCheckboxes = document.querySelectorAll('tbody input[type="checkbox"]');

        selectAllCheckbox.addEventListener('change', () => {
            itemCheckboxes.forEach(checkbox => {
                checkbox.checked = selectAllCheckbox.checked;
            });
        });

        // Export Form Submission
        const exportForm = document.getElementById('exportForm');
        exportForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const format = document.getElementById('exportFormat').value;
            const scope = document.getElementById('exportScope').value;
            
            // Simulate export
            alert(`Generating ${format.toUpperCase()} report for ${scope}...`);
            exportModal.classList.add('hidden');
            exportModal.classList.remove('flex');
            exportForm.reset();
        });

        // Search functionality
        const searchInput = document.getElementById('searchInventory');
        let searchTimeout;

        searchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const searchTerm = searchInput.value.toLowerCase();
                if (searchTerm.length > 2) {
                    console.log('Searching for:', searchTerm);
                    // Implement search logic here
                }
            }, 300);
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K for search focus
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                searchInput.focus();
            }
            
            // Ctrl/Cmd + E for export
            if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
                e.preventDefault();
                exportReportBtn.click();
            }
        });

        // Auto-refresh data every 5 minutes
        setInterval(() => {
            console.log('Refreshing inventory data...');
            // Implement data refresh logic here
        }, 300000);

        // Initialize tooltips and accessibility
        document.querySelectorAll('[aria-label]').forEach(element => {
            element.setAttribute('title', element.getAttribute('aria-label'));
        });