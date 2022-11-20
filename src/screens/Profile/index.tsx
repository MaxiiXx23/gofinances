import React from 'react';
import {
    View,
    Text,
    TextInput,
    Button
} from "react-native"

import { Container } from './styles';

export function Profile() {
  return (
    <View>
        <Text testID='text-title' >Perfil</Text>

        <TextInput
            testID='input-name' 
            placeholder='Name'
            autoCorrect={false}
            value="Max"
        />

        <TextInput
            testID='input-lastname' 
            placeholder='Lastname'
            autoCorrect={false}
            value="Jonatas"
        />

        <Button 
            title='Salvar'
            onPress={() => {}}
        />
    </View>
  );
}