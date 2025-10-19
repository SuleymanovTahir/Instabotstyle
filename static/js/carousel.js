// static/js/carousel.js - ПОЛНОСТЬЮ ЗАМЕНИТЬ
class CustomCarousel extends HTMLElement {
  constructor() {
    super();
    this.currentIndex = 0;
    this.items = [];
  }
  
  connectedCallback() {
    this.items = Array.from(this.querySelectorAll('carousel-item'));
    this.render();
    this.showSlide(0);
  }
  
  render() {
    this.className = 'relative overflow-hidden';
    
    const controls = `
      <button class="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/80 p-2 hover:bg-white" data-action="prev">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <button class="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/80 p-2 hover:bg-white" data-action="next">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    `;
    
    this.insertAdjacentHTML('beforeend', controls);
    this.attachEventListeners();
  }
  
  attachEventListeners() {
    this.querySelector('[data-action="prev"]').addEventListener('click', () => this.prev());
    this.querySelector('[data-action="next"]').addEventListener('click', () => this.next());
  }
  
  showSlide(index) {
    this.items.forEach((item, i) => {
      item.style.display = i === index ? 'block' : 'none';
    });
  }
  
  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.showSlide(this.currentIndex);
  }
  
  next() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.showSlide(this.currentIndex);
  }
}

class CarouselItem extends HTMLElement {
  connectedCallback() {
    this.className = 'w-full';
  }
}

customElements.define('custom-carousel', CustomCarousel);
customElements.define('carousel-item', CarouselItem);