import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from 'styled-components';

import HighlightCard from '../../components/HighlightCard'
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard'

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  User,
  UserGretting,
  UserName,
  Photo,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  ButtonPower,
  LoadContainer
} from "./styles"

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}
interface HighlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}

export function Dashbord() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

  const theme = useTheme();

  function getLastTransactionDate(
    collection: DataListProps[],
    type: 'positive' | 'negative'
  ) {

    let dayFormatted = '';

    const lastTransaction =
      new Date(
        Math.max.apply(Math, collection
          .filter(transaction =>
            transaction.type === type)
          .map(transaction => new Date(transaction.date).getTime())))

    if(lastTransaction.getDate() < 10) {
      dayFormatted = `0${lastTransaction.getDate()}`
    }else{
      dayFormatted = `${lastTransaction.getDate()}`;
    }


    return `${dayFormatted} de ${lastTransaction.toLocaleString("pt-BR", {
      month: "long"
    })}`;
  }

  async function loadTransactions() {
    const dataKeyTransactions = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKeyTransactions);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {

        if (item.type === 'positive') {
          entriesTotal += Number(item.amount)
        } else {
          expensiveTotal += Number(item.amount)
        }


        const amount = Number(item.amount)
          .toLocaleString("pt-BR", {
            style: 'currency',
            currency: 'BRL',
          });

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',

        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date
        }
      });

    const total = entriesTotal - expensiveTotal;

    const lastTransactionEntries = getLastTransactionDate(transactions, 'positive');
    const lastTransactionExpensives = getLastTransactionDate(transactions, 'negative');

    const totalInterval = `01 à ${lastTransactionEntries}`

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última entrada ${lastTransactionEntries}`
      },
      expensives: {
        amount: expensiveTotal.toLocaleString("pt-BR", {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última saída ${lastTransactionExpensives}`
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: totalInterval
      }
    })

    setTransactions(transactionsFormatted);

    setIsLoading(false)
  }

  useEffect(() => {
    loadTransactions();
  }, [])

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));

  return (
    <Container>
      {
        isLoading ?
          <LoadContainer>
            <ActivityIndicator
              color={theme.colors.primary}
              size="large"
            />
          </LoadContainer>
          :
          <>
            <Header >
              <UserWrapper>
                <UserInfo>
                  <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/48772842?v=4' }} />
                  <User>
                    <UserGretting>Olá,</UserGretting>
                    <UserName>Max</UserName>
                  </User>
                </UserInfo>
                <ButtonPower>
                  <Icon name="power" />
                </ButtonPower>
              </UserWrapper>
            </Header>
            <HighlightCards >
              <HighlightCard
                type="up"
                title="Entradas"
                amount={highlightData.entries.amount}
                lastTransaction={highlightData.entries.lastTransaction}
              />
              <HighlightCard
                type="down"
                title="Saídas"
                amount={highlightData.expensives.amount}
                lastTransaction={highlightData.expensives.lastTransaction}
              />
              <HighlightCard
                type="total"
                title="Total"
                amount={highlightData.total.amount}
                lastTransaction={highlightData.total.lastTransaction}
              />
            </HighlightCards>
            <Transactions>
              <Title>
                Listagem
              </Title>
              <TransactionList
                data={transactions}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <TransactionCard
                  data={item}
                />}

              />

            </Transactions>
          </>
      }
    </Container>
  )
}