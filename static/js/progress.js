// static/js/progress.js - НОВЫЙ ФАЙЛ
class CustomProgress extends HTMLElement {
  connectedCallback() {
    const value = parseFloat(this.getAttribute('value')) || 0;
    const max = parseFloat(this.getAttribute('max')) || 100;
    const percentage = (value / max) * 100;
    
    const container = document.createElement('div');
    container.className = 'relative h-2 w-full overflow-hidden rounded-full bg-gray-200';
    
    const bar = document.createElement('div');
    bar.className = 'h-full bg-pink-600 transition-all';
    bar.style.width = `${percentage}%`;
    
    container.appendChild(bar);
    this.innerHTML = '';
    this.appendChild(container);
  }
  
  // Метод для обновления значения
  setValue(value) {
    this.setAttribute('value', value);
    const max = parseFloat(this.getAttribute('max')) || 100;
    const percentage = (value / max) * 100;
    const bar = this.querySelector('div > div');
    if (bar) {
      bar.style.width = `${percentage}%`;
    }
  }
}

customElements.define('custom-progress', CustomProgress);