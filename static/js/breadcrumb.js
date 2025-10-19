class Breadcrumb extends HTMLElement {
  constructor() {
    super();
    this.setAttribute('aria-label', 'breadcrumb');
  }
}

class BreadcrumbList extends HTMLElement {
  constructor() {
    super();
    this.classList.add('text-muted-foreground', 'flex', 'flex-wrap', 'items-center', 'gap-1.5', 'text-sm', 'break-words', 'sm:gap-2.5');
    if (this.getAttribute('class')) {
      this.classList.add(...this.getAttribute('class').split(' '));
    }
  }
}

class BreadcrumbItem extends HTMLElement {
  constructor() {
    super();
    this.classList.add('inline-flex', 'items-center', 'gap-1.5');
    if (this.getAttribute('class')) {
      this.classList.add(...this.getAttribute('class').split(' '));
    }
  }
}

class BreadcrumbLink extends HTMLElement {
  constructor() {
    super();
    this.classList.add('hover:text-foreground', 'transition-colors');
    if (this.getAttribute('class')) {
      this.classList.add(...this.getAttribute('class').split(' '));
    }
  }
}

class BreadcrumbPage extends HTMLElement {
  constructor() {
    super();
    this.setAttribute('role', 'link');
    this.setAttribute('aria-disabled', 'true');
    this.setAttribute('aria-current', 'page');
    this.classList.add('text-foreground', 'font-normal');
    if (this.getAttribute('class')) {
      this.classList.add(...this.getAttribute('class').split(' '));
    }
  }
}

class BreadcrumbSeparator extends HTMLElement {
  constructor() {
    super();
    this.setAttribute('role', 'presentation');
    this.setAttribute('aria-hidden', 'true');
    this.classList.add('[&>svg]:size-3.5');
    if (this.getAttribute('class')) {
      this.classList.add(...this.getAttribute('class').split(' '));
    }
    this.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>';
  }
}

class BreadcrumbEllipsis extends HTMLElement {
  constructor() {
    super();
    this.setAttribute('role', 'presentation');
    this.setAttribute('aria-hidden', 'true');
    this.classList.add('flex', 'size-9', 'items-center', 'justify-center');
    if (this.getAttribute('class')) {
      this.classList.add(...this.getAttribute('class').split(' '));
    }
    this.innerHTML = '<svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg><span class="sr-only">More</span>';
  }
}

customElements.define('custom-breadcrumb', Breadcrumb);
customElements.define('breadcrumb-list', BreadcrumbList);
customElements.define('breadcrumb-item', BreadcrumbItem);
customElements.define('breadcrumb-link', BreadcrumbLink);
customElements.define('breadcrumb-page', BreadcrumbPage);
customElements.define('breadcrumb-separator', BreadcrumbSeparator);
customElements.define('breadcrumb-ellipsis', BreadcrumbEllipsis);