        // Search and Filter Functionality
        const searchInput = document.getElementById('searchInput');
        const clearSearch = document.getElementById('clearSearch');
        const departmentFilter = document.getElementById('departmentFilter');
        const roleFilter = document.getElementById('roleFilter');
        const certificationFilter = document.getElementById('certificationFilter');
        const availabilityFilter = document.getElementById('availabilityFilter');
        const resetFilters = document.getElementById('resetFilters');
        const staffRows = document.querySelectorAll('.staff-row');
        const presetFilters = document.querySelectorAll('.preset-filter');

        // Search functionality
        searchInput.addEventListener('input', filterStaff);
        clearSearch.addEventListener('click', () => {
            searchInput.value = '';
            filterStaff();
        });

        // Filter change listeners
        departmentFilter.addEventListener('change', filterStaff);
        roleFilter.addEventListener('change', filterStaff);
        certificationFilter.addEventListener('change', filterStaff);
        availabilityFilter.addEventListener('change', filterStaff);

        // Reset filters
        resetFilters.addEventListener('click', () => {
            searchInput.value = '';
            departmentFilter.value = '';
            roleFilter.value = '';
            certificationFilter.value = '';
            availabilityFilter.value = '';
            filterStaff();
        });

        // Preset filter buttons
        presetFilters.forEach(button => {
            button.addEventListener('click', () => {
                const preset = button.dataset.preset;
                resetFilters.click();
                
                switch(preset) {
                    case 'available-pharmacists':
                        roleFilter.value = 'pharmacist';
                        availabilityFilter.value = 'available';
                        break;
                    case 'expiring-certs':
                        // Would filter by certification expiration
                        break;
                    case 'on-shift':
                        availabilityFilter.value = 'on-shift';
                        break;
                    case 'immunization-certified':
                        certificationFilter.value = 'immunization';
                        break;
                    case 'management':
                        departmentFilter.value = 'management';
                        break;
                }
                filterStaff();
            });
        });

        function filterStaff() {
            const searchTerm = searchInput.value.toLowerCase();
            const department = departmentFilter.value;
            const role = roleFilter.value;
            const status = availabilityFilter.value;

            staffRows.forEach(row => {
                const name = row.dataset.name.toLowerCase();
                const rowRole = row.dataset.role;
                const rowDepartment = row.dataset.department;
                const rowStatus = row.dataset.status;

                const matchesSearch = name.includes(searchTerm);
                const matchesDepartment = !department || rowDepartment === department;
                const matchesRole = !role || rowRole === role;
                const matchesStatus = !status || rowStatus === status;

                if (matchesSearch && matchesDepartment && matchesRole && matchesStatus) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        }

        // Sort functionality
        const sortHeaders = document.querySelectorAll('.sort-header');
        let currentSort = { column: null, direction: 'asc' };

        sortHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const sortBy = header.dataset.sort;
                const tbody = document.getElementById('staffTableBody');
                const rows = Array.from(staffRows);

                if (currentSort.column === sortBy) {
                    currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
                } else {
                    currentSort.column = sortBy;
                    currentSort.direction = 'asc';
                }

                rows.sort((a, b) => {
                    let aVal = a.dataset[sortBy];
                    let bVal = b.dataset[sortBy];

                    if (currentSort.direction === 'asc') {
                        return aVal > bVal ? 1 : -1;
                    } else {
                        return aVal < bVal ? 1 : -1;
                    }
                });

                rows.forEach(row => tbody.appendChild(row));
            });
        });

        // Staff Detail Modal
        const staffDetailModal = document.getElementById('staffDetailModal');
        const closeModalButton = document.getElementById('closeModalButton');
        const viewDetailsButtons = document.querySelectorAll('.view-details-btn');

        viewDetailsButtons.forEach(button => {
            button.addEventListener('click', () => {
                staffDetailModal.classList.remove('hidden');
                staffDetailModal.classList.add('flex');
                document.body.style.overflow = 'hidden';
            });
        });

        closeModalButton.addEventListener('click', () => {
            staffDetailModal.classList.add('hidden');
            staffDetailModal.classList.remove('flex');
            document.body.style.overflow = '';
        });

        staffDetailModal.addEventListener('click', (e) => {
            if (e.target === staffDetailModal) {
                closeModalButton.click();
            }
        });

        // Add Staff Modal
        const addStaffModal = document.getElementById('addStaffModal');
        const addStaffButton = document.getElementById('addStaffButton');
        const closeAddModalButton = document.getElementById('closeAddModalButton');
        const cancelAddStaff = document.getElementById('cancelAddStaff');
        const addStaffForm = document.getElementById('addStaffForm');

        addStaffButton.addEventListener('click', () => {
            addStaffModal.classList.remove('hidden');
            addStaffModal.classList.add('flex');
            document.body.style.overflow = 'hidden';
        });

        closeAddModalButton.addEventListener('click', () => {
            addStaffModal.classList.add('hidden');
            addStaffModal.classList.remove('flex');
            document.body.style.overflow = '';
        });

        cancelAddStaff.addEventListener('click', () => {
            closeAddModalButton.click();
        });

        addStaffModal.addEventListener('click', (e) => {
            if (e.target === addStaffModal) {
                closeAddModalButton.click();
            }
        });

        addStaffForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Staff member added successfully! An invitation email has been sent.');
            addStaffForm.reset();
            closeAddModalButton.click();
        });

        // Export functionality
        const exportButton = document.getElementById('exportButton');
        exportButton.addEventListener('click', () => {
            alert('Directory export initiated. You will receive a download link via email shortly.');
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (!staffDetailModal.classList.contains('hidden')) {
                    closeModalButton.click();
                }
                if (!addStaffModal.classList.contains('hidden')) {
                    closeAddModalButton.click();
                }
            }
        });

        // Auto-focus search on page load
        searchInput.focus();