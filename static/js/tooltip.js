// static/js/tooltip.js - НОВЫЙ ФАЙЛ
class CustomTooltip extends HTMLElement {
  connectedCallback() {
    const trigger = this.querySelector('tooltip-trigger');
    const content = this.querySelector('tooltip-content');
    
    if (!trigger || !content) return;
    
    // Скрыть tooltip по умолчанию
    content.style.display = 'none';
    content.style.position = 'absolute';
    content.style.zIndex = '50';
    
    let timeout;
    
    trigger.addEventListener('mouseenter', () => {
      timeout = setTimeout(() => {
        this.showTooltip(trigger, content);
      }, 300);
    });
    
    trigger.addEventListener('mouseleave', () => {
      clearTimeout(timeout);
      content.style.display = 'none';
    });
  }
  
  showTooltip(trigger, content) {
    const rect = trigger.getBoundingClientRect();
    const side = this.getAttribute('side') || 'top';
    
    content.style.display = 'block';
    
    switch(side) {
      case 'top':
        content.style.bottom = `${window.innerHeight - rect.top + 8}px`;
        content.style.left = `${rect.left + rect.width / 2}px`;
        content.style.transform = 'translateX(-50%)';
        break;
      case 'bottom':
        content.style.top = `${rect.bottom + 8}px`;
        content.style.left = `${rect.left + rect.width / 2}px`;
        content.style.transform = 'translateX(-50%)';
        break;
      case 'left':
        content.style.top = `${rect.top + rect.height / 2}px`;
        content.style.right = `${window.innerWidth - rect.left + 8}px`;
        content.style.transform = 'translateY(-50%)';
        break;
      case 'right':
        content.style.top = `${rect.top + rect.height / 2}px`;
        content.style.left = `${rect.right + 8}px`;
        content.style.transform = 'translateY(-50%)';
        break;
    }
  }
}

class TooltipTrigger extends HTMLElement {
  connectedCallback() {
    this.style.cursor = 'pointer';
  }
}

class TooltipContent extends HTMLElement {
  connectedCallback() {
    this.className = 'z-50 overflow-hidden rounded-md bg-gray-900 px-3 py-1.5 text-xs text-white animate-in fade-in-0 zoom-in-95';
  }
}

customElements.define('custom-tooltip', CustomTooltip);
customElements.define('tooltip-trigger', TooltipTrigger);
customElements.define('tooltip-content', TooltipContent);