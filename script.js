// Language toggle
let currentLang = 'en';
document.getElementById('langToggle')
    .addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'pl' : 'en';
    document.getElementById('langToggle')
        .textContent = currentLang === 'en' ? 'PL' : 'EN';
    });

// Dark mode toggle
document.getElementById('darkModeToggle')
    .addEventListener('click', () => {
    document.body.classList.toggle('dark');
});
