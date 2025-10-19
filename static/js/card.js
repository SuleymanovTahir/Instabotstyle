class Card extends HTMLElement {
  constructor() {
    super();
    this.classList.add('bg-card', 'text-card-foreground', 'flex', 'flex-col', 'gap-6', 'rounded-xl', 'border');
    if (this.getAttribute('class')) {
      this.classList.add(...this.getAttribute('class').split(' '));
    }
  }
}

class CardHeader extends HTMLElement {
  constructor() {
    super();
    this.classList.add('@container/card-header', 'grid', 'auto-rows-min', 'grid-rows-[auto_auto]', 'items-start', 'gap-1.5', 'px-6', 'pt-6', 'has-data-[slot=card-action]:grid-cols-[1fr_auto]', '[.border-b]:pb-6');
    if (this.getAttribute('class')) {
      this.classList.add(...this.getAttribute('class').split(' '));
    }
  }
}

class CardTitle extends HTMLElement {
  constructor() {
    super();
    this.classList.add('leading-none');
    if (this.getAttribute('class')) {
      this.classList.add(...this.getAttribute('class').split(' '));
    }
  }
}

class CardDescription extends HTMLElement {
  constructor() {
    super();
    this.classList.add('text-muted-foreground');
    if (this.getAttribute('class')) {
      this.classList.add(...this.getAttribute('class').split(' '));
    }
  }
}

class CardAction extends HTMLElement {
  constructor() {
    super();
    this.classList.add('col-start-2', 'row-span-2', 'row-start-1', 'self-start', 'justify-self-end');
    if (this.getAttribute('class')) {
      this.classList.add(...this.getAttribute('class').split(' '));
    }
  }
}

class CardContent extends HTMLElement {
  constructor() {
    super();
    this.classList.add('px-6', '[&:last-child]:pb-6');
    if (this.getAttribute('class')) {
      this.classList.add(...this.getAttribute('class').split(' '));
    }
  }
}

class CardFooter extends HTMLElement {
  constructor() {
    super();
    this.classList.add('flex', 'items-center', 'px-6', 'pb-6', '[.border-t]:pt-6');
    if (this.getAttribute('class')) {
      this.classList.add(...this.getAttribute('class').split(' '));
    }
  }
}

customElements.define('custom-card', Card);
customElements.define('card-header', CardHeader);
customElements.define('card-title', CardTitle);
customElements.define('card-description', CardDescription);
customElements.define('card-action', CardAction);
customElements.define('card-content', CardContent);
customElements.define('card-footer', CardFooter);