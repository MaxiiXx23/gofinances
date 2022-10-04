import React from 'react';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { NavigationContainer } from '@react-navigation/native';
import {ThemeProvider} from "styled-components";


import theme from './src/global/styles/theme';
import { LoadingIndicator } from "./src/components/LoadingIndicator";

import { AppRoutes } from "./src/routes/app.routes";


import {
  useFonts, 
  Poppins_400Regular, 
  Poppins_500Medium, 
  Poppins_700Bold
} from "@expo-google-fonts/poppins";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })

  if(!fontsLoaded) {
    return <LoadingIndicator />
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
          <AppRoutes />
      </NavigationContainer>
    </ThemeProvider>
  );
}
