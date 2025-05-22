// Language toggle
let currentLang = 'en';
document.getElementById('langToggle')
    .addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'pl' : 'en';
        document.getElementById('langToggle')
            .textContent = currentLang === 'en' ? 'EN' : 'PL';
        document.getElementById('search')
            .placeholder = currentLang === 'en' ? 'Search Products...' : 'Wyszukaj Produkty...';

    });

// Dark mode toggle
document.getElementById('darkModeToggle')
    .addEventListener('click', () => {
        document.body.classList.toggle('dark');

        const isDark = document.body.classList.contains('dark');
        document.getElementById('darkModeToggle').textContent = isDark ? '🌙' : '☀️';
    });

