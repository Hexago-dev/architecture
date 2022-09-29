window.addEventListener('load', () => {
    let themeSelector = document.getElementById('theme-selector');
    var defaultTheme = localStorage.getItem('theme') || 'default';
    document.documentElement.setAttribute('theme', defaultTheme);
    themeSelector.value = defaultTheme;

    themeSelector.addEventListener('change', function(event) {

        let selectedTheme = event.target.value;
        document.documentElement.setAttribute('theme', selectedTheme);
        localStorage.setItem('theme', selectedTheme);
    });
});