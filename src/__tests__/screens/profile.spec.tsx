import React from "react";
import { render} from '@testing-library/react-native';

import { Profile } from "../../screens/Profile";

// o Describe tem a função de um Suite de Testes

describe('Profile Screen', () => {
    
    it('Should to be able have placeholder correctly in input user name.', () => {
        // ao desestruturar a método render, podemos usar funções para capturar elementos específicos da tela/componente;
    
        const { getByPlaceholderText } = render(<Profile />);
        
        const inputName = getByPlaceholderText('Name');
        
        expect(inputName).toBeTruthy()
    
    });
    
    it('Should to be able load user data', () => {
    
        const { getByTestId } = render(<Profile />);
    
        const inputName = getByTestId('input-name');
        const inputLastname = getByTestId('input-lastname');
    
        expect(inputName.props.value).toEqual('Max');
        expect(inputLastname.props.value).toEqual('Jonatas');
    
    });
    
    it('Should exist title correctly.', () => {
        const { getByTestId } = render(<Profile />);
    
        const textTitle = getByTestId('text-title');
    
        // console.log(textTitle.props)
    
        expect(textTitle.props.children).toContain('Perfil');
    
    });

})