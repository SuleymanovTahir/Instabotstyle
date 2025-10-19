// static/js/input.js - ПОЛНОСТЬЮ ЗАМЕНИТЬ
class CustomInput extends HTMLElement {
  connectedCallback() {
    const type = this.getAttribute('type') || 'text';
    const placeholder = this.getAttribute('placeholder') || '';
    const value = this.getAttribute('value') || '';
    const name = this.getAttribute('name') || '';
    const id = this.getAttribute('id') || '';
    const required = this.hasAttribute('required');
    
    const input = document.createElement('input');
    input.type = type;
    input.placeholder = placeholder;
    input.value = value;
    if (name) input.name = name;
    if (id) input.id = id;
    if (required) input.required = true;
    
    input.className = 'flex h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-pink-600 disabled:cursor-not-allowed disabled:opacity-50';
    
    // Копируем дополнительные атрибуты
    Array.from(this.attributes).forEach(attr => {
      if (!['type', 'placeholder', 'value', 'name', 'id', 'required', 'class'].includes(attr.name)) {
        input.setAttribute(attr.name, attr.value);
      }
    });
    
    this.innerHTML = '';
    this.appendChild(input);
  }
}

customElements.define('custom-input', CustomInput);