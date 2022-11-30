import React from "react";

import { render } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import 'jest-styled-components';

import HighlightCards from "../../components/HighlightCard";
import theme from "../../global/styles/theme";

function providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

describe('Component HighlightCard', () => {

    it('Check if will render HighlightCard', async () => {

        const { getByTestId } = render(
            <HighlightCards
                type="down"
                title="Saídas"
                amount="R$ 589,90"
                lastTransaction="Última saída 12 de outubro"
            />,
            { wrapper: providers }
        );

        const textTitle = getByTestId('highlightCard-component');

        expect(textTitle).toBeTruthy();

    })

})