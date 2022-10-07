import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { SvgProps } from 'react-native-svg';

import {
    Container,
    ImagemContainer,
    TextBtn
} from './styles';

interface Props extends TouchableOpacityProps {
    title: string;
    svg: React.FC<SvgProps>
}

export function SignInSocialButton({ title, svg: Svg }: Props) {
    return (
        <Container>
            <ImagemContainer>
                <Svg />
            </ImagemContainer>
            <TextBtn>
                {title}
            </TextBtn>
        </Container>
  );
}