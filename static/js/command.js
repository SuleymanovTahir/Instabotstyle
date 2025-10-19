// Простая реализация command menu на vanilla JS, без cmdk

class Command extends HTMLElement {
  constructor() {
    super();
    this.classList.add('bg-popover', 'text-popover-foreground', 'flex', 'h-full', 'w-full', 'flex-col', 'overflow-hidden', 'rounded-md');
    if (this.getAttribute('class')) {
      this.classList.add(...this.getAttribute('class').split(' '));
    }
  }
}

class CommandDialog extends HTMLElement {
  constructor() {
    super();
    // Используйте dialog.js для модального окна
  }
}

class CommandInput extends HTMLElement {
  constructor() {
    super();
    const div = document.createElement('div');
    div.classList.add('flex', 'h-9', 'items-center', 'gap-2', 'border-b', 'px-3');
    const svg = document.createElement('svg');
    svg.classList.add('size-5');
    svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>';
    div.appendChild(svg);
    const input = document.createElement('input');
    input.classList.add('flex-1', 'bg-transparent', 'text-sm', 'outline-none', 'placeholder:text-muted-foreground');
    input.placeholder = 'Type a command or search...';
    div.appendChild(input);
    this.appendChild(div);
  }
}

// Аналогично для остальных подкомпонентов

customElements.define('custom-command', Command);
// ... другие