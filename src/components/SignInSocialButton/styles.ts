import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.TouchableOpacity.attrs({
    activeOpacity: 0.7,
})`
    height: ${RFValue(56)}px;
    background-color: ${({theme}) => theme.colors.shape};
    border-radius: 5px;
    align-items: center;
    flex-direction: row;
    margin-bottom: 16px;
`;

export const ImagemContainer = styled.View`
    height: 100%;
    justify-content: center;
    align-items: center;
    padding: ${RFValue(16)}px;
`;

export const TextBtn = styled.Text`
    flex: 1;
    text-align: center;
    font-family: ${({theme}) => theme.fonts.medium};
    font-size: ${RFValue(14)}px;;
`;