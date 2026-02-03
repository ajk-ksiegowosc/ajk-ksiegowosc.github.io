// AJK Księgowość - script.js

(function () {
  // Mobile menu toggle
  const burger = document.querySelector('[data-burger]');
  const panel = document.querySelector('[data-mobile-panel]');

  if (burger && panel) {
    burger.addEventListener('click', () => {
      const isOpen = panel.getAttribute('data-open') === 'true';
      panel.setAttribute('data-open', String(!isOpen));
      panel.style.display = isOpen ? 'none' : 'block';
      burger.setAttribute('aria-expanded', String(!isOpen));
    });

    // start closed on mobile
    panel.style.display = 'none';
    panel.setAttribute('data-open', 'false');
    burger.setAttribute('aria-expanded', 'false');
  }

  // Year in footer
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Contact form: mailto fallback (works without backend)
  const form = document.querySelector('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.querySelector('[name="name"]')?.value?.trim() || '';
      const email = form.querySelector('[name="email"]')?.value?.trim() || '';
      const phone = form.querySelector('[name="phone"]')?.value?.trim() || '';
      const topic = form.querySelector('[name="topic"]')?.value?.trim() || 'Zapytanie';
      const msg = form.querySelector('[name="message"]')?.value?.trim() || '';

      if (!name || !email || !msg) {
        alert('Uzupełnij proszę: imię, e-mail i wiadomość.');
        return;
      }

      // TODO: wpisz swój docelowy e-mail poniżej
      const to = "twojemail@domena.pl";

      const subject = `AJK Księgowość – ${topic}`;
      const body = [
        `Imię i nazwisko: ${name}`,
        `E-mail: ${email}`,
        phone ? `Telefon: ${phone}` : null,
        ``,
        `Wiadomość:`,
        msg,
      ].filter(Boolean).join('\n');

      const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
    });
  }
})();
// Animacja pojawiania się elementów przy scrollowaniu
(() => {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || els.length === 0) {
    els.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  els.forEach(el => io.observe(el));
})();
