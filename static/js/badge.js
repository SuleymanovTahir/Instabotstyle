// static/js/badge.js - ПОЛНОСТЬЮ ЗАМЕНИТЬ
class CustomBadge extends HTMLElement {
  connectedCallback() {
    const variant = this.getAttribute('variant') || 'default';
    const content = this.innerHTML;
    
    const span = document.createElement('span');
    span.className = this.getBadgeClasses(variant);
    span.innerHTML = content;
    
    this.innerHTML = '';
    this.appendChild(span);
  }
  
  getBadgeClasses(variant) {
    const base = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const variants = {
      default: 'bg-pink-600 text-white hover:bg-pink-700',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
      destructive: 'bg-red-600 text-white hover:bg-red-700',
      outline: 'border border-gray-300 text-gray-900 hover:bg-gray-50',
      success: 'bg-green-600 text-white hover:bg-green-700',
      warning: 'bg-yellow-600 text-white hover:bg-yellow-700'
    };
    
    return `${base} ${variants[variant] || variants.default}`;
  }
}

customElements.define('custom-badge', CustomBadge);