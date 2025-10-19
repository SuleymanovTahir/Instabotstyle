class Collapsible extends HTMLElement {
  constructor() {
    super();
    this.open = this.getAttribute('open') !== null;
  }
}

class CollapsibleTrigger extends HTMLElement {
  constructor() {
    super();
    const button = document.createElement('button');
    button.innerHTML = this.innerHTML;
    button.addEventListener('click', () => {
      const root = this.closest('collapsible');
      const content = this.nextElementSibling;
      root.open = !root.open;
      content.style.display = root.open ? 'block' : 'none';
    });
    this.innerHTML = '';
    this.appendChild(button);
  }
}

class CollapsibleContent extends HTMLElement {
  constructor() {
    super();
    const root = this.closest('collapsible');
    this.style.display = root.open ? 'block' : 'none';
  }
}

customElements.define('collapsible', Collapsible);
customElements.define('collapsible-trigger', CollapsibleTrigger);
customElements.define('collapsible-content', CollapsibleContent);