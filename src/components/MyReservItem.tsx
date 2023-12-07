import React, { useState } from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Docs, useStateUser } from '../contexts/StateContext';
import { Alert, Linking } from 'react-native';
import api from '../services/api';
import { Link, LinkingContext } from '@react-navigation/native';
import { MyReserv } from '../screens/ReservationMyScreen/ReservationMyScreen.types';
import { ServicesMyScreen } from '../screens/ReservationMyScreen/ReservationMyScreen.services';


const Box = styled.View`
  background-color: #FFF;
  border-radius: 15px;
  margin-bottom: 15px;
  flex-direction: row;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #000;
  margin-bottom: 5px;
`;

const InfoArea = styled.View`
  flex: 1;
`;
const InfoText = styled.Text`
  color: #9C9DB9;
`;
const DateReserved = styled.Text`
  color: #000;
`;

const CoverImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 15px;
`;

const ButtonItem = styled.TouchableOpacity`
  margin: 20px;
`;



const MyReservScreen: React.FC<MyReserv> = ({cover, title, date, time, id }) => {
  const { removeReservations } = ServicesMyScreen
  const { removeIndex } = useStateUser();
  const formated = new Date(date.toString());
    
  const newData = formated.toLocaleDateString('pt-BR', {
    timeZone: 'UTC',
  })

  const handleRemoveButton = () => {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja remover a reserva?',
      [
        {text: 'Sim, tenho certeza', onPress: removeAcReservation},
        {text: 'Cancelar', onPress: ()=>{}, style: 'cancel'}
      ]
    )
  }

  const removeAcReservation = async () => {
    try {
      const result = await removeReservations(id);
      if(result.error === '') {
        removeIndex(id);
      } else {
        Alert.alert(result.error);
      }
    } catch (error) {
      Alert.alert('Erro', 'Tente Novamente');
    }
  }

  return(
    <Box>
      <CoverImage source={{uri: cover}} resizeMode='cover'></CoverImage>
        <InfoArea>
          <Title>{title}</Title>
          <InfoText>Horário reservado: </InfoText>
          <DateReserved>{newData}, {time}</DateReserved>
        </InfoArea>
      <ButtonItem onPress={handleRemoveButton}>
        <Icon name="remove" size={25} color="#FF0000" />
      </ButtonItem>
    </Box>
  );
};
export default MyReservScreen;