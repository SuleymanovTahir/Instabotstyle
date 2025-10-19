// static/js/button.js - ПОЛНОСТЬЮ ЗАМЕНИТЬ
class CustomButton extends HTMLElement {
  connectedCallback() {
    const variant = this.getAttribute('variant') || 'default';
    const size = this.getAttribute('size') || 'default';
    const content = this.innerHTML;
    
    const button = document.createElement('button');
    button.className = this.getButtonClasses(variant, size);
    button.innerHTML = content;
    
    // Копируем события и атрибуты
    Array.from(this.attributes).forEach(attr => {
      if (!['variant', 'size', 'class'].includes(attr.name)) {
        button.setAttribute(attr.name, attr.value);
      }
    });
    
    this.innerHTML = '';
    this.appendChild(button);
  }
  
  getButtonClasses(variant, size) {
    const base = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none';
    
    const variants = {
      default: 'bg-pink-600 text-white hover:bg-pink-700',
      destructive: 'bg-red-600 text-white hover:bg-red-700',
      outline: 'border border-gray-300 bg-white hover:bg-gray-50',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
      ghost: 'hover:bg-gray-100',
      link: 'text-pink-600 underline-offset-4 hover:underline'
    };
    
    const sizes = {
      default: 'h-9 px-4 py-2',
      sm: 'h-8 px-3',
      lg: 'h-10 px-6',
      icon: 'h-9 w-9'
    };
    
    return `${base} ${variants[variant] || variants.default} ${sizes[size] || sizes.default}`;
  }
}

customElements.define('custom-button', CustomButton);