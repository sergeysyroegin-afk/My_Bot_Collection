window.onload = function() {
  Telegram.WebApp.ready();
  //console.log(Telegram.WebApp.initDataUnsafe);  // Для отладки
  //console.log(Telegram.WebApp.version);
};
// script.js

/**
 * Автоматическое определение языка при первом заходе
 */
function detectLanguage() {
  const savedLang = localStorage.getItem('preferredLanguage');
  if (savedLang) {
    // Если язык уже выбирался — ничего не делаем
    return;
  }

  const userLang = navigator.language.toLowerCase();
  const russianLangs = ['ru', 'be', 'uk'];

  // Если язык — русский, белорусский или украинский — оставаться на русской версии
  if (russianLangs.some(lang => userLang.startsWith(lang))) {
    // Текущая страница — уже русская
  } else {
    // Перейти на английскую версию
    if (!window.location.href.includes('index_en.html')) {
      localStorage.setItem('preferredLanguage', 'en');
      window.location.replace('index_en.html');
    }
  }
}

/**
 * Инициализация переключателя языка
 */
function initLanguageSelector() {
  const languageSelect = document.getElementById('language');
  if (!languageSelect) return;

  // Устанавливаем выбранный язык в селекте
  languageSelect.value = window.location.pathname.endsWith('index_en.html') ? 'index_en.html' : 'index.html';

  // Обработчик изменения
  languageSelect.addEventListener('change', function () {
    const selected = this.value;
    localStorage.setItem('preferredLanguage', selected.includes('en') ? 'en' : 'ru');
    window.location.href = selected;
  });
}

/**
 * Инициализация переключателя темы
 */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  const body = document.body;
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Устанавливаем тему
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    body.classList.add('dark-theme');
    themeToggleBtn.textContent = 'Светлая тема';
  } else {
    themeToggleBtn.textContent = 'Тёмная тема';
  }

  // Переключение темы
  themeToggleBtn.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
      body.classList.remove('dark-theme');
      themeToggleBtn.textContent = 'Тёмная тема';
      localStorage.setItem('theme', 'light');
    } else {
      body.classList.add('dark-theme');
      themeToggleBtn.textContent = 'Светлая тема';
      localStorage.setItem('theme', 'dark');
    }
  });
}

/**
 * Инициализация анимаций появления при прокрутке
 */
function initAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  const profile = document.getElementById('profile');
  const botItems = document.querySelectorAll('.bot-item');

  if (profile) observer.observe(profile);
  botItems.forEach((item) => observer.observe(item));
}

/**
 * Запуск всех функций при загрузке страницы
 */
document.addEventListener('DOMContentLoaded', () => {
  detectLanguage();
  initLanguageSelector();
  initThemeToggle();
  initAnimations();
});
