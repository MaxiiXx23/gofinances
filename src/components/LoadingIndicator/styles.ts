import styled from "styled-components/native";
import { View } from "react-native";
import theme from "../../global/styles/theme";

export const Container = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const Loading = styled.ActivityIndicator.attrs({
    size: "large",
    color: theme.colors.primary
})`
`; 