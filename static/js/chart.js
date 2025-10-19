// Поскольку оригинал использует Recharts, адаптируем к Chart.js через CDN
// Подключите <script src="https://cdn.jsdelivr.net/npm/chart.js"></script> в admin_base.html

class ChartContainer extends HTMLElement {
  constructor() {
    super();
    this.classList.add('aspect-video', 'justify-center', 'text-xs', '[&_.recharts-dot[stroke="#fff"]]:stroke-transparent', '[&_.recharts-layer]:outline-hidden', '[&_.recharts-sector]:outline-hidden', '[&_.recharts-sector[stroke="#fff"]]:stroke-transparent', '[&_.recharts-surface]:outline-hidden');
    if (this.getAttribute('class')) {
      this.classList.add(...this.getAttribute('class').split(' '));
    }
  }
}

// Для ChartTooltip, ChartLegend и т.д. используйте встроенные опции Chart.js в скриптах шаблонов

customElements.define('chart-container', ChartContainer);