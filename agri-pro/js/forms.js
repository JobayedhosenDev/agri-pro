/**
 * AGRI-PRO EUROPEAN MACHINERY — FORM CONTROLLER & VALIDATION
 * Handles Contact Inquiries, Product Quotes, and Newsletter subscriptions
 */

document.addEventListener('DOMContentLoaded', () => {
  initInquiryForms();
  initNewsletterForms();
});

function initInquiryForms() {
  const inquiryForms = document.querySelectorAll('.js-inquiry-form');

  inquiryForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const feedbackBox = form.querySelector('.form-feedback');
      const originalBtnHtml = submitBtn.innerHTML;

      // Basic client-side validation
      const requiredInputs = form.querySelectorAll('[required]');
      let isValid = true;

      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = '#E02424';
        } else {
          input.style.borderColor = '';
        }
      });

      if (!isValid) return;

      // Loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 0.8s linear infinite;">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 2a10 10 0 0 1 10 10"></path>
        </svg>
        Sending Inquiry...
      `;

      // Simulate fast secure server processing (compatible with WordPress REST API / Contact Form 7 / WPForms)
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
        form.reset();

        if (feedbackBox) {
          feedbackBox.className = 'form-feedback success';
          feedbackBox.innerHTML = `
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <div>
              <strong>Thank you! Your inquiry has been sent successfully.</strong>
              <p style="margin:0; font-size: 0.85rem;">Our agricultural technical team will respond within 24 business hours.</p>
            </div>
          `;
          feedbackBox.style.display = 'flex';
          feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 900);
    });
  });
}

function initNewsletterForms() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      if (input && input.value.includes('@')) {
        const btn = form.querySelector('button');
        btn.textContent = 'Subscribed!';
        btn.style.backgroundColor = '#18582A';
        input.value = '';
        setTimeout(() => {
          btn.textContent = 'Subscribe';
          btn.style.backgroundColor = '';
        }, 3000);
      }
    });
  });
}

// Keyframe for spinner
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
