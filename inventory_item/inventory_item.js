        // Tab Navigation
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                
                // Remove active class from all tabs
                tabButtons.forEach(btn => {
                    btn.classList.remove('active', 'text-primary', 'border-primary');
                    btn.classList.add('text-text-secondary');
                    const icon = btn.querySelector('img');
                    if (icon) {
                        icon.src = icon.src.replace('color=%232563EB', 'color=%236B7280');
                    }
                });
                
                tabContents.forEach(content => {
                    content.classList.add('hidden');
                    content.classList.remove('active');
                });

                // Add active class to clicked tab
                button.classList.add('active', 'text-primary', 'border-primary');
                button.classList.remove('text-text-secondary');
                const activeIcon = button.querySelector('img');
                if (activeIcon) {
                    activeIcon.src = activeIcon.src.replace('color=%236B7280', 'color=%232563EB');
                }
                
                document.getElementById(targetTab + 'Tab').classList.remove('hidden');
                document.getElementById(targetTab + 'Tab').classList.add('active');
            });
        });

        // Profit Margin Calculation
        const costPriceInput = document.getElementById('costPrice');
        const retailPriceInput = document.getElementById('retailPrice');
        const marginPercentage = document.getElementById('marginPercentage');
        const marginAmount = document.getElementById('marginAmount');

        function calculateMargin() {
            const cost = parseFloat(costPriceInput.value) || 0;
            const retail = parseFloat(retailPriceInput.value) || 0;
            
            if (cost > 0 && retail > 0) {
                const margin = retail - cost;
                const percentage = ((margin / retail) * 100).toFixed(2);
                
                marginPercentage.textContent = percentage + '%';
                marginAmount.textContent = '$' + margin.toFixed(2);
            } else {
                marginPercentage.textContent = '0%';
                marginAmount.textContent = '$0.00';
            }
        }

        costPriceInput.addEventListener('input', calculateMargin);
        retailPriceInput.addEventListener('input', calculateMargin);

        // NDC Validation
        const ndcInput = document.getElementById('ndcNumber');
        const ndcValidIcon = document.getElementById('ndcValidIcon');

        ndcInput.addEventListener('input', function() {
            const ndcPattern = /^\d{5}-\d{4}-\d{2}$/;
            if (ndcPattern.test(this.value)) {
                ndcValidIcon.classList.remove('hidden');
                this.classList.remove('input-error');
                document.getElementById('ndcNumber-error').classList.add('hidden');
            } else {
                ndcValidIcon.classList.add('hidden');
            }
        });

        // Form Submission
        const inventoryForm = document.getElementById('inventoryItemForm');
        
        inventoryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            document.querySelectorAll('.text-error').forEach(el => el.classList.add('hidden'));
            document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));

            // Validate required fields
            let isValid = true;
            const requiredFields = [
                'itemName', 'ndcNumber', 'manufacturer', 'category', 
                'dosageForm', 'strength', 'packageSize', 'costPrice', 
                'retailPrice', 'primarySupplier', 'reorderPoint', 
                'reorderQuantity', 'storageLocation'
            ];

            requiredFields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (!field.value.trim()) {
                    const errorMsg = document.getElementById(fieldId + '-error');
                    if (errorMsg) {
                        errorMsg.classList.remove('hidden');
                    }
                    field.classList.add('input-error');
                    isValid = false;
                }
            });

            if (isValid) {
                // Show success message
                alert('Inventory item added successfully! The item has been synchronized across all connected systems.');
                
                // Reset form
                inventoryForm.reset();
                
                // Navigate to inventory analytics
                setTimeout(() => {
                    window.location.href = 'inventory_analytics_center.html';
                }, 1000);
            } else {
                alert('Please fill in all required fields marked with *');
            }
        });

        // Cancel Button
        document.getElementById('cancelBtn').addEventListener('click', function() {
            if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
                window.location.href = 'inventory_analytics_center.html';
            }
        });

        // Save Draft
        document.getElementById('saveDraftBtn').addEventListener('click', function() {
            alert('Draft saved successfully! You can continue editing later.');
        });

        // Preview Button
        document.getElementById('previewBtn').addEventListener('click', function() {
            alert('Preview functionality will display a formatted view of the item details.');
        });

        // Bulk Import Modal
        const bulkImportBtn = document.getElementById('bulkImportBtn');
        const bulkImportModal = document.getElementById('bulkImportModal');
        const closeBulkImportBtn = document.getElementById('closeBulkImportBtn');

        bulkImportBtn.addEventListener('click', function() {
            bulkImportModal.classList.remove('hidden');
            bulkImportModal.classList.add('flex');
        });

        closeBulkImportBtn.addEventListener('click', function() {
            bulkImportModal.classList.add('hidden');
            bulkImportModal.classList.remove('flex');
        });

        bulkImportModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.add('hidden');
                this.classList.remove('flex');
            }
        });

        // Export Catalog
        document.getElementById('exportCatalogBtn').addEventListener('click', function() {
            alert('Catalog export initiated. Your file will be downloaded shortly.');
        });

        // Quick Search
        document.getElementById('quickSearch').addEventListener('input', function() {
            // Implement search functionality
            console.log('Searching for:', this.value);
        });

        // Reset Filters
        document.getElementById('resetFilters').addEventListener('click', function() {
            document.getElementById('quickSearch').value = '';
            document.getElementById('categoryFilter').value = '';
        });

        // Keyboard Shortcuts
        document.addEventListener('keydown', function(e) {
            // Ctrl+S - Save Draft
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                document.getElementById('saveDraftBtn').click();
            }
            
            // Ctrl+Enter - Submit Form
            if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                inventoryForm.dispatchEvent(new Event('submit'));
            }
            
            // Escape - Cancel
            if (e.key === 'Escape') {
                if (!bulkImportModal.classList.contains('hidden')) {
                    closeBulkImportBtn.click();
                } else {
                    document.getElementById('cancelBtn').click();
                }
            }
        });

        // Auto-focus first input
        document.getElementById('itemName').focus();

        // Tab styling
        const style = document.createElement('style');
        style.textContent = `
            .tab-btn {
                display: inline-flex;
                align-items: center;
                padding: 0.75rem 1rem;
                font-size: 0.875rem;
                font-weight: 500;
                color: var(--color-text-secondary);
                border-bottom: 2px solid transparent;
                transition: all 150ms ease-in-out;
                cursor: pointer;
                background: none;
                border-top: none;
                border-left: none;
                border-right: none;
            }
            
            .tab-btn:hover {
                color: var(--color-primary);
                background-color: var(--color-primary-50);
            }
            
            .tab-btn.active {
                color: var(--color-primary);
                border-bottom-color: var(--color-primary);
            }
        `;
        document.head.appendChild(style);