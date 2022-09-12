import 'styled-components';
import theme from './theme';

// modificando/sobreescrevendo/acrestando as minhas tipagens no defaultTheme
declare module 'styled-components' {
    // o typeof copia toda a tipagem;
    type ThemeType = typeof theme;

    export interface DefaultTheme extends ThemeType {}

}

