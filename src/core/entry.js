import 'react-hot-loader';

import React from 'react';
import ReactDOM from 'react-dom';

import {ThemeProvider} from 'styled-components';

import App from 'screens/App';

import theme from 'theme';

import {loadCatalog} from 'localization';

import {setupI18n} from '@lingui/core';
import {I18nProvider} from '@lingui/react';

(async () => {
    const language = 'ru';
    const catalog = await loadCatalog(language);

    const i18n = setupI18n();

    i18n.load(language, catalog);
    i18n.activate(language);

    const dest = document.getElementById('content');

    setTimeout(() => {
        const component = (
            <ThemeProvider theme={theme}>
                <I18nProvider i18n={i18n}>
                    <App />
                </I18nProvider>
            </ThemeProvider>
        );

        ReactDOM.render(component, dest);
    }, 5000);
})();

if (process.env.NODE_ENV !== 'production') {
    window.React = React; // enable debugger
}
