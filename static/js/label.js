// static/js/label.js - ПОЛНОСТЬЮ ЗАМЕНИТЬ
class CustomLabel extends HTMLElement {
  connectedCallback() {
    const htmlFor = this.getAttribute('for') || '';
    const content = this.innerHTML;
    
    const label = document.createElement('label');
    if (htmlFor) label.setAttribute('for', htmlFor);
    label.className = 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70';
    label.innerHTML = content;
    
    this.innerHTML = '';
    this.appendChild(label);
  }
}

customElements.define('custom-label', CustomLabel);