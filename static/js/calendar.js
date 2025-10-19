// Простая реализация календаря на vanilla JS, без react-day-picker

class Calendar extends HTMLElement {
  constructor() {
    super();
    this.date = new Date();
    this.render();
  }
  render() {
    const month = this.date.getMonth();
    const year = this.date.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    let html = '<div class="p-3">';
    html += '<div class="flex justify-between items-center mb-4">';
    html += '<button onclick="this.closest(\'custom-calendar\').prevMonth()"> < </button>';
    html += '<span>' + new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(this.date) + '</span>';
    html += '<button onclick="this.closest(\'custom-calendar\').nextMonth()"> > </button>';
    html += '</div>';
    html += '<div class="grid grid-cols-7 gap-1">';
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
      html += '<div class="text-center text-sm text-muted-foreground">' + day + '</div>';
    });
    for (let i = 0; i < firstDay; i++) {
      html += '<div></div>';
    }
    for (let d = 1; d <= daysInMonth; d++) {
      html += '<button class="size-8 flex items-center justify-center rounded-md hover:bg-accent">' + d + '</button>';
    }
    html += '</div></div>';
    this.innerHTML = html;
  }
  prevMonth() {
    this.date.setMonth(this.date.getMonth() - 1);
    this.render();
  }
  nextMonth() {
    this.date.setMonth(this.date.getMonth() + 1);
    this.render();
  }
}

customElements.define('custom-calendar', Calendar);