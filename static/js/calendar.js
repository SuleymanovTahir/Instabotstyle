// static/js/calendar.js - ПОЛНОСТЬЮ ЗАМЕНИТЬ
class CustomCalendar extends HTMLElement {
  constructor() {
    super();
    this.currentDate = new Date();
    this.selectedDate = null;
  }
  
  connectedCallback() {
    this.render();
  }
  
  render() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    const dayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    
    let html = `
      <div class="p-3 bg-white rounded-lg border">
        <div class="flex items-center justify-between mb-4">
          <button class="p-2 hover:bg-gray-100 rounded" data-action="prev">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <div class="font-semibold">${monthNames[month]} ${year}</div>
          <button class="p-2 hover:bg-gray-100 rounded" data-action="next">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
        <div class="grid grid-cols-7 gap-1 mb-2">
          ${dayNames.map(day => `<div class="text-center text-xs font-medium text-gray-500 py-2">${day}</div>`).join('')}
        </div>
        <div class="grid grid-cols-7 gap-1">
          ${Array(firstDay).fill(null).map(() => '<div class="aspect-square"></div>').join('')}
          ${Array.from({length: daysInMonth}, (_, i) => i + 1).map(day => `
            <button 
              class="aspect-square flex items-center justify-center rounded hover:bg-pink-100 text-sm ${this.isToday(year, month, day) ? 'bg-pink-600 text-white hover:bg-pink-700' : ''}"
              data-day="${day}"
            >
              ${day}
            </button>
          `).join('')}
        </div>
      </div>
    `;
    
    this.innerHTML = html;
    this.attachEventListeners();
  }
  
  attachEventListeners() {
    this.querySelector('[data-action="prev"]').addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      this.render();
    });
    
    this.querySelector('[data-action="next"]').addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.render();
    });
    
    this.querySelectorAll('[data-day]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const day = parseInt(e.target.getAttribute('data-day'));
        this.selectedDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);
        this.dispatchEvent(new CustomEvent('dateSelected', { detail: this.selectedDate }));
      });
    });
  }
  
  isToday(year, month, day) {
    const today = new Date();
    return today.getFullYear() === year && 
           today.getMonth() === month && 
           today.getDate() === day;
  }
}

customElements.define('custom-calendar', CustomCalendar);