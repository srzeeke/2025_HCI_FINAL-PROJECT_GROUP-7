console.log('Push Notification Testing Interface - JavaScript loaded');

// Initialize page functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Push Notification Testing Interface initialized');
});

        // Form and modal elements
        const notificationForm = document.getElementById('notificationTestForm');
        const templateModal = document.getElementById('templateModal');
        const historyModal = document.getElementById('historyModal');
        const loadTemplateBtn = document.getElementById('loadTemplateBtn');
        const closeTemplateModal = document.getElementById('closeTemplateModal');
        const viewHistoryBtn = document.getElementById('viewHistoryBtn');
        const closeHistoryModal = document.getElementById('closeHistoryModal');
        const successToast = document.getElementById('successToast');
        const closeToast = document.getElementById('closeToast');
        const targetSelectionContainer = document.getElementById('targetSelectionContainer');
        const scheduledTimeContainer = document.getElementById('scheduledTimeContainer');

        // Target type radio buttons
        const targetTypeRadios = document.querySelectorAll('input[name="targetType"]');
        const targetSelection = document.getElementById('targetSelection');

        // Delivery timing radio buttons
        const deliveryTimingRadios = document.querySelectorAll('input[name="deliveryTiming"]');

        // Mock data for target selection
        const targetData = {
            individual: [
                { value: 'user1', label: 'Sarah Johnson - Manager' },
                { value: 'user2', label: 'Michael Chen - Pharmacist' },
                { value: 'user3', label: 'Emily Rodriguez - Technician' },
                { value: 'user4', label: 'David Kim - Pharmacist' }
            ],
            role: [
                { value: 'manager', label: 'Pharmacy Managers (12 users)' },
                { value: 'pharmacist', label: 'Staff Pharmacists (45 users)' },
                { value: 'technician', label: 'Pharmacy Technicians (78 users)' },
                { value: 'supervisor', label: 'District Supervisors (8 users)' }
            ],
            location: [
                { value: 'loc1', label: 'Downtown Pharmacy - 24 staff' },
                { value: 'loc2', label: 'Westside Pharmacy - 18 staff' },
                { value: 'loc3', label: 'Northgate Pharmacy - 31 staff' },
                { value: 'loc4', label: 'Southpoint Pharmacy - 22 staff' }
            ]
        };

        // Handle target type selection
        targetTypeRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                const selectedType = this.value;
                
                if (selectedType === 'all') {
                    targetSelectionContainer.classList.add('hidden');
                } else {
                    targetSelectionContainer.classList.remove('hidden');
                    updateTargetOptions(selectedType);
                }
            });
        });

        // Update target selection dropdown
        function updateTargetOptions(type) {
            targetSelection.innerHTML = '<option value="">Choose target...</option>';
            
            if (targetData[type]) {
                targetData[type].forEach(option => {
                    const opt = document.createElement('option');
                    opt.value = option.value;
                    opt.textContent = option.label;
                    targetSelection.appendChild(opt);
                });
            }
        }

        // Handle delivery timing selection
        deliveryTimingRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === 'scheduled') {
                    scheduledTimeContainer.classList.remove('hidden');
                } else {
                    scheduledTimeContainer.classList.add('hidden');
                }
            });
        });

        // Template modal
        loadTemplateBtn.addEventListener('click', () => {
            templateModal.classList.remove('hidden');
            templateModal.classList.add('flex');
        });

        closeTemplateModal.addEventListener('click', () => {
            templateModal.classList.add('hidden');
            templateModal.classList.remove('flex');
        });

        // Template selection
        document.querySelectorAll('.template-item').forEach(item => {
            item.addEventListener('click', function() {
                const title = this.getAttribute('data-title');
                const body = this.getAttribute('data-body');
                
                document.getElementById('messageTitle').value = title;
                document.getElementById('messageBody').value = body;
                
                templateModal.classList.add('hidden');
                templateModal.classList.remove('flex');
            });
        });

        // History modal
        viewHistoryBtn.addEventListener('click', () => {
            historyModal.classList.remove('hidden');
            historyModal.classList.add('flex');
        });

        closeHistoryModal.addEventListener('click', () => {
            historyModal.classList.add('hidden');
            historyModal.classList.remove('flex');
        });

        // Close modals on outside click
        [templateModal, historyModal].forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.add('hidden');
                    this.classList.remove('flex');
                }
            });
        });

        // Form submission
        notificationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success toast
            successToast.classList.remove('hidden');
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                successToast.classList.add('hidden');
            }, 5000);
            
            // Reset form
            this.reset();
            targetSelectionContainer.classList.add('hidden');
            scheduledTimeContainer.classList.add('hidden');
        });

        // Close toast
        closeToast.addEventListener('click', () => {
            successToast.classList.add('hidden');
        });

        // Refresh status button
        document.getElementById('refreshStatusBtn').addEventListener('click', function() {
            const icon = this.querySelector('img');
            icon.classList.add('animate-spin');
            
            setTimeout(() => {
                icon.classList.remove('animate-spin');
            }, 1000);
        });

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                if (!templateModal.classList.contains('hidden')) {
                    templateModal.classList.add('hidden');
                    templateModal.classList.remove('flex');
                }
                if (!historyModal.classList.contains('hidden')) {
                    historyModal.classList.add('hidden');
                    historyModal.classList.remove('flex');
                }
            }
        });

        // Initialize default target type
        const defaultTargetType = document.querySelector('input[name="targetType"]:checked');
        if (defaultTargetType && defaultTargetType.value !== 'all') {
            targetSelectionContainer.classList.remove('hidden');
            updateTargetOptions(defaultTargetType.value);
        }
