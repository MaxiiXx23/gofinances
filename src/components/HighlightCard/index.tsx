import React from 'react'
import {
    Container,
    Header,
    Title,
    Icon,
    Footer,
    Amount,
    LastTransaction
}
    from './styles'

interface IProps {
    type: 'up' | 'down' | 'total';
    title: string;
    amount: string;
    lastTransaction: string;
}

// opções para os Icons de acordo com o type

const icon = {
    up: "arrow-up-circle",
    down: "arrow-down-circle",
    total: "dollar-sign"
}

export default function HighlightCard({ type, title, amount, lastTransaction }: IProps) {
    return (
        <Container type={type}>
            <Header>
                <Title type={type}>{title}</Title>
                <Icon name={icon[type]} type={type} />
            </Header>
            <Footer>
                <Amount type={type} >{amount}</Amount>
                <LastTransaction type={type} >{lastTransaction}</LastTransaction>
            </Footer>
        </Container>
    )
}