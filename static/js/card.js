// static/js/card.js - ПОЛНОСТЬЮ ЗАМЕНИТЬ
class CustomCard extends HTMLElement {
  connectedCallback() {
    this.classList.add('bg-white', 'text-gray-900', 'flex', 'flex-col', 'gap-6', 'rounded-xl', 'border', 'border-gray-200', 'shadow-sm');
  }
}

class CardHeader extends HTMLElement {
  connectedCallback() {
    this.classList.add('grid', 'auto-rows-min', 'items-start', 'gap-1.5', 'px-6', 'pt-6');
  }
}

class CardTitle extends HTMLElement {
  connectedCallback() {
    const h3 = document.createElement('h3');
    h3.className = 'text-2xl font-semibold leading-none tracking-tight';
    h3.innerHTML = this.innerHTML;
    this.innerHTML = '';
    this.appendChild(h3);
  }
}

class CardDescription extends HTMLElement {
  connectedCallback() {
    const p = document.createElement('p');
    p.className = 'text-sm text-gray-500';
    p.innerHTML = this.innerHTML;
    this.innerHTML = '';
    this.appendChild(p);
  }
}

class CardContent extends HTMLElement {
  connectedCallback() {
    this.classList.add('px-6', 'pb-6');
  }
}

class CardFooter extends HTMLElement {
  connectedCallback() {
    this.classList.add('flex', 'items-center', 'px-6', 'pb-6', 'border-t', 'pt-6');
  }
}

customElements.define('custom-card', CustomCard);
customElements.define('card-header', CardHeader);
customElements.define('card-title', CardTitle);
customElements.define('card-description', CardDescription);
customElements.define('card-content', CardContent);
customElements.define('card-footer', CardFooter);