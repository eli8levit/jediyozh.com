let toggle = document.querySelector('.theme-toggler');

if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light');
}

toggle.addEventListener('click', function(e) {
  e.preventDefault();

  if (document.body.classList.contains('light')) {
    document.body.classList.remove('light');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.add('light');
    localStorage.setItem('theme', 'light');
  }
});
