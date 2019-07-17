import {createGlobalStyle} from 'styled-components';

import fonts from './fonts/index.css';

export default createGlobalStyle`
    @import url(${fonts});

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: none;
        box-shadow: none;
    }

    body {
        font-family: Open-Sans, arial;
    }
`;
