// Helpers
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const backBtn = $('.back');
const saveBtn = $('.btn.primary');
const cancelBtn = $('.btn.secondary');
const logoutBtn = $('.logout');
const changePhotoBtn = $('.change-photo');

const rightPanel = $('.right');
const inputs = $$('input', rightPanel);
const textarea = $('textarea', rightPanel);

// Map fields
const [
  fullNameInput,
  usernameInput,
  emailInput,
  phoneInput
] = inputs;

// Storage key
const STORAGE_KEY = 'profile_demo';

// Load profile on start
document.addEventListener('DOMContentLoaded', () => {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');

  if (!Object.keys(saved).length) return;

  fullNameInput.value = saved.fullName || fullNameInput.value;
  usernameInput.value = saved.username || usernameInput.value;
  emailInput.value = saved.email || emailInput.value;
  phoneInput.value = saved.phone || phoneInput.value;
  textarea.value = saved.bio || textarea.value;
});

// Save
saveBtn.addEventListener('click', () => {
  const data = {
    fullName: fullNameInput.value.trim(),
    username: usernameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
    bio: textarea.value.trim()
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

  // Visual feedback
  saveBtn.disabled = true;
  saveBtn.textContent = 'Saved';
  setTimeout(() => {
    saveBtn.disabled = false;
    saveBtn.textContent = 'Save';
  }, 900);
});

// Cancel → restore saved or defaults
cancelBtn.addEventListener('click', () => {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');

  if (!Object.keys(saved).length) {
    // Reset to original screenshot-like defaults
    fullNameInput.value = 'Rina Wilson';
    usernameInput.value = 'RinaW';
    emailInput.value = 'rinawilson@gmail.com';
    phoneInput.value = '+62 855-1234-5678';
    textarea.value = 'Tell us about yourself...';
    return;
  }

  fullNameInput.value = saved.fullName || '';
  usernameInput.value = saved.username || '';
  emailInput.value = saved.email || '';
  phoneInput.value = saved.phone || '';
  textarea.value = saved.bio || '';
});

// Logout (demo)
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem(STORAGE_KEY);
  alert('Logged out (demo)');
  
  // Optional redirect
  window.location.href = 'login.html';
});

// Back button behavior
backBtn.addEventListener('click', () => {
  window.history.back();
});

// Change photo (demo upload)
changePhotoBtn.addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';

  input.onchange = () => {
    const file = input.files && input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const avatar = $('.avatar');
      avatar.src = reader.result;
      alert('Photo updated (local preview only)');
    };
    reader.readAsDataURL(file);
  };

  input.click();
});
