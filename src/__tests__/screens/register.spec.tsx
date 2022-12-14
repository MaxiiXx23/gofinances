import React from "react";
import { Alert } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";

import { render, fireEvent, waitFor, act, screen } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";

import { Register } from "../../screens/Register";
import { AppRoutes } from "../../routes/app.routes";
import theme from "../../global/styles/theme";

// mockando(simulando) a animação nativa do react-native para não receber um warn nos testes
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');


function providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider theme={theme}>
            <NavigationContainer>
                {children}
            </NavigationContainer>
        </ThemeProvider>
    )
}

beforeEach(() => {
    jest.clearAllMocks()
})

describe('Register Screen', () => {

    it('Should be able open category modal when user click on the CategorySelectButton', async () => {

        const { getByTestId } = render(<Register />, { wrapper: providers });

        const modalCategory = getByTestId('modal-category');
        const buttonCategory = getByTestId('button-category');

        fireEvent.press(buttonCategory);


        await waitFor(() => {
            expect(modalCategory.props.visible).toBeTruthy();
        })

    });

    it('Should be able close category modal when user click on the buttonSelect ', async () => {

        const { getByTestId } = render(<Register />, { wrapper: providers });

        const modalCategory = getByTestId('modal-category');
        const buttonCategory = getByTestId('button-category');

        fireEvent.press(buttonCategory);

        const buttonSelect = getByTestId('button-selectCategory');
        fireEvent.press(buttonSelect);

        await waitFor(() => {
            expect(modalCategory.props.visible).not.toBeTruthy();
        })

    })

    it('Should be able change TransactionTypeButtonUp', async () => {

        const { getByTestId } = render(<Register />, { wrapper: providers });

        const transactionTypeButtonUp = getByTestId('transactionTypeButton-up');

        fireEvent.press(transactionTypeButtonUp);

        await waitFor(() => {
            //console.log(transactionTypeButtonUp.props.style)
            expect(transactionTypeButtonUp.props.style.backgroundColor)
                .toEqual('rgba(18, 164, 84, 0.5)');
        })

    });

    it('Should be able change TransactionTypeButtonDown', async () => {

        const { getByTestId } = render(<Register />, { wrapper: providers });

        const transactionTypeButtonDown = getByTestId('transactionTypeButton-down');

        fireEvent.press(transactionTypeButtonDown);

        await waitFor(() => {
            //console.log(transactionTypeButtonUp.props.style)
            expect(transactionTypeButtonDown.props.style.backgroundColor)
                .toEqual('rgba(232, 63, 91, 0.5)');
        });

    });

    it('Check if will show the alert when to call handleRegister without transactionType', async () => {
        jest.spyOn(Alert, 'alert');

        const { getByTestId } = render(<Register />, { wrapper: providers });

        const inputName = getByTestId('input-name');
        const inputAmount = getByTestId('input-amount');
        const buttonSubmit = getByTestId('button-submit');


        await act(() => {
            fireEvent.changeText(inputName, 'lanche');
            fireEvent.changeText(inputAmount, '18.90');
            fireEvent.press(buttonSubmit)
        })

        expect(Alert.alert).toBeCalledWith('Selecione o tipo da transação')

    });

    it('Check if will show the alert when to call handleRegister without category selected', async () => {
        jest.spyOn(Alert, 'alert');

        const { getByTestId } = render(<Register />, { wrapper: providers });

        const inputName = getByTestId('input-name');
        const inputAmount = getByTestId('input-amount');
        const buttonSubmit = getByTestId('button-submit');
        const transactionTypeButtonDown = getByTestId('transactionTypeButton-down');

        fireEvent.changeText(inputName, 'coca-cola');
        fireEvent.changeText(inputAmount, '7.99');
        fireEvent.press(transactionTypeButtonDown);

        await act(() => {

            fireEvent.press(buttonSubmit);
        })

        expect(Alert.alert).toBeCalledWith('Selecione uma categoria')

    });

    // teste de navegação ainda não funciona como esperado

    // it('Should be able navigate to screen Listagem after to register', async () => {

    //     const mockedNavigate = jest.fn();

    //     jest.mock('@react-navigation/native', () => (
    //         { useNavigation: () => ({ navigate: mockedNavigate }) }));

    //     const { getByTestId, getByText } = render(<Register />, { wrapper: providers });

    //     const inputName = getByTestId('input-name');
    //     const inputAmount = getByTestId('input-amount');
    //     const buttonSubmit = getByTestId('button-submit');
    //     const transactionTypeButtonDown = getByTestId('transactionTypeButton-down');
    //     const buttonCategory = getByTestId('button-category');

    //     fireEvent.changeText(inputName, 'coca-cola');
    //     fireEvent.changeText(inputAmount, '7.99');
    //     fireEvent.press(transactionTypeButtonDown);
    //     fireEvent.press(buttonCategory);

    //     const category = getByText('Alimentação');

    //     await act(() => {
    //         fireEvent.press(category);
    //         fireEvent.press(buttonSubmit);
    //     })

    //     expect(mockedNavigate).toBeCalled()

    // });

})