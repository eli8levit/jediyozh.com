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

  setTimeout(() => {
    document.body.style.transition = '';
  }, 1000);
});

!(function() {
  let e, t;
  function n(e) {
    return !(0 !== e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey);
  }
  document.addEventListener('mousedown', n => {
    (e = (function e(t) {
      return 'A' === t.tagName ||
        'BUTTON' === t.tagName ||
        ('INPUT' === t.tagName && 'submit' === t.type)
        ? t
        : t.parentElement
        ? e(t.parentElement)
        : null;
    })(n.target)),
      (t = Date.now());
  }),
    document.addEventListener('focusin', n => {
      n.target === e && Date.now() - t < 999 && n.target.blur();
    });
})();
