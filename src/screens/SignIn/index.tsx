import React from 'react';

import { RFValue } from 'react-native-responsive-fontsize';

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

export function SignIn() {
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
                    />
                    <SignInSocialButton 
                        title='Entrar com Apple'
                        svg={AppIcon}
                    />
                </FooterWrapper>
            </Footer>
        </Container>
    );
}