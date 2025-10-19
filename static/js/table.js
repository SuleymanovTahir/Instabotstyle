// static/js/table.js - ПОЛНОСТЬЮ ЗАМЕНИТЬ
class CustomTable extends HTMLElement {
  connectedCallback() {
    const wrapper = document.createElement('div');
    wrapper.className = 'relative w-full overflow-x-auto';
    
    const table = document.createElement('table');
    table.className = 'w-full caption-bottom text-sm';
    table.innerHTML = this.innerHTML;
    
    wrapper.appendChild(table);
    this.innerHTML = '';
    this.appendChild(wrapper);
  }
}

class TableHeader extends HTMLElement {
  connectedCallback() {
    const thead = document.createElement('thead');
    thead.className = 'border-b';
    thead.innerHTML = this.innerHTML;
    this.innerHTML = '';
    this.appendChild(thead);
  }
}

class TableBody extends HTMLElement {
  connectedCallback() {
    const tbody = document.createElement('tbody');
    tbody.className = '[&_tr:last-child]:border-0';
    tbody.innerHTML = this.innerHTML;
    this.innerHTML = '';
    this.appendChild(tbody);
  }
}

class TableRow extends HTMLElement {
  connectedCallback() {
    const tr = document.createElement('tr');
    tr.className = 'border-b transition-colors hover:bg-gray-50';
    tr.innerHTML = this.innerHTML;
    this.innerHTML = '';
    this.appendChild(tr);
  }
}

class TableHead extends HTMLElement {
  connectedCallback() {
    const th = document.createElement('th');
    th.className = 'h-10 px-2 text-left align-middle font-medium text-gray-900';
    th.innerHTML = this.innerHTML;
    this.innerHTML = '';
    this.appendChild(th);
  }
}

class TableCell extends HTMLElement {
  connectedCallback() {
    const td = document.createElement('td');
    td.className = 'p-2 align-middle';
    td.innerHTML = this.innerHTML;
    this.innerHTML = '';
    this.appendChild(td);
  }
}

customElements.define('custom-table', CustomTable);
customElements.define('table-header', TableHeader);
customElements.define('table-body', TableBody);
customElements.define('table-row', TableRow);
customElements.define('table-head', TableHead);
customElements.define('table-cell', TableCell);