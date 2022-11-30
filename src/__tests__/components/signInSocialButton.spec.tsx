import React from "react";

import { render } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import 'jest-styled-components';

import { SignInSocialButton } from "../../components/SignInSocialButton";
import theme from "../../global/styles/theme";
import AppleIcon from '../../assets/apple-icon.svg';

jest.mock('../../assets/apple-icon.svg', () => 'AppleIcon');

function providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

describe('SignInSocialButton', () => {

    it('Check if will render component SignInSocialButton', () => {

        const { getByTestId } = render(
            <SignInSocialButton
                testID="signInSocialButton-component" 
                title="Sign In with Apple"
                svg={AppleIcon}
            />, 
            { wrapper: providers}
        );
        
        const signInSocialButton = getByTestId('signInSocialButton-component');
        
        expect(signInSocialButton).toBeTruthy();

    })

})