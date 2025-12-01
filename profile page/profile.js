// Utility: simple escape for safe text insertion
function q(id){ return document.getElementById(id) }

// Load saved profile from localStorage (if present)
document.addEventListener('DOMContentLoaded', () => {
  const saved = JSON.parse(localStorage.getItem('profile_demo') || '{}');

  if (saved.fullName) q('fullName').value = saved.fullName;
  if (saved.username) q('username').value = saved.username;
  if (saved.email) q('email').value = saved.email;
  if (saved.phone) q('phone').value = saved.phone;
  if (saved.bio) q('bio').value = saved.bio;

  // toggles
  if (typeof saved.publicProfile === 'boolean') q('publicProfile').checked = saved.publicProfile;
  if (typeof saved.showPhone === 'boolean') q('showPhone').checked = saved.showPhone;
  if (typeof saved.prefPush === 'boolean') q('prefPush').checked = saved.prefPush;
  if (typeof saved.prefEmail === 'boolean') q('prefEmail').checked = saved.prefEmail;
  if (typeof saved.prefMessages === 'boolean') q('prefMessages').checked = saved.prefMessages;
  if (typeof saved.prefStock === 'boolean') q('prefStock').checked = saved.prefStock;
  if (typeof saved.prefReminders === 'boolean') q('prefReminders').checked = saved.prefReminders;
});

// Save profile button
q('saveBtn').addEventListener('click', () => {
  const data = {
    fullName: q('fullName').value.trim(),
    username: q('username').value.trim(),
    email: q('email').value.trim(),
    phone: q('phone').value.trim(),
    bio: q('bio').value.trim(),
    publicProfile: q('publicProfile').checked,
    showPhone: q('showPhone').checked,
    prefPush: q('prefPush').checked,
    prefEmail: q('prefEmail').checked,
    prefMessages: q('prefMessages').checked,
    prefStock: q('prefStock').checked,
    prefReminders: q('prefReminders').checked
  };

  localStorage.setItem('profile_demo', JSON.stringify(data));

  // brief visual confirmation aligned with screenshot feel
  const saveBtn = q('saveBtn');
  saveBtn.disabled = true;
  saveBtn.textContent = 'Saved';
  setTimeout(() => { saveBtn.disabled = false; saveBtn.textContent = 'Save'; }, 900);
});

// Cancel button: restore last saved
q('cancelBtn').addEventListener('click', () => {
  const saved = JSON.parse(localStorage.getItem('profile_demo') || '{}');
  if (!saved.fullName) {
    // if nothing saved, reset to defaults seen in screenshot
    q('fullName').value = 'John Doe';
    q('username').value = 'johndoe';
    q('email').value = 'john@example.com';
    q('phone').value = '+1 (555) 123-4567';
    q('bio').value = 'Tell us about yourself...';
    q('publicProfile').checked = true;
    q('prefPush').checked = true;
    q('prefEmail').checked = true;
    q('showPhone').checked = false;
    q('prefMessages').checked = false;
    q('prefStock').checked = false;
    q('prefReminders').checked = false;
    return;
  }

  // restore saved
  q('fullName').value = saved.fullName || '';
  q('username').value = saved.username || '';
  q('email').value = saved.email || '';
  q('phone').value = saved.phone || '';
  q('bio').value = saved.bio || '';
  q('publicProfile').checked = !!saved.publicProfile;
  q('showPhone').checked = !!saved.showPhone;
  q('prefPush').checked = !!saved.prefPush;
  q('prefEmail').checked = !!saved.prefEmail;
  q('prefMessages').checked = !!saved.prefMessages;
  q('prefStock').checked = !!saved.prefStock;
  q('prefReminders').checked = !!saved.prefReminders;
});

// Logout (demo)
q('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('profile_demo');
  // simulate redirect to login page as in the screenshot
  alert('Logged out (demo). Redirecting to login.');
  window.location.href = 'login.html';
});

// Sidebar logout (top-left)
q('sidebarLogout').addEventListener('click', (e) => {
  e.preventDefault();
  q('logoutBtn').click();
});

// Change photo (demo)
q('changePhoto').addEventListener('click', () => {
  // create a file input on the fly for demo upload
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = () => {
    const file = input.files && input.files[0];
    if (!file) return;
    // Show a small confirmation to emulate change
    const reader = new FileReader();
    reader.onload = () => {
      // Show temporary avatar initials replaced by "OK" briefly
      const a = document.querySelector('.avatar');
      const previous = a.textContent;
      a.textContent = 'OK';
      setTimeout(()=> a.textContent = previous, 1200);
      alert('Photo uploaded (demo). Image not persisted in this demo.');
    };
    reader.readAsDataURL(file);
  };
  input.click();
});

// Back behavior (demo)
q('backBtn').addEventListener('click', () => {
  // In the screenshot it shows a back link — simulate navigation
  window.history.back();
});
