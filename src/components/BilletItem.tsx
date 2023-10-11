import React, { useState } from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Docs } from '../contexts/StateContext';
import { Linking } from 'react-native';
import api from '../services/api';
import { Link, LinkingContext } from '@react-navigation/native';

const Box = styled.TouchableOpacity`
  background-color: #FFF;
  border-width: 2px;
  border-color: #E8E9ED;
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 10px; 
  flex-direction: row;
  align-items: center;
`;

const Title = styled.Text`
  color: #000;
  font-size: 15px;
  margin-left: 10px;
`;

const BilletScreen: React.FC<Docs> = ({id, title, fileurl}) => {

  const handleClick = async () => {
    const supported = await Linking.canOpenURL( fileurl );
    if(supported) {
      await Linking.openURL(fileurl);
    }
  } 

  return(
    <Box onPress={handleClick}>
          <Icon name="file-text" size={30} color="#8B63E7"/>
          <Title>{title}</Title>
    </Box>
  );
};
export default BilletScreen;