import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import {
  Container,
  Category,
  Icon
}
  from './styles';

interface Props extends RectButtonProps {
  title: string;
  onPress: () => void;
}

export function CategorySelectButton({ title, onPress, testID, ...rest }: Props) {
  return (
    <Container
      testID={testID}
      onPress={onPress}
      {...rest}
    >
      <Category>
        {title}
      </Category>
      <Icon name="chevron-down" />
    </Container>
  );
}