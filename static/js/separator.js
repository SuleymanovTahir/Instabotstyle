// static/js/separator.js - НОВЫЙ ФАЙЛ
class CustomSeparator extends HTMLElement {
  connectedCallback() {
    const orientation = this.getAttribute('orientation') || 'horizontal';
    
    const hr = document.createElement('hr');
    
    if (orientation === 'horizontal') {
      hr.className = 'h-px w-full bg-gray-200 border-0';
    } else {
      hr.className = 'w-px h-full bg-gray-200 border-0';
    }
    
    this.innerHTML = '';
    this.appendChild(hr);
  }
}

customElements.define('custom-separator', CustomSeparator);