const toggle = document.querySelector('.theme-toggler');

if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light');
}

toggle.addEventListener('click', function(e) {
  e.preventDefault();

  document.body.style.transition = 'background-color 0.7s ease-in-out';

  if (document.body.classList.contains('light')) {
    document.body.classList.remove('light');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.add('light');
    localStorage.setItem('theme', 'light');
  }
});

let lastDown, lastDownAt;

document.addEventListener('mousedown', e => {
  lastDown = e.target;
  lastDownAt = Date.now();
});

document.addEventListener('focusin', e => {
  if (e.target === lastDown && Date.now() - lastDownAt < 999) {
    e.target.blur();
  }
});
