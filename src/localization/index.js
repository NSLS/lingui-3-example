const loadCatalog = code => {
    switch (code) {
        case 'ru':
            return import('./languages/ru.js');

        case 'en':
            return import('./languages/en.js');

        default:
            return null;
    }
};

export {loadCatalog};
