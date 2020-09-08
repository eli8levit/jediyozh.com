(function () {
  const root = document.documentElement;
  const transition = root.style.getPropertyValue('--theme-color-transition');

  root.style.setProperty('--theme-color-transition', 'none');

  const setDark = () => root.classList.remove('light');
  const setLight = () => root.classList.add('light');

  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.theme-toggler');
    toggle.addEventListener('click', function (e) {
      e.preventDefault();

      if (root.classList.contains('light')) {
        setDark();
        sessionStorage.setItem('theme', 'dark');
      } else {
        setLight();
        sessionStorage.setItem('theme', 'light');
      }
    });
  });

  function getPreferedColorScheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  function setTheme(theme) {
    switch (theme) {
      case 'dark':
        setDark();
        break;
      default:
        setLight();
    }
  }

  function calculateNextTheme() {
    const theme = sessionStorage.getItem('theme');
    if (theme !== null) {
      setTheme(theme);
    } else {
      setTheme(getPreferedColorScheme());
    }
    setTimeout(() => {
      root.style.setProperty('--theme-color-transition', transition);
    }, 100);
  }

  if (window.matchMedia) {
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    calculateNextTheme();
    colorSchemeQuery.addListener(calculateNextTheme);
  }

  let lastDown, lastDownAt;

  function clickableParent(element) {
    if (
      element.tagName === 'A' ||
      element.tagName === 'BUTTON' ||
      (element.tagName === 'INPUT' && element.type === 'submit')
    ) {
      return element;
    } else if (element.parentElement) {
      return clickableParent(element.parentElement);
    } else {
      return null;
    }
  }

  document.addEventListener('mousedown', (e) => {
    lastDown = clickableParent(e.target);
    lastDownAt = Date.now();
  });

  document.addEventListener('focusin', (e) => {
    if (e.target === lastDown && Date.now() - lastDownAt < 999) {
      e.target.blur();
    }
  });
})();
