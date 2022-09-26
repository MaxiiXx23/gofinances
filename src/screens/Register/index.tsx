import React, { useState } from 'react';
import { 
    Modal, 
    TouchableWithoutFeedback, 
    Keyboard,
    Alert
} from 'react-native';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { InputForm } from '../../components/Form/InputForm';
import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';

import { CategorySelect } from '../CategorySelect';

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes
} from './styles';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';


interface FormData {
    name: string;
    amount: number;
}

const schema = yup.object().shape({
    name: yup.
    string()
    .required("Nome é obrigatório."),
    amount: yup
    .number()
    .typeError("Informe um valor númerico.")
    .positive("O valor não pode ser negativo.")
    .required("O valor é obrigatório")
})

export function Register() {
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    function handleRegister(form: Partial<FormData>) {
        if(!transactionType){
            return Alert.alert("Selecione o tipo da transação");
        }
        if(category.key === 'category'){
            return Alert.alert("Selecione uma categoria");
        }

        const data = {
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key
        }

        console.log(data)

    }

    function handleTransactionTypeSelect(type: 'up' | 'down') {
        setTransactionType(type);
    }

    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true);
    }

    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false);
    }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container >
                <Header>
                    <Title>Cadastro</Title>
                </Header>
                <Form>
                    <Fields>
                        <InputForm
                            name="name"
                            control={control}
                            placeholder='nome'
                            autoCapitalize='sentences'
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />
                        <InputForm
                            name="amount"
                            control={control}
                            placeholder='Preço'
                            keyboardType='numeric'
                            error={errors.amount && errors.amount.message}
                        />
                        <TransactionTypes>
                            <TransactionTypeButton
                                type='up'
                                title='Income'
                                onPress={() => handleTransactionTypeSelect('up')}
                                isActive={transactionType === 'up'}
                            />
                            <TransactionTypeButton
                                type='down'
                                title='Outcome'
                                onPress={() => handleTransactionTypeSelect('down')}
                                isActive={transactionType === 'down'}
                            />
                        </TransactionTypes>
                        <CategorySelectButton
                            title={category.name}
                            onPress={handleOpenSelectCategoryModal}
                        />
                    </Fields>
                    <Button
                        title='Enviar'
                        onPress={handleSubmit(handleRegister)}
                    />
                </Form>
                <Modal visible={categoryModalOpen}>
                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseSelectCategoryModal}
                    />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>

    );
}