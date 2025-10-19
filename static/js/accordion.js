class Accordion extends HTMLElement {
  constructor() {
    super();
  }
}

class AccordionItem extends HTMLElement {
  constructor() {
    super();
    this.classList.add('border-b', 'last:border-b-0');
    if (this.getAttribute('class')) {
      this.classList.add(...this.getAttribute('class').split(' '));
    }
  }
}

class AccordionTrigger extends HTMLElement {
  constructor() {
    super();
    const header = document.createElement('div');
    header.classList.add('flex');
    const button = document.createElement('button');
    button.classList.add(
      'flex', 'flex-1', 'items-start', 'justify-between', 'gap-4', 'rounded-md', 'py-4',
      'text-left', 'text-sm', 'font-medium', 'transition-all', 'outline-none',
      'hover:underline', 'focus-visible:ring-2', 'focus-visible:ring-blue-500',
      'disabled:pointer-events-none', 'disabled:opacity-50'
    );
    if (this.getAttribute('class')) {
      button.classList.add(...this.getAttribute('class').split(' '));
    }
    button.innerHTML = this.innerHTML;
    const icon = document.createElement('svg');
    icon.setAttribute('class', 'text-gray-500 pointer-events-none w-4 h-4 shrink-0 translate-y-0.5 transition-transform duration-200');
    icon.innerHTML = '<path fill="currentColor" d="M5.293 7.293a1 1 0 011.414 0L12 12.586l5.293-5.293a1 1 0 111.414 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414z"/>';
    button.appendChild(icon);
    button.addEventListener('click', () => {
      const content = this.nextElementSibling;
      if (content.style.display === 'none' || !content.style.display) {
        content.style.display = 'block';
        button.querySelector('svg').style.transform = 'rotate(180deg)';
      } else {
        content.style.display = 'none';
        button.querySelector('svg').style.transform = 'rotate(0deg)';
      }
    });
    header.appendChild(button);
    this.innerHTML = '';
    this.appendChild(header);
  }
}

class AccordionContent extends HTMLElement {
  constructor() {
    super();
    const div = document.createElement('div');
    div.classList.add('pt-0', 'pb-4', 'text-sm');
    if (this.getAttribute('class')) {
      div.classList.add(...this.getAttribute('class').split(' '));
    }
    div.innerHTML = this.innerHTML;
    this.innerHTML = '';
    this.classList.add('overflow-hidden', 'text-sm');
    this.style.display = 'none';
    this.appendChild(div);
  }
}

customElements.define('custom-accordion', Accordion);
customElements.define('accordion-item', AccordionItem);
customElements.define('accordion-trigger', AccordionTrigger);
customElements.define('accordion-content', AccordionContent);