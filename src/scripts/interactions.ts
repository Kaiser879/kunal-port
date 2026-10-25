document.documentElement.classList.add('has-interactions');

document.querySelectorAll<HTMLButtonElement>('[data-copy-email]').forEach((button) => {
  const label = button.querySelector<HTMLElement>('[data-copy-label]');
  const status = button.parentElement?.querySelector<HTMLElement>('[data-copy-status]');
  const email = button.dataset.copyEmail;
  if (!label || !status || !email) return;

  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(email);
      label.textContent = 'Copied';
      status.textContent = 'Email address copied to clipboard.';
      window.setTimeout(() => {
        label.textContent = 'Copy email';
        status.textContent = '';
      }, 1800);
    } catch {
      label.textContent = 'Copy email';
      status.textContent = 'Could not copy the address. Use the email link to contact Kunal.';
    }
  });
});
