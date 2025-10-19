// static/js/mobile-menu.js - НОВЫЙ ФАЙЛ
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const icon = document.getElementById('mobile-menu-icon');
  
  if (menu.classList.contains('hidden')) {
    menu.classList.remove('hidden');
    icon.setAttribute('d', 'M6 18L18 6M6 6l12 12'); // X icon
  } else {
    menu.classList.add('hidden');
    icon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16'); // Menu icon
  }
}