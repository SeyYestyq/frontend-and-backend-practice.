
(function() {
    const THEME_KEY = 'site-theme';
    const themeBtn = document.getElementById('themeSwitch');

    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
            if (themeBtn) {
                themeBtn.innerHTML = '<i class="bi bi-moon-fill"></i>';
            }
        } else {
            document.body.classList.remove('dark-theme');
            if (themeBtn) {
                themeBtn.innerHTML = '<i class="bi bi-sun-fill"></i>';
            }
        }
    }
    

    applyTheme(savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', function() {
            const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            applyTheme(newTheme);
            localStorage.setItem(THEME_KEY, newTheme);
        });
    }
})();
