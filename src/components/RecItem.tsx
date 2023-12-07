import React, { useState, useCallback } from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Docs } from '../contexts/StateContext';
import { Linking } from 'react-native';
import api from '../services/api';
import { Link, LinkingContext } from '@react-navigation/native';
import { recData } from '../screens/FNLScreen/FNLScreen.types';

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
  margin: 0 10px 10px 10px;
`;

const RecItem = ({item}: {item: recData}): JSX.Element =>{

  return(
    <Box>
      <Photo source={{uri: item.photoRec}} />
      <Title>{item.descriptionRec}</Title>

      <InfoTitle>Encontrado em:</InfoTitle>
      <InfoText>{item.whereRec}</InfoText>

      <InfoTitle>Data: </InfoTitle>
      <InfoText>{item.dateCreatedRec}</InfoText>



    </Box>
  )
};


export default RecItem;