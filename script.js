/**
 * script.js — Портфолио Сергея Вельского
 * Telegram Mini App: тема, язык, приветствие, открытие каналов
 */

// === 1. Приветствие по имени ===
function initWelcome() {
  const welcomeEl = document.getElementById('welcome');
  let firstName = 'Пользователь';

  if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
    firstName = Telegram.WebApp.initDataUnsafe.user.first_name;
  }

  welcomeEl.textContent = `Добро пожаловать, ${firstName}!`;
}

// === 2. Переключатель темы с иконками и haptics ===
function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  const body = document.body;

  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    body.classList.add('dark-theme');
    icon.textContent = '🌙';
  } else {
    icon.textContent = '☀️';
  }

  btn.addEventListener('click', () => {
    icon.style.transition = 'transform 0.3s ease';
    icon.style.transform = 'rotate(360deg)';
    setTimeout(() => icon.style.transform = 'rotate(0deg)', 300);

    if (window.Telegram?.WebApp?.HapticFeedback) {
      Telegram.WebApp.HapticFeedback.impactOccurred('light');
    }

    if (body.classList.contains('dark-theme')) {
      body.classList.remove('dark-theme');
      icon.textContent = '☀️';
      localStorage.setItem('theme', 'light');
    } else {
      body.classList.add('dark-theme');
      icon.textContent = '🌙';
      localStorage.setItem('theme', 'dark');
    }
  });
}

// === 3. Анимация аватара ===
function initAvatarAnimation() {
  const avatar = document.getElementById('avatar');
  if (!avatar) return;

  let isAnimated = false;

  avatar.addEventListener('click', () => {
    if (window.Telegram?.WebApp?.HapticFeedback) {
      Telegram.WebApp.HapticFeedback.impactOccurred('medium');
    }

    if (!isAnimated) {
      avatar.classList.remove('normal');
      avatar.classList.add('animate');
      console.log('🎉 Привет! Это Сергей. Спасибо, что доскроллил до конца!');
    } else {
      avatar.classList.remove('animate');
      avatar.classList.add('normal');
    }
    isAnimated = !isAnimated;
  });
}

// === 4. Открытие ссылок: в Telegram, если возможно, иначе — в браузере ===
function initTgLinks() {
  document.querySelectorAll('.tg-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const url = link.getAttribute('data-url');

      if (window.Telegram?.WebApp) {
        // Если в Telegram — открываем внутри приложения
        Telegram.WebApp.openTelegramLink(url);
      } else {
        // Если в браузере — открываем в новой вкладке
        window.open(url, '_blank');
      }
    });
  });
}

// === 5. Анимации появления ===
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.bot-item').forEach(item => observer.observe(item));
  const profile = document.getElementById('profile');
  if (profile) observer.observe(profile);
}

// === 6. Язык ===
function initLanguageSelector() {
  const select = document.getElementById('language');
  if (!select) return;

  select.value = window.location.pathname.endsWith('index_en.html') ? 'index_en.html' : 'index.html';

  select.addEventListener('change', () => {
    const selected = select.value;
    localStorage.setItem('preferredLanguage', selected.includes('en') ? 'en' : 'ru');
    window.location.href = selected;
  });
}

// === 7. Telegram WebApp ===
function initTelegram() {
  if (window.Telegram?.WebApp) {
    Telegram.WebApp.ready();
    Telegram.WebApp.expand();
  }
}

// === Запуск ===
document.addEventListener('DOMContentLoaded', () => {
  initTelegram();
  initWelcome();
  initThemeToggle();
  initAvatarAnimation();
  initTgLinks();
  initAnimations();
  initLanguageSelector();
});
