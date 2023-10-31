import React, { useState, useCallback } from 'react';
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

const renderDocItem = useCallback(({item}: {item: Docs}): JSX.Element =>{
  
  const handleClick = async () => {
    const supported = await Linking.canOpenURL( item.fileurl );
    if(supported) {
      await Linking.openURL(item.fileurl);
    }
  } 

  return(
    <Box onPress={handleClick}>
      <Icon name="file-text" size={30} color="#8B63E7"/>
      <Title>{item.title}</Title>
    </Box>
  )
}, [])


export default renderDocItem;