/* ============================================================
   Clarix  — form.js
   Client-side contact form validation + loading spinner + toast.
   ============================================================ */
'use strict';

(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const submitBtn = document.getElementById('submitBtn');
  const spinner = submitBtn.querySelector('.spinner');
  const btnText = submitBtn.querySelector('.btn__text');
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const rules = {
    name:    v => v.trim().length >= 2   || 'Name must be at least 2 characters.',
    email:   v => emailRe.test(v.trim()) || 'Enter a valid email address.',
    subject: v => v !== ''               || 'Please choose a subject.',
    message: v => v.trim().length >= 10  || 'Message must be at least 10 characters.',
  };

  function validateField(field) {
    const group = field.closest('.form-group');
    const errorEl = group.querySelector('.error-msg');
    const result = rules[field.name](field.value);
    if (result === true) {
      group.classList.remove('invalid');
      errorEl.textContent = '';
      return true;
    }
    group.classList.add('invalid');
    errorEl.textContent = result;
    return false;
  }

  // Live validation on blur/input
  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.closest('.form-group').classList.contains('invalid')) validateField(field);
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('input, select, textarea').forEach(field => {
      if (!validateField(field)) valid = false;
    });

    if (!valid) {
      showToast('Please fix the errors and try again.', 'error');
      return;
    }

    // Simulate async submit with spinner
    submitBtn.disabled = true;
    spinner.hidden = false;
    btnText.textContent = 'Sending…';

    setTimeout(() => {
      submitBtn.disabled = false;
      spinner.hidden = true;
      btnText.textContent = 'Send message';
      form.reset();
      showToast('✅ Message sent! We’ll reply soon.', 'success');
    }, 1500);
  });
})();