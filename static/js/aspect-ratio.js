// static/js/aspect-ratio.js - ПОЛНОСТЬЮ ЗАМЕНИТЬ
class AspectRatio extends HTMLElement {
  connectedCallback() {
    const ratio = this.getAttribute('ratio') || '16/9';
    const [width, height] = ratio.split('/').map(Number);
    const paddingBottom = (height / width * 100).toFixed(2);
    
    this.style.position = 'relative';
    this.style.width = '100%';
    this.style.paddingBottom = `${paddingBottom}%`;
    
    const content = this.innerHTML;
    this.innerHTML = `
      <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
        ${content}
      </div>
    `;
  }
}

customElements.define('aspect-ratio', AspectRatio);