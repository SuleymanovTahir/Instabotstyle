class Avatar extends HTMLElement {
  constructor() {
    super();
    this.classList.add('relative', 'flex', 'w-10', 'h-10', 'shrink-0', 'overflow-hidden', 'rounded-full');
    if (this.getAttribute('class')) {
      this.classList.add(...this.getAttribute('class').split(' '));
    }
  }
}

class AvatarImage extends HTMLElement {
  constructor() {
    super();
    const img = document.createElement('img');
    img.classList.add('aspect-square', 'w-full', 'h-full');
    if (this.getAttribute('class')) {
      img.classList.add(...this.getAttribute('class').split(' '));
    }
    if (this.getAttribute('src')) {
      img.src = this.getAttribute('src');
    }
    if (this.getAttribute('alt')) {
      img.alt = this.getAttribute('alt');
    }
    this.appendChild(img);
  }
}

class AvatarFallback extends HTMLElement {
  constructor() {
    super();
    this.classList.add('bg-gray-200', 'flex', 'w-full', 'h-full', 'items-center', 'justify-center', 'rounded-full');
    if (this.getAttribute('class')) {
      this.classList.add(...this.getAttribute('class').split(' '));
    }
    this.innerHTML = this.innerHTML || 'FB';
  }
}

customElements.define('custom-avatar', Avatar);
customElements.define('avatar-image', AvatarImage);
customElements.define('avatar-fallback', AvatarFallback);