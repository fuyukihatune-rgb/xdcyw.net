document.addEventListener('DOMContentLoaded', () => {
  const terminalContainer = document.getElementById('terminal-container');
  const closeBtn = document.getElementById('terminal-close-btn');
  const secretTrigger = document.getElementById('secret-terminal-trigger');

  if (!terminalContainer || !closeBtn) {
    return;
  }

  const openTerminal = event => {
    event?.preventDefault();
    terminalContainer.classList.remove('is-hidden');

    const terminalWindow = terminalContainer.querySelector('.terminal');
    if (terminalWindow) {
      const top = (window.innerHeight - terminalWindow.offsetHeight) / 2;
      const left = (window.innerWidth - terminalWindow.offsetWidth) / 2;
      terminalWindow.style.top = `${Math.max(16, top)}px`;
      terminalWindow.style.left = `${Math.max(16, left)}px`;
    }

    document.getElementById('commandInput')?.focus();
  };

  secretTrigger?.addEventListener('click', openTerminal);
  closeBtn.addEventListener('click', () => {
    terminalContainer.classList.add('is-hidden');
  });
});
