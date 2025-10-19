// static/js/breadcrumb.js - ПОЛНОСТЬЮ ЗАМЕНИТЬ
class CustomBreadcrumb extends HTMLElement {
  connectedCallback() {
    this.setAttribute('aria-label', 'breadcrumb');
    const nav = document.createElement('nav');
    nav.innerHTML = this.innerHTML;
    this.innerHTML = '';
    this.appendChild(nav);
  }
}

class BreadcrumbList extends HTMLElement {
  connectedCallback() {
    const ol = document.createElement('ol');
    ol.className = 'flex flex-wrap items-center gap-1.5 break-words text-sm text-gray-500 sm:gap-2.5';
    ol.innerHTML = this.innerHTML;
    this.innerHTML = '';
    this.appendChild(ol);
  }
}

class BreadcrumbItem extends HTMLElement {
  connectedCallback() {
    const li = document.createElement('li');
    li.className = 'inline-flex items-center gap-1.5';
    li.innerHTML = this.innerHTML;
    this.innerHTML = '';
    this.appendChild(li);
  }
}

class BreadcrumbLink extends HTMLElement {
  connectedCallback() {
    const href = this.getAttribute('href') || '#';
    const a = document.createElement('a');
    a.href = href;
    a.className = 'transition-colors hover:text-gray-900';
    a.innerHTML = this.innerHTML;
    this.innerHTML = '';
    this.appendChild(a);
  }
}

class BreadcrumbPage extends HTMLElement {
  connectedCallback() {
    this.setAttribute('role', 'link');
    this.setAttribute('aria-disabled', 'true');
    this.setAttribute('aria-current', 'page');
    this.className = 'font-normal text-gray-900';
  }
}

class BreadcrumbSeparator extends HTMLElement {
  connectedCallback() {
    this.setAttribute('role', 'presentation');
    this.setAttribute('aria-hidden', 'true');
    this.innerHTML = `
      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
      </svg>
    `;
  }
}

customElements.define('custom-breadcrumb', CustomBreadcrumb);
customElements.define('breadcrumb-list', BreadcrumbList);
customElements.define('breadcrumb-item', BreadcrumbItem);
customElements.define('breadcrumb-link', BreadcrumbLink);
customElements.define('breadcrumb-page', BreadcrumbPage);
customElements.define('breadcrumb-separator', BreadcrumbSeparator);