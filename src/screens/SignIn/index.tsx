import React, { useState } from 'react';
import { ActivityIndicator, Alert, Platform } from 'react-native';


import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import { SignInSocialButton } from '../../components/SignInSocialButton';

import AppIcon from "../../assets/apple-icon.svg";
import GoogleIcon from "../../assets/google-icon.svg";
import Logo from "../../assets/logo.svg";


import {
    Container,
    Header,
    TitleWrapper,
    Title,
    SingInTitle,
    Footer,
    FooterWrapper
} from './styles';
import { useAuth } from '../../hooks/auth';

export function SignIn() {
    const { signInWhithGoogle, singInWhithApple } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const theme = useTheme();

    async function handleSignInWithGoogle() {
        try {
            setIsLoading(true);
            await signInWhithGoogle();

        } catch (error) {
            const { message } = error as Error;
            console.log(message)
            Alert.alert("Não foi possível solicitar a conta do Google.");
            setIsLoading(false);
        }
    }

    async function handleSignInWithApple() {
        try {
            setIsLoading(true);
            return await singInWhithApple();

        } catch (error) {
            const { message } = error as Error;
            console.log(message)
            Alert.alert("Não foi possível solicitar a conta da Apple.");
            setIsLoading(false);
        }
    }


    return (
        <Container>
            <Header>
                <TitleWrapper>
                    <Logo
                        width={RFValue(120)}
                        height={RFValue(68)}
                    />
                    <Title>
                        Controle suas {'\n'}
                        finanças de forma {'\n'}
                        muito simples
                    </Title>
                </TitleWrapper>
                <SingInTitle>
                    Faça seu login com {'\n'}
                    uma das contas abaixo
                </SingInTitle>

            </Header>
            <Footer>
                <FooterWrapper>
                    <SignInSocialButton
                        title='Entrar com Google'
                        svg={GoogleIcon}
                        onPress={handleSignInWithGoogle}
                    />
                    {
                        Platform.OS === 'ios' &&
                        <SignInSocialButton
                            title='Entrar com Apple'
                            svg={AppIcon}
                            onPress={handleSignInWithApple}
                        />
                    }
                </FooterWrapper>
                {
                    isLoading &&
                    <ActivityIndicator
                        color={theme.colors.shape}
                        style={{
                            marginTop: 18
                        }}

                    />
                }
            </Footer>
        </Container>
    );
}