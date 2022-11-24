import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";

import { Register } from "../../screens/Register";
import theme from "../../global/styles/theme";

// mockando(simulando) a animação nativa do react-native para não receber um warn nos testes
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

function providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

describe('Register Screen', () => {

    it('Should be open category modal when user click on the CategorySelectButton', async () => {

        const { getByTestId } = render(<Register />, { wrapper: providers });

        const modalCategory = getByTestId('modal-category');
        const buttonCategory = getByTestId('button-category');
        
        fireEvent.press(buttonCategory);

        console.log(modalCategory.props)

        await waitFor(() => {
            expect(modalCategory.props.visible).toBeTruthy();
        })

    })

})