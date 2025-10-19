// static/js/textarea.js - ПОЛНОСТЬЮ ЗАМЕНИТЬ
class CustomTextarea extends HTMLElement {
  connectedCallback() {
    const placeholder = this.getAttribute('placeholder') || '';
    const name = this.getAttribute('name') || '';
    const id = this.getAttribute('id') || '';
    const rows = this.getAttribute('rows') || '4';
    const required = this.hasAttribute('required');
    const value = this.textContent.trim();
    
    const textarea = document.createElement('textarea');
    textarea.placeholder = placeholder;
    if (name) textarea.name = name;
    if (id) textarea.id = id;
    textarea.rows = rows;
    if (required) textarea.required = true;
    textarea.value = value;
    
    textarea.className = 'flex min-h-[60px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-pink-600 disabled:cursor-not-allowed disabled:opacity-50';
    
    this.innerHTML = '';
    this.appendChild(textarea);
  }
}

customElements.define('custom-textarea', CustomTextarea);