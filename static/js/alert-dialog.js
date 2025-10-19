// static/js/alert-dialog.js - ПОЛНОСТЬЮ ЗАМЕНИТЬ
class AlertDialog extends HTMLElement {
  connectedCallback() {
    this.style.display = 'none';
  }
  
  open() {
    this.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
  
  close() {
    this.style.display = 'none';
    document.body.style.overflow = '';
  }
}

class AlertDialogTrigger extends HTMLElement {
  connectedCallback() {
    this.addEventListener('click', () => {
      const dialog = this.closest('alert-dialog') || document.querySelector('alert-dialog');
      if (dialog) dialog.open();
    });
  }
}

class AlertDialogContent extends HTMLElement {
  connectedCallback() {
    const content = this.innerHTML;
    
    this.innerHTML = `
      <div class="fixed inset-0 z-50 bg-black/50" data-overlay></div>
      <div class="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg">
        <div class="bg-white rounded-lg shadow-lg p-6 space-y-4">
          ${content}
        </div>
      </div>
    `;
    
    // Закрытие по клику на overlay
    this.querySelector('[data-overlay]').addEventListener('click', () => {
      const dialog = this.closest('alert-dialog');
      if (dialog) dialog.close();
    });
  }
}

class AlertDialogHeader extends HTMLElement {
  connectedCallback() {
    this.className = 'space-y-2';
  }
}

class AlertDialogFooter extends HTMLElement {
  connectedCallback() {
    this.className = 'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2';
  }
}

class AlertDialogTitle extends HTMLElement {
  connectedCallback() {
    const h2 = document.createElement('h2');
    h2.className = 'text-lg font-semibold';
    h2.innerHTML = this.innerHTML;
    this.innerHTML = '';
    this.appendChild(h2);
  }
}

class AlertDialogDescription extends HTMLElement {
  connectedCallback() {
    const p = document.createElement('p');
    p.className = 'text-sm text-gray-500';
    p.innerHTML = this.innerHTML;
    this.innerHTML = '';
    this.appendChild(p);
  }
}

class AlertDialogAction extends HTMLElement {
  connectedCallback() {
    const button = document.createElement('button');
    button.className = 'inline-flex items-center justify-center rounded-md bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700';
    button.innerHTML = this.innerHTML;
    
    button.addEventListener('click', () => {
      const dialog = this.closest('alert-dialog');
      if (dialog) dialog.close();
    });
    
    this.innerHTML = '';
    this.appendChild(button);
  }
}

class AlertDialogCancel extends HTMLElement {
  connectedCallback() {
    const button = document.createElement('button');
    button.className = 'inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50';
    button.innerHTML = this.innerHTML;
    
    button.addEventListener('click', () => {
      const dialog = this.closest('alert-dialog');
      if (dialog) dialog.close();
    });
    
    this.innerHTML = '';
    this.appendChild(button);
  }
}

customElements.define('alert-dialog', AlertDialog);
customElements.define('alert-dialog-trigger', AlertDialogTrigger);
customElements.define('alert-dialog-content', AlertDialogContent);
customElements.define('alert-dialog-header', AlertDialogHeader);
customElements.define('alert-dialog-footer', AlertDialogFooter);
customElements.define('alert-dialog-title', AlertDialogTitle);
customElements.define('alert-dialog-description', AlertDialogDescription);
customElements.define('alert-dialog-action', AlertDialogAction);
customElements.define('alert-dialog-cancel', AlertDialogCancel);