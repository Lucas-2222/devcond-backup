import React, { useState, useCallback } from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { lostData } from '../screens/FNLScreen/FNLScreen.types';
import { ServicesFNL } from '../screens/FNLScreen/FNLScreen.services';
import { Alert } from 'react-native';

const Box = styled.View`
  width: 200px;
  background-color: #FFF;
  margin-right: 20px;
`;
const Title = styled.Text`
  font-size: 15px;
  margin: 10px;
  color: #000;
  
`;
const Photo = styled.Image`
  height: 150px;
  border-radius: 5px;
`;
const InfoText = styled.Text`
  font-weight: bold;
  color: #000;
  margin: 0 10px 10px 10px;
`;
const InfoTitle = styled.Text`
  font-weight: bold;
  color: #CCC;
  margin: 0 10px 10px  10px;
`;
const Button = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.botton};
  padding: 10px;
  border-radius: 5px;
  margin: 10px;
`;
const ButtonText = styled.Text`
  color: #FFF;
  font-weight: bold;
  margin-left: 10px;
`;

const LostItem = ({ item, index, refresing }: { item: lostData; index: number, refresing: ()=> Promise<void> }): JSX.Element =>{

  const { putFnl } = ServicesFNL;


  const handleTurnIntoRec = () => {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja remover a reserva?',
      [
        {text: 'Sim, tenho certeza', onPress: handleSetRec},
        {text: 'Cancelar', onPress: ()=>{}, style: 'cancel'}
      ]
    )
  };

  const handleSetRec = async () => {
      const result = await putFnl(item.id);
      if(result.error === '') {
        refresing();
       Alert.alert('Pegue seu item perdido na portaria.')
      } else {
        Alert.alert(result.error)
      }
      
  }

  return(
    <Box>
      <Photo source={{uri: item.photo}} resizeMode='contain' />
      <Title>{item.description}</Title>

      <InfoTitle>Encontrado em:</InfoTitle>
      <InfoText>{item.where}</InfoText>

      <InfoTitle>Data: </InfoTitle>
      <InfoText>{item.dateCreated}</InfoText>

      <Button onPress={handleTurnIntoRec}>
        <Icon name='hand-pointer-o' size={24} color='#FFF' />
        <ButtonText>É meu</ButtonText>
      </Button>
    </Box>
  )
}


export default LostItem;