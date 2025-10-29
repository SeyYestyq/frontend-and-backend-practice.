(function(){
  const KEY = 'site-theme';
  const root = document.documentElement; // <html>
  const btn = document.getElementById('themeSwitch');

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.classList.add('theme--dark');
    } else {
      root.classList.remove('theme--dark');
    }
  }

  const saved = localStorage.getItem(KEY) || 'light';
  applyTheme(saved);

  if (btn) {
    btn.addEventListener('click', () => {
      const current = root.classList.contains('theme--dark') ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem(KEY, next);
    });
  }
})();
