// static/js/accordion.js - ПОЛНОСТЬЮ ЗАМЕНИТЬ
class CustomAccordion extends HTMLElement {
  connectedCallback() {
    this.className = 'space-y-2';
  }
}

class AccordionItem extends HTMLElement {
  connectedCallback() {
    this.className = 'border-b last:border-b-0';
  }
}

class AccordionTrigger extends HTMLElement {
  connectedCallback() {
    const content = this.innerHTML;
    const item = this.closest('accordion-item');
    const accordionContent = item.querySelector('accordion-content');
    
    const button = document.createElement('button');
    button.className = 'flex w-full items-center justify-between py-4 text-left font-medium hover:underline';
    button.type = 'button';
    button.innerHTML = `
      ${content}
      <svg class="h-4 w-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    `;
    
    button.addEventListener('click', () => {
      const isOpen = accordionContent.style.display !== 'none';
      accordionContent.style.display = isOpen ? 'none' : 'block';
      const icon = button.querySelector('svg');
      icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
    });
    
    this.innerHTML = '';
    this.appendChild(button);
    
    // Скрыть контент по умолчанию
    if (accordionContent) {
      accordionContent.style.display = 'none';
    }
  }
}

class AccordionContent extends HTMLElement {
  connectedCallback() {
    this.className = 'pb-4 pt-0';
  }
}

customElements.define('custom-accordion', CustomAccordion);
customElements.define('accordion-item', AccordionItem);
customElements.define('accordion-trigger', AccordionTrigger);
customElements.define('accordion-content', AccordionContent);