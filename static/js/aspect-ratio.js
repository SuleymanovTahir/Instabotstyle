class AspectRatio extends HTMLElement {
  constructor() {
    super();
    this.style.position = 'relative';
    this.style.width = '100%';
    const ratio = this.getAttribute('ratio') || '1';
    this.style.paddingBottom = `${100 / parseFloat(ratio)}%`;
    const inner = document.createElement('div');
    inner.style.position = 'absolute';
    inner.style.top = '0';
    inner.style.left = '0';
    inner.style.width = '100%';
    inner.style.height = '100%';
    inner.innerHTML = this.innerHTML;
    this.innerHTML = '';
    this.appendChild(inner);
  }
}

customElements.define('aspect-ratio', AspectRatio);