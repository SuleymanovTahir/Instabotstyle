class Alert extends HTMLElement {
  constructor() {
    super();
    this.setAttribute('role', 'alert');
    this.classList.add(
      'relative', 'w-full', 'rounded-lg', 'border', 'px-4', 'py-3', 'text-sm',
      'grid', 'grid-cols-[0_1fr]', 'items-start'
    );
    if (this.querySelector('svg')) {
      this.classList.remove('grid-cols-[0_1fr]');
      this.classList.add('grid-cols-[1rem_1fr]', 'gap-x-3');
    }
    if (this.getAttribute('data-variant') === 'destructive') {
      this.classList.add('text-red-600', 'bg-white');
    } else {
      this.classList.add('bg-white', 'text-black');
    }
    if (this.getAttribute('class')) {
      this.classList.add(...this.getAttribute('class').split(' '));
    }
  }
}

class AlertTitle extends HTMLElement {
  constructor() {
    super();
    this.classList.add('col-start-2', 'min-h-4', 'font-medium', 'tracking-tight');
    if (this.getAttribute('class')) {
      this.classList.add(...this.getAttribute('class').split(' '));
    }
  }
}

class AlertDescription extends HTMLElement {
  constructor() {
    super();
    this.classList.add('col-start-2', 'grid', 'justify-items-start', 'gap-1', 'text-sm', 'text-gray-500');
    if (this.getAttribute('class')) {
      this.classList.add(...this.getAttribute('class').split(' '));
    }
  }
}

customElements.define('custom-alert', Alert);
customElements.define('alert-title', AlertTitle);
customElements.define('alert-description', AlertDescription);