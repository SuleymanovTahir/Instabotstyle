// static/js/alert.js - ПОЛНОСТЬЮ ЗАМЕНИТЬ
class CustomAlert extends HTMLElement {
  connectedCallback() {
    const variant = this.getAttribute('variant') || 'default';
    
    this.setAttribute('role', 'alert');
    this.className = this.getAlertClasses(variant);
  }
  
  getAlertClasses(variant) {
    const base = 'relative w-full rounded-lg border px-4 py-3 text-sm';
    
    const variants = {
      default: 'bg-white border-gray-200 text-gray-900',
      destructive: 'bg-red-50 border-red-200 text-red-900',
      success: 'bg-green-50 border-green-200 text-green-900',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
      info: 'bg-blue-50 border-blue-200 text-blue-900'
    };
    
    return `${base} ${variants[variant] || variants.default}`;
  }
}

class AlertTitle extends HTMLElement {
  connectedCallback() {
    this.className = 'mb-1 font-medium leading-none tracking-tight';
  }
}

class AlertDescription extends HTMLElement {
  connectedCallback() {
    this.className = 'text-sm opacity-90';
  }
}

customElements.define('custom-alert', CustomAlert);
customElements.define('alert-title', AlertTitle);
customElements.define('alert-description', AlertDescription);