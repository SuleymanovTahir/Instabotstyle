// Для карусели используем простой vanilla JS слайдер, так как Embla - внешняя библиотека

class Carousel extends HTMLElement {
  constructor() {
    super();
    this.orientation = this.getAttribute('orientation') || 'horizontal';
    this.current = 0;
    this.childrenArray = Array.from(this.children);
    this.update();
  }
  update() {
    this.childrenArray.forEach((child, index) => {
      child.style.display = index === this.current ? 'block' : 'none';
    });
  }
  scrollPrev() {
    this.current = (this.current > 0) ? this.current - 1 : this.childrenArray.length - 1;
    this.update();
  }
  scrollNext() {
    this.current = (this.current < this.childrenArray.length - 1) ? this.current + 1 : 0;
    this.update();
  }
}

class CarouselContent extends HTMLElement {
  constructor() {
    super();
    this.classList.add('flex', 'overflow-hidden');
  }
}

class CarouselItem extends HTMLElement {
  constructor() {
    super();
    this.classList.add('min-w-0', 'shrink-0', 'grow-0', 'basis-full');
    if (this.getAttribute('class')) {
      this.classList.add(...this.getAttribute('class').split(' '));
    }
  }
}

class CarouselPrevious extends HTMLElement {
  constructor() {
    super();
    const button = document.createElement('button');
    button.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>';
    button.classList.add('absolute', 'size-8', 'rounded-full');
    button.addEventListener('click', () => {
      this.closest('carousel').scrollPrev();
    });
    this.appendChild(button);
  }
}

class CarouselNext extends HTMLElement {
  constructor() {
    super();
    const button = document.createElement('button');
    button.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>';
    button.classList.add('absolute', 'size-8', 'rounded-full');
    button.addEventListener('click', () => {
      this.closest('carousel').scrollNext();
    });
    this.appendChild(button);
  }
}

customElements.define('custom-carousel', Carousel);
customElements.define('carousel-content', CarouselContent);
customElements.define('carousel-item', CarouselItem);
customElements.define('carousel-previous', CarouselPrevious);
customElements.define('carousel-next', CarouselNext);