import React from "react";
import { Controller, Control } from "react-hook-form";
import { TextInputProps } from "react-native";

import { Container, Error } from "./styles";
import { Input } from "../Input";

interface Props extends TextInputProps {
    control: Control;
    name: string;
    error: any;
}

// Input controlado com react-hook-form

export function InputForm({
    control,
    name,
    error,
    ...rest
}: Props) {
    return (
        <Container>
            <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Input
                        onChangeText={onChange}
                        value={value}
                        {...rest}
                    />
                )}
                name={name}
            />
            {error && <Error>{error}</Error>}
        </Container>
    )
}