import React from "react";

import { render } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import 'jest-styled-components';

import { HistoryCard } from '../../components/HistoryCard'
import theme from "../../global/styles/theme";

function providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

describe('HistoryCard Component', () => {

    it('Check if will render HistoryCard', async () => {

        const { getByText } = render(
        <HistoryCard 
            title="Compras"
            color="#5636D3"
            amount="R$300,00"
        />,
        { wrapper: providers})

        const textTitle = getByText('Compras');

        expect(textTitle).toBeTruthy();

    })

})