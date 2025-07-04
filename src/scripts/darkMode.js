class DarkModeManager {
  constructor() {
    this.darkModeToggle = document.getElementById('darkModeToggle');
    this.toggleIcon = document.getElementById('toggleIcon');
    this.body = document.body;
    
    this.init();
    this.bindEvents();
  }
  
  init() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      this.enableDarkMode();
    } else {
      this.enableLightMode();
    }
  }
  
  bindEvents() {
    this.darkModeToggle.addEventListener('click', () => {
      this.toggle();
    });
    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        if (e.matches) {
          this.enableDarkMode();
        } else {
          this.enableLightMode();
        }
      }
    });
  }
  
  toggle() {
    if (this.body.classList.contains('dark')) {
      this.enableLightMode();
      localStorage.setItem('theme', 'light');
    } else {
      this.enableDarkMode();
      localStorage.setItem('theme', 'dark');
    }
  }
  
  enableDarkMode() {
    this.body.classList.add('dark');
    this.darkModeToggle.classList.add('active');
    this.toggleIcon.textContent = 'dark_mode';
  }
  
  enableLightMode() {
    this.body.classList.remove('dark');
    this.darkModeToggle.classList.remove('active');
    this.toggleIcon.textContent = 'light_mode';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new DarkModeManager();
});