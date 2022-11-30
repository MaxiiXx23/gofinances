import React from "react";

import { render } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import 'jest-styled-components';

import { LoadingIndicator } from "../../components/LoadingIndicator";
import theme from "../../global/styles/theme";


function providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}


describe('LoadingIndicator', () => {

    it('Check if will render component LoadingIndicate', async () => {

        const { getByTestId } = render(<LoadingIndicator />, { wrapper: providers});

        const loadingIndicator = getByTestId('container-loading');

        expect(loadingIndicator).toBeTruthy();

    })

})
