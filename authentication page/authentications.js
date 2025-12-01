        // Form validation and interaction logic
        const loginForm = document.getElementById('loginForm');
        const loginButton = document.getElementById('loginButton');
        const buttonText = document.getElementById('buttonText');
        const loadingSpinner = document.getElementById('loadingSpinner');
        const togglePassword = document.getElementById('togglePassword');
        const passwordInput = document.getElementById('password');
        const eyeIcon = document.getElementById('eyeIcon');
        const enableMfaButton = document.getElementById('enableMfaButton');
        const mfaSection = document.getElementById('mfaSection');
        const registerLink = document.getElementById('registerLink');
        const registrationModal = document.getElementById('registrationModal');
        const closeModalButton = document.getElementById('closeModalButton');
        const registrationForm = document.getElementById('registrationForm');
        const forgotPasswordLink = document.getElementById('forgotPasswordLink');

        // Toggle password visibility
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            eyeIcon.src = type === 'password' 
                ? 'https://api.iconify.design/mdi:eye-outline.svg?color=%236B7280'
                : 'https://api.iconify.design/mdi:eye-off-outline.svg?color=%236B7280';
        });

        // Password strength indicator
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strengthBar = document.getElementById('strength-bar');
            const strengthText = document.getElementById('strength-text');
            const strengthSection = document.getElementById('password-strength');

            if (password.length > 0) {
                strengthSection.classList.remove('hidden');
                let strength = 0;
                let color = '';
                let text = '';

                if (password.length >= 8) strength++;
                if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
                if (/\d/.test(password)) strength++;
                if (/[^a-zA-Z\d]/.test(password)) strength++;

                switch(strength) {
                    case 1:
                        color = '#DC2626';
                        text = 'Weak';
                        break;
                    case 2:
                        color = '#F59E0B';
                        text = 'Fair';
                        break;
                    case 3:
                        color = '#3B82F6';
                        text = 'Good';
                        break;
                    case 4:
                        color = '#10B981';
                        text = 'Strong';
                        break;
                    default:
                        color = '#DC2626';
                        text = 'Weak';
                }

                strengthBar.style.width = (strength * 25) + '%';
                strengthBar.style.backgroundColor = color;
                strengthText.textContent = text;
                strengthText.style.color = color;
            } else {
                strengthSection.classList.add('hidden');
            }
        });

        // Enable MFA section
        enableMfaButton.addEventListener('click', function() {
            mfaSection.classList.toggle('hidden');
            this.textContent = mfaSection.classList.contains('hidden') 
                ? 'Enable Multi-Factor Authentication' 
                : 'Disable Multi-Factor Authentication';
        });

        // Form submission
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            document.querySelectorAll('.text-error').forEach(el => el.classList.add('hidden'));
            document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));

            // Validate fields
            let isValid = true;
            const username = document.getElementById('username');
            const password = document.getElementById('password');
            const role = document.getElementById('role');

            if (!username.value.trim()) {
                document.getElementById('username-error').classList.remove('hidden');
                username.classList.add('input-error');
                isValid = false;
            }

            if (!password.value) {
                document.getElementById('password-error').classList.remove('hidden');
                password.classList.add('input-error');
                isValid = false;
            }

            if (!role.value) {
                document.getElementById('role-error').classList.remove('hidden');
                role.classList.add('input-error');
                isValid = false;
            }

            if (isValid) {
                // Show loading state
                buttonText.textContent = 'Signing In...';
                loadingSpinner.classList.remove('hidden');
                loginButton.disabled = true;

                // Simulate authentication
                setTimeout(() => {
                    // Navigate to dashboard based on role
                    const roleValue = role.value;
                    window.location.href = 'business_overview_dashboard.html';
                }, 1500);
            }
        });

        // Registration modal
        registerLink.addEventListener('click', function() {
            registrationModal.classList.remove('hidden');
            registrationModal.classList.add('flex');
        });

        closeModalButton.addEventListener('click', function() {
            registrationModal.classList.add('hidden');
            registrationModal.classList.remove('flex');
        });

        registrationModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.add('hidden');
                this.classList.remove('flex');
            }
        });

        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Registration request submitted! You will receive an email once your manager approves your access.');
            registrationModal.classList.add('hidden');
            registrationModal.classList.remove('flex');
            this.reset();
        });

        // Forgot password
        forgotPasswordLink.addEventListener('click', function() {
            const email = prompt('Enter your email address to reset your password:');
            if (email) {
                alert('Password reset instructions have been sent to ' + email);
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !registrationModal.classList.contains('hidden')) {
                registrationModal.classList.add('hidden');
                registrationModal.classList.remove('flex');
            }
        });

        // Auto-focus username field
        document.getElementById('username').focus();
