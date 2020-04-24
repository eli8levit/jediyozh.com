const toggle = document.querySelector('.theme-toggler');
const root = document.documentElement;
const transition = root.style.getPropertyValue('--theme-color-transition');

const setDark = () => document.body.classList.remove('light');
const setLight = () => document.body.classList.add('light');

root.style.setProperty('--theme-color-transition', 'none');

toggle.addEventListener('click', function (e) {
  e.preventDefault();

  if (document.body.classList.contains('light')) {
    setDark();
    sessionStorage.setItem('theme', 'dark');
  } else {
    setLight();
    sessionStorage.setItem('theme', 'light');
  }
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
  }, 1000);
}

if (window.matchMedia) {
  const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  calculateNextTheme();
  colorSchemeQuery.addListener(calculateNextTheme);
}

let lastDown, lastDownAt;

document.addEventListener('mousedown', (e) => {
  lastDown = e.target;
  lastDownAt = Date.now();
});

document.addEventListener('focusin', (e) => {
  if (e.target === lastDown && Date.now() - lastDownAt < 999) {
    e.target.blur();
  }
});
