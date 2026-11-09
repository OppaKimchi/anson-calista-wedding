// ─── Translations ───
// Each key maps to { en: "English text", km: "Khmer text" }
// Keys match data-i18n attributes in the HTML.
// Replace [KM] placeholders with real Khmer translations.

const translations = {
    "seating-section-title": { en: "Guest Search", km: "ស្វែងរកភ្ញៀវ" },
    "seating-section-desc": { en: "Type your first or last name below to find your table.", km: "សូមវាយឈ្មោះរបស់អ្នកខាងក្រោមដើម្បីស្វែងរកតុ។" },
    "seating-search-label": { en: "Search guest name", km: "ស្វែងរកឈ្មោះភ្ញៀវ" },
    "seating-search-placeholder": { en: "Enter your name...", km: "វាយឈ្មោះរបស់អ្នក..." },
    "seating-search-hint": { en: "Use at least two letters for the best result.", km: "សូមវាយយ៉ាងតិច ២ អក្សរ។" },
    "seating-empty": { en: "Start typing to reveal your table assignment.", km: "សូមចាប់ផ្ដើមវាយដើម្បីមើលតុរបស់អ្នក។" },
    "seating-no-result": { en: "No guest found. Please try searching a different name.", km: "រកមិនឃើញភ្ញៀវ។ សូមសាកល្បងឈ្មោះផ្សេង។" },
    "seating-guests-label": { en: "Guests at this table:", km: "ភ្ញៀវនៅតុនេះ:" },
};


// ─── Language Engine ───

function getLanguage() {
    return localStorage.getItem('lang') || 'en';
}

function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    applyLanguage(lang);
}

function applyLanguage(lang) {
    // Set lang attribute on <html>
    document.documentElement.lang = lang === 'km' ? 'km' : 'en';

    // Translate all [data-i18n] elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const entry = translations[key];
        if (!entry) return;

        const text = entry[lang] || entry['en'];

        // Check if element uses innerHTML (has data-i18n-html attribute)
        if (el.hasAttribute('data-i18n-html')) {
            el.innerHTML = text;
        } else {
            el.textContent = text;
        }
    });

    // Translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const entry = translations[key];
        if (!entry) return;
        el.placeholder = entry[lang] || entry['en'];
    });

    // Update toggle button
    const btn = document.getElementById('lang-toggle');
    if (btn) {
        if (lang === 'km') {
            btn.innerHTML = '🇬🇧 <span>English</span>';
            btn.setAttribute('aria-label', 'Switch to English');
        } else {
            btn.innerHTML = '🇰🇭 <span>ខ្មែរ</span>';
            btn.setAttribute('aria-label', 'Switch to Khmer');
        }
    }
}

function toggleLanguage() {
    const current = getLanguage();
    setLanguage(current === 'en' ? 'km' : 'en');
}


// ─── Create Toggle Button ───

function createToggleButton() {
    const btn = document.createElement('button');
    btn.id = 'lang-toggle';
    btn.className = 'lang-toggle';
    btn.type = 'button';
    btn.addEventListener('click', toggleLanguage);
    document.body.appendChild(btn);
}


// ─── Init ───

document.addEventListener('DOMContentLoaded', () => {
    createToggleButton();
    applyLanguage(getLanguage());
});
