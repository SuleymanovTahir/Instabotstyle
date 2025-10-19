// static/js/avatar.js - ПОЛНОСТЬЮ ЗАМЕНИТЬ
class CustomAvatar extends HTMLElement {
  connectedCallback() {
    this.className = 'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full';
  }
}

class AvatarImage extends HTMLElement {
  connectedCallback() {
    const src = this.getAttribute('src');
    const alt = this.getAttribute('alt') || '';
    
    if (src) {
      const img = document.createElement('img');
      img.className = 'aspect-square h-full w-full object-cover';
      img.src = src;
      img.alt = alt;
      
      img.onerror = () => {
        // Показать fallback при ошибке загрузки
        img.style.display = 'none';
        const fallback = this.parentElement.querySelector('avatar-fallback');
        if (fallback) fallback.style.display = 'flex';
      };
      
      this.innerHTML = '';
      this.appendChild(img);
    }
  }
}

class AvatarFallback extends HTMLElement {
  connectedCallback() {
    const content = this.innerHTML || '?';
    
    const div = document.createElement('div');
    div.className = 'flex h-full w-full items-center justify-center rounded-full bg-gray-200 text-gray-600 font-medium';
    div.innerHTML = content;
    
    this.innerHTML = '';
    this.appendChild(div);
  }
}

customElements.define('custom-avatar', CustomAvatar);
customElements.define('avatar-image', AvatarImage);
customElements.define('avatar-fallback', AvatarFallback);