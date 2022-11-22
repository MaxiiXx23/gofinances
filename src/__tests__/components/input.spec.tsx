import React from "react";
import { render } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import theme from "../../global/styles/theme";

import 'jest-styled-components'

import { Input } from "../../components/Form/Input";

function providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

describe('Input Component', () => {
    it('Must have specific border color when active', () => {
        const { getByTestId } = render(
            <Input
                testID="input-email"
                placeholder="E-mail"
                keyboardType="email-address"
                autoCorrect={false}
                active={true}
            />,
            {
                wrapper: providers
            }
        );

        const inputComponent = getByTestId('input-email');

        expect(inputComponent.props.style[0].borderColor)
            .toEqual(theme.colors.attention)

    })
})