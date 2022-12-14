import styled from "styled-components/native";
import {Platform, FlatList, FlatListProps, View} from "react-native"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {Feather} from "@expo/vector-icons"
import {getBottomSpace, getStatusBarHeight} from "react-native-iphone-x-helper"

import { DataListProps } from ".";


export const Container = styled(View)`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
    width: 100%;
    height: ${RFPercentage(42)}px;
    background-color: ${({ theme }) => theme.colors.primary};
    align-items: center;
`;

export const UserWrapper = styled.View`
    width: 100%;
    padding: 0 24px;
    margin-top: ${Platform.OS === 'ios' ? getStatusBarHeight() + RFValue(28) : RFValue(28)}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 8px;
`;
export const Photo = styled.Image`
    width: ${RFValue(48)}px;
    height: ${RFValue(48)}px;
    border-radius: 2px;
`;
export const User = styled.View`
    margin-left: 17px;

`;
export const UserGretting = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
`;
export const UserName = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.bold};
`;

export const ButtonPower = styled.TouchableOpacity`
    
`;

export const Icon = styled(Feather)`
    color: ${({theme}) => theme.colors.secondary};
    font-size: ${RFValue(24)}px ;
`;
// com o attrs eu acesso as propriedaded do component(ScrollView) pelo styled
export const HighlightCards = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator:false,
    contentContainerStyle: {paddingHorizontal:24}
})`
    width: 100%;
    position: absolute;
    margin-top: ${RFPercentage(20)}px;
`;

export const Transactions = styled.View`
    flex: 1%;
    padding: 0 24px;
    margin-top: ${RFPercentage(12)}px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
`;


export const TransactionList = styled(
    // aqui estou fazendo uma tipagem personalizada para o FlatList
        FlatList as new (props: FlatListProps<DataListProps>) => FlatList<DataListProps>
    ).attrs({
    showsVerticalScrollIndicator: false,
})`
    padding-bottom: ${Platform.OS === 'ios' ? getBottomSpace() : 0}px;
`;

export const LoadContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;