import React from "react";
import { render, act, fireEvent, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from "styled-components/native";

import { SignIn } from "../../screens/SignIn";
import theme from "../../global/styles/theme";

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('../../assets/apple-icon.svg', () => 'AppleIcon');
jest.mock('../../assets/google-icon.svg', () => 'GoogleIcon');
jest.mock('../../assets/logo.svg', () => 'Logo');

function providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

describe('SignIn', () => {

    it('Check if will render SignIn', async () => {

        const { getByTestId } = render(<SignIn />, { wrapper: providers})

        const containerSignIn = getByTestId('signIn-screen');

        expect(containerSignIn).toBeTruthy();

    });

    // it('Check if will render ActivityIndicator on click SignInSocialButton', async () => {

    //     const { getByTestId, debug } = render(<SignIn />, { wrapper: providers})

    //     const buttonSignInGoogle = getByTestId('signInSocialButton-Google');
        

    //     fireEvent.press(buttonSignInGoogle)

    //     await waitFor(() => {

    //         const activityIndicator = getByTestId('activityIndicator');

    //         expect(activityIndicator).toBeTruthy();
    //     })

        

    // });

})