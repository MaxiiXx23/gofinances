import React from "react";

import { render } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import 'jest-styled-components';

import { TransactionCard } from "../../components/TransactionCard";
import theme from "../../global/styles/theme";

// jest.mock('../../assets/apple-icon.svg', () => 'AppleIcon');

function providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

enum ItemType {
    POSITIVE = 'positive',
    NEGATIVE = 'negative',
  }

const dataCard = {
    type: ItemType.NEGATIVE,
    name: 'Livros',
    amount: 'R$300,00',
    category: 'studies',
    date: '12/10/22'
}

describe('TransactionCard', () => {

    it('Check if will render TransactionCard.', () => {

        const { getByText } = render(
            <TransactionCard
                data={dataCard}
            />,
            {
                wrapper: providers
            }
        )

        const categoryName = getByText('Estudos');

        expect(categoryName).toBeTruthy();

    })

})