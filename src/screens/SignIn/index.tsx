import React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from 'react-native';


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
import { useAuth } from '../../hooks/auth';

export function SignIn() {
    const { signInWhithGoogle, singInWhithApple } = useAuth();

    async function handleSignInWithGoogle (){
        try{

            await signInWhithGoogle();

        }catch(error){
            const { message } = error as Error;
            console.log(message)
            Alert.alert("Não foi possível solicitar a conta do Google.");
        }
    }

    async function handleSignInWithApple (){
        try{

            await singInWhithApple();

        }catch(error){
            const { message } = error as Error;
            console.log(message)
            Alert.alert("Não foi possível solicitar a conta da Apple.");
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
                    <SignInSocialButton 
                        title='Entrar com Apple'
                        svg={AppIcon}
                        onPress={handleSignInWithApple}
                    />
                </FooterWrapper>
            </Footer>
        </Container>
    );
}