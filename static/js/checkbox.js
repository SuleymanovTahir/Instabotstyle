// static/js/checkbox.js - ПОЛНОСТЬЮ ЗАМЕНИТЬ
class CustomCheckbox extends HTMLElement {
  connectedCallback() {
    const checked = this.hasAttribute('checked');
    const name = this.getAttribute('name') || '';
    const id = this.getAttribute('id') || '';
    const value = this.getAttribute('value') || 'on';
    
    const wrapper = document.createElement('div');
    wrapper.className = 'relative flex items-center';
    
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = checked;
    if (name) input.name = name;
    if (id) input.id = id;
    input.value = value;
    input.className = 'peer h-4 w-4 shrink-0 rounded border border-gray-300 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 checked:bg-pink-600 checked:border-pink-600';
    
    const checkmark = document.createElement('svg');
    checkmark.className = 'absolute left-0 w-4 h-4 text-white pointer-events-none hidden peer-checked:block';
    checkmark.setAttribute('viewBox', '0 0 24 24');
    checkmark.setAttribute('fill', 'none');
    checkmark.setAttribute('stroke', 'currentColor');
    checkmark.setAttribute('stroke-width', '3');
    checkmark.innerHTML = '<path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/>';
    
    wrapper.appendChild(input);
    wrapper.appendChild(checkmark);
    
    this.innerHTML = '';
    this.appendChild(wrapper);
  }
}

customElements.define('custom-checkbox', CustomCheckbox);