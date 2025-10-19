class Checkbox extends HTMLElement {
  constructor() {
    super();
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('peer', 'border', 'bg-input-background', 'dark:bg-input/30', 'data-[state=checked]:bg-primary', 'data-[state=checked]:text-primary-foreground', 'dark:data-[state=checked]:bg-primary', 'data-[state=checked]:border-primary', 'focus-visible:border-ring', 'focus-visible:ring-ring/50', 'aria-invalid:ring-destructive/20', 'dark:aria-invalid:ring-destructive/40', 'aria-invalid:border-destructive', 'size-4', 'shrink-0', 'rounded-[4px]', 'border', 'shadow-xs', 'transition-shadow', 'outline-none', 'focus-visible:ring-[3px]', 'disabled:cursor-not-allowed', 'disabled:opacity-50');
    if (this.getAttribute('class')) {
      checkbox.classList.add(...this.getAttribute('class').split(' '));
    }
    const indicator = document.createElement('span');
    indicator.classList.add('flex', 'items-center', 'justify-center', 'text-current', 'transition-none');
    indicator.innerHTML = '<svg class="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
    indicator.style.display = 'none';
    checkbox.addEventListener('change', () => {
      checkbox.setAttribute('data-state', checkbox.checked ? 'checked' : 'unchecked');
      indicator.style.display = checkbox.checked ? 'flex' : 'none';
    });
    this.appendChild(checkbox);
    this.appendChild(indicator);
  }
}

customElements.define('custom-checkbox', Checkbox);