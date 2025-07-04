document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('pre code').forEach(block => {
    const button = document.createElement('button');
    button.innerHTML = '📋 Copy';
    button.className = 'copy-btn px-3 py-1 rounded text-sm transition-colors';
    button.style.cssText = `
      background-color: var(--bg-tertiary);
      color: var(--text-primary);
      border: 1px solid var(--border-primary);
      display: block;
      margin-left: auto;
      margin-bottom: 0.5rem;
      width: fit-content;
    `;
    
    button.addEventListener('mouseenter', function() {
      this.style.backgroundColor = 'var(--asee-primary)';
      this.style.color = 'white';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.backgroundColor = 'var(--bg-tertiary)';
      this.style.color = 'var(--text-primary)';
    });

    const pre = block.parentElement;
    const codeBlock = pre.parentElement;
    
    if (codeBlock && codeBlock.classList.contains('code-block')) {
      codeBlock.insertBefore(button, pre);
      codeBlock.style.paddingTop = '0.5rem';
      codeBlock.style.paddingLeft = '0.5rem';
      codeBlock.style.paddingRight = '0.5rem';
    } else {
      pre.parentElement.insertBefore(button, pre);
    }

    block.style.display = 'block';
    block.style.overflowX = 'auto';
    block.style.paddingBottom = '1rem';
    pre.style.margin = '0';

    button.addEventListener('click', () => {
      navigator.clipboard.writeText(block.textContent).then(() => {
        button.innerHTML = '✅ Copied!';
        setTimeout(() => button.innerHTML = '📋 Copy', 2000);
      });
    });
  });
});