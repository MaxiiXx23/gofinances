import React from 'react'
import HighlightCard from '../../components/HighlightCard'


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
  HighlightCards
} from "./styles"

export default function Dashbord() {
  return (
    <Container>
      <Header >
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/48772842?v=4' }} />
            <User>
              <UserGretting>Olá,</UserGretting>
              <UserName>Max</UserName>
            </User>
          </UserInfo> 
          <Icon name="power" />
        </UserWrapper>
      </Header>
      <HighlightCards >
          <HighlightCard 
            type="up"
            title="Entradas" 
            amount="R$ 17.400,00"  
            lastTransaction='Última entrada dia 13 de abril'
          />
          <HighlightCard 
            type="down"
            title="Saídas" 
            amount="R$ 1.259,00"  
            lastTransaction='Última saída dia 03 de abril'
          />
          <HighlightCard 
            type= "total"
            title="Total" 
            amount="R$ 16.141,00"  
            lastTransaction='01 à 16 de abril'
          />
      </HighlightCards>
    </Container>
  )
}