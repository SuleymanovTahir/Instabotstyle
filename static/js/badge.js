class Badge extends HTMLElement {
  constructor() {
    super();
    this.classList.add('inline-flex', 'items-center', 'justify-center', 'rounded-md', 'border', 'px-2', 'py-0.5', 'text-xs', 'font-medium', 'w-fit', 'whitespace-nowrap', 'shrink-0', '[&>svg]:size-3', 'gap-1', '[&>svg]:pointer-events-none', 'focus-visible:border-ring', 'focus-visible:ring-ring/50', 'focus-visible:ring-[3px]', 'aria-invalid:ring-destructive/20', 'dark:aria-invalid:ring-destructive/40', 'aria-invalid:border-destructive', 'transition-[color,box-shadow]', 'overflow-hidden');
    const variant = this.getAttribute('variant') || 'default';
    switch (variant) {
      case 'default':
        this.classList.add('border-transparent', 'bg-primary', 'text-primary-foreground', '[a&]:hover:bg-primary/90');
        break;
      case 'secondary':
        this.classList.add('border-transparent', 'bg-secondary', 'text-secondary-foreground', '[a&]:hover:bg-secondary/90');
        break;
      case 'destructive':
        this.classList.add('border-transparent', 'bg-destructive', 'text-white', '[a&]:hover:bg-destructive/90', 'focus-visible:ring-destructive/20', 'dark:focus-visible:ring-destructive/40', 'dark:bg-destructive/60');
        break;
      case 'outline':
        this.classList.add('text-foreground', '[a&]:hover:bg-accent', '[a&]:hover:text-accent-foreground');
        break;
    }
    if (this.getAttribute('class')) {
      this.classList.add(...this.getAttribute('class').split(' '));
    }
  }
}

customElements.define('custom-badge', Badge);