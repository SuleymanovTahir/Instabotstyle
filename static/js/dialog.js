// static/js/dialog.js - НОВЫЙ ФАЙЛ
class CustomDialog extends HTMLElement {
  connectedCallback() {
    this.style.display = 'none';
    this.isOpen = false;
  }
  
  open() {
    this.style.display = 'block';
    this.isOpen = true;
    document.body.style.overflow = 'hidden';
    this.dispatchEvent(new CustomEvent('dialogOpen'));
  }
  
  close() {
    this.style.display = 'none';
    this.isOpen = false;
    document.body.style.overflow = '';
    this.dispatchEvent(new CustomEvent('dialogClose'));
  }
}

class DialogTrigger extends HTMLElement {
  connectedCallback() {
    this.style.cursor = 'pointer';
    this.addEventListener('click', () => {
      const dialogId = this.getAttribute('dialog');
      const dialog = dialogId ? document.getElementById(dialogId) : this.nextElementSibling;
      if (dialog && dialog.tagName.toLowerCase() === 'custom-dialog') {
        dialog.open();
      }
    });
  }
}

class DialogContent extends HTMLElement {
  connectedCallback() {
    const content = this.innerHTML;
    
    this.innerHTML = `
      <div class="fixed inset-0 z-50 bg-black/50" data-overlay></div>
      <div class="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div class="bg-white rounded-lg shadow-lg">
          <button class="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity" data-close>
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            <span class="sr-only">Close</span>
          </button>
          ${content}
        </div>
      </div>
    `;
    
    // Закрытие по клику на overlay
    this.querySelector('[data-overlay]').addEventListener('click', () => {
      const dialog = this.closest('custom-dialog');
      if (dialog) dialog.close();
    });
    
    // Закрытие по кнопке
    const closeBtn = this.querySelector('[data-close]');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        const dialog = this.closest('custom-dialog');
        if (dialog) dialog.close();
      });
    }
  }
}

class DialogHeader extends HTMLElement {
  connectedCallback() {
    this.className = 'flex flex-col space-y-1.5 p-6';
  }
}

class DialogFooter extends HTMLElement {
  connectedCallback() {
    this.className = 'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-6';
  }
}

class DialogTitle extends HTMLElement {
  connectedCallback() {
    const h2 = document.createElement('h2');
    h2.className = 'text-lg font-semibold leading-none tracking-tight';
    h2.innerHTML = this.innerHTML;
    this.innerHTML = '';
    this.appendChild(h2);
  }
}

class DialogDescription extends HTMLElement {
  connectedCallback() {
    const p = document.createElement('p');
    p.className = 'text-sm text-gray-500';
    p.innerHTML = this.innerHTML;
    this.innerHTML = '';
    this.appendChild(p);
  }
}

customElements.define('custom-dialog', CustomDialog);
customElements.define('dialog-trigger', DialogTrigger);
customElements.define('dialog-content', DialogContent);
customElements.define('dialog-header', DialogHeader);
customElements.define('dialog-footer', DialogFooter);
customElements.define('dialog-title', DialogTitle);
customElements.define('dialog-description', DialogDescription);