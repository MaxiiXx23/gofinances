import React from 'react';
import { Container, Loading } from './styles';

export function LoadingIndicator() {

  return (
    <Container testID='container-loading' >
        <Loading />
    </Container>
  );
}