class AlertDialog extends HTMLElement {
  constructor() {
    super();
  }
}

class AlertDialogTrigger extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('click', () => {
      const content = this.nextElementSibling;
      content.style.display = 'block';
    });
  }
}

class AlertDialogPortal extends HTMLElement {
  constructor() {
    super();
  }
}

class AlertDialogOverlay extends HTMLElement {
  constructor() {
    super();
    this.classList.add('fixed', 'inset-0', 'z-50', 'bg-black/50');
    if (this.getAttribute('class')) {
      this.classList.add(...this.getAttribute('class').split(' '));
    }
  }
}

class AlertDialogContent extends HTMLElement {
  constructor() {
    super();
    this.classList.add(
      'bg-white', 'fixed', 'top-1/2', 'left-1/2', 'z-50', 'grid', 'w-full', 'max-w-[calc(100%-2rem)]',
      'transform', '-translate-x-1/2', '-translate-y-1/2', 'gap-4', 'rounded-lg', 'border', 'p-6', 'shadow-lg',
      'sm:max-w-lg'
    );
    if (this.getAttribute('class')) {
      this.classList.add(...this.getAttribute('class').split(' '));
    }
    this.style.display = 'none';
    const overlay = document.createElement('alert-dialog-overlay');
    this.prepend(overlay);
  }
}

class AlertDialogHeader extends HTMLElement {
  constructor() {
    super();
    this.classList.add('flex', 'flex-col', 'gap-2', 'text-center', 'sm:text-left');
    if (this.getAttribute('class')) {
      this.classList.add(...this.getAttribute('class').split(' '));
    }
  }
}

class AlertDialogFooter extends HTMLElement {
  constructor() {
    super();
    this.classList.add('flex', 'flex-col-reverse', 'gap-2', 'sm:flex-row', 'sm:justify-end');
    if (this.getAttribute('class')) {
      this.classList.add(...this.getAttribute('class').split(' '));
    }
  }
}

class AlertDialogTitle extends HTMLElement {
  constructor() {
    super();
    this.classList.add('text-lg', 'font-semibold');
    if (this.getAttribute('class')) {
      this.classList.add(...this.getAttribute('class').split(' '));
    }
  }
}

class AlertDialogDescription extends HTMLElement {
  constructor() {
    super();
    this.classList.add('text-gray-500', 'text-sm');
    if (this.getAttribute('class')) {
      this.classList.add(...this.getAttribute('class').split(' '));
    }
  }
}

class AlertDialogAction extends HTMLElement {
  constructor() {
    super();
    this.classList.add('bg-blue-500', 'text-white', 'px-4', 'py-2', 'rounded');
    if (this.getAttribute('class')) {
      this.classList.add(...this.getAttribute('class').split(' '));
    }
  }
}

class AlertDialogCancel extends HTMLElement {
  constructor() {
    super();
    this.classList.add('bg-gray-200', 'text-black', 'px-4', 'py-2', 'rounded');
    if (this.getAttribute('class')) {
      this.classList.add(...this.getAttribute('class').split(' '));
    }
    this.addEventListener('click', () => {
      const content = this.closest('alert-dialog-content');
      content.style.display = 'none';
    });
  }
}

customElements.define('alert-dialog', AlertDialog);
customElements.define('alert-dialog-trigger', AlertDialogTrigger);
customElements.define('alert-dialog-portal', AlertDialogPortal);
customElements.define('alert-dialog-overlay', AlertDialogOverlay);
customElements.define('alert-dialog-content', AlertDialogContent);
customElements.define('alert-dialog-header', AlertDialogHeader);
customElements.define('alert-dialog-footer', AlertDialogFooter);
customElements.define('alert-dialog-title', AlertDialogTitle);
customElements.define('alert-dialog-description', AlertDialogDescription);
customElements.define('alert-dialog-action', AlertDialogAction);
customElements.define('alert-dialog-cancel', AlertDialogCancel);