// static/js/tabs.js - ПОЛНОСТЬЮ ЗАМЕНИТЬ
class CustomTabs extends HTMLElement {
  connectedCallback() {
    const tabs = Array.from(this.querySelectorAll('[data-tab]'));
    const contents = Array.from(this.querySelectorAll('[data-tab-content]'));
    
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        // Убираем активность со всех
        tabs.forEach(t => t.classList.remove('bg-white', 'text-pink-600'));
        contents.forEach(c => c.classList.add('hidden'));
        
        // Добавляем активность текущему
        tab.classList.add('bg-white', 'text-pink-600');
        if (contents[index]) {
          contents[index].classList.remove('hidden');
        }
      });
    });
    
    // Активируем первый таб по умолчанию
    if (tabs[0]) {
      tabs[0].click();
    }
  }
}

customElements.define('custom-tabs', CustomTabs);