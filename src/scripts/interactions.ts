document.documentElement.classList.add('has-interactions');

const previewDialog = document.querySelector<HTMLDialogElement>('.preview-dialog');
const previewTitle = document.querySelector<HTMLElement>('#preview-dialog-title');
const previewContent = document.querySelector<HTMLElement>('[data-preview-content]');

if (previewDialog && previewTitle && previewContent) {
  document.querySelectorAll<HTMLButtonElement>('[data-preview-open]').forEach((button) => {
    button.addEventListener('click', () => {
      const project = button.closest<HTMLElement>('.project');
      const visual = project?.querySelector<HTMLElement>('.project-visual');
      const title = project?.querySelector('h3')?.textContent?.trim();
      if (!visual || !title) return;

      previewTitle.textContent = title;
      previewContent.replaceChildren(visual.cloneNode(true));
      previewDialog.showModal();
    });
  });

  previewDialog.addEventListener('click', (event) => {
    if (event.target === previewDialog) previewDialog.close();
  });

  previewDialog.addEventListener('close', () => previewContent.replaceChildren());
}

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
