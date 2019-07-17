import React from 'react';

import GlobalStyle from 'theme/globals';

import {hot} from 'react-hot-loader/root';

import {useLingui} from '@lingui/react';

import {t} from '@lingui/macro';

import {Content} from './styled';

function App() {
    // const {i18n} = useLingui();

    return (
        <>
            <GlobalStyle />

            <Content>{i18n._(t`hello_world`)}</Content>
        </>
    );
}

export default hot(App);
