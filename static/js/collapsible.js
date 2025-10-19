// static/js/collapsible.js - ПОЛНОСТЬЮ ЗАМЕНИТЬ
class Collapsible extends HTMLElement {
  constructor() {
    super();
    this.isOpen = this.hasAttribute('open');
  }
  
  connectedCallback() {
    const content = this.querySelector('collapsible-content');
    if (content && !this.isOpen) {
      content.style.display = 'none';
    }
  }
  
  toggle() {
    this.isOpen = !this.isOpen;
    const content = this.querySelector('collapsible-content');
    if (content) {
      content.style.display = this.isOpen ? 'block' : 'none';
    }
  }
}

class CollapsibleTrigger extends HTMLElement {
  connectedCallback() {
    this.style.cursor = 'pointer';
    this.addEventListener('click', () => {
      const collapsible = this.closest('collapsible');
      if (collapsible) collapsible.toggle();
    });
  }
}

class CollapsibleContent extends HTMLElement {
  // Контент управляется родителем
}

customElements.define('collapsible', Collapsible);
customElements.define('collapsible-trigger', CollapsibleTrigger);
customElements.define('collapsible-content', CollapsibleContent);