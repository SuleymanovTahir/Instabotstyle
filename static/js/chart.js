// static/js/chart.js - ПОЛНОСТЬЮ ЗАМЕНИТЬ
// Для графиков используем Chart.js через CDN
// Добавьте в HTML: <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

class ChartContainer extends HTMLElement {
  connectedCallback() {
    this.className = 'relative aspect-video w-full';
    
    // Создаем canvas для Chart.js
    const canvas = document.createElement('canvas');
    this.innerHTML = '';
    this.appendChild(canvas);
  }
}

customElements.define('chart-container', ChartContainer);

// Пример использования:
// <chart-container id="myChart"></chart-container>
// <script>
// const ctx = document.getElementById('myChart').querySelector('canvas');
// new Chart(ctx, {
//   type: 'line',
//   data: {...}
// });
// </script>