// static/js/skeleton.js - НОВЫЙ ФАЙЛ
class CustomSkeleton extends HTMLElement {
  connectedCallback() {
    const width = this.getAttribute('width') || '100%';
    const height = this.getAttribute('height') || '1rem';
    
    const div = document.createElement('div');
    div.className = 'animate-pulse bg-gray-200 rounded';
    div.style.width = width;
    div.style.height = height;
    
    this.innerHTML = '';
    this.appendChild(div);
  }
}

customElements.define('custom-skeleton', CustomSkeleton);