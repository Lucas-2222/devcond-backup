import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {  Warns } from '../contexts/StateContext';
import { baseUrl } from '../services/api';

const Box = styled.View`
  background-color: #FFF;
  border-width: 2px;
  border-color: #E8E9ED;
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 10px; 
`;

const Title = styled.Text`
  color: #000;
  font-size: 15px;
`;

const Date = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #9C9DB9;
  margin-bottom: 10px;
`;
const StatusArea = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
`;
const StatusText = styled.Text`
  font-size: 15px;
  color: #9C9DB9;
  margin-left: 10px;
`;
const PhotosArea = styled.View`
  flex-direction: row;
`;

const PhotoItem = styled.TouchableOpacity`
  margin-right: 10px;
`;

const PhotoImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 10px;
`;

const ModalArea = styled.View`
  flex: 1;
  background-color: #000;
`;

const ModalImage = styled.Image`
  flex: 1;
`;

const ModalCloseButton = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 10px;
  right: 10px;
`;


enum Enum {
  IN_REVIEW = 'IN_REVIEW',
  RESOLVED = 'RESOLVED',
}

const WarnItem: React.FC<Warns> = ({ title, dateCreated, status, photos}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState('');

  const openModal = (url: string) => {
    setModalImg(url);
    setShowModal(true);
  }


  return(
    <Box>
      <Date>{dateCreated?.toString()}</Date>
      <Title>{title}</Title>
      <StatusArea>
        <Icon name="inbox" size={24} color="#8B63E7"/>
        <StatusText>
          {status === Enum.IN_REVIEW && 'Ocorrência em análise'}
          {status === Enum.RESOLVED && 'Resolvido'}
        </StatusText>
      </StatusArea>
      {photos?.length > 0 &&
        <PhotosArea>
          {photos?.map((item, index)=>(
            <PhotoItem key={index} onPress={()=>openModal(`${baseUrl}/images/${item.name}`)}>
              <PhotoImage source={{uri: `${baseUrl}/images/${item.name}`}} resizeMode="cover"/>
            </PhotoItem> 
          ))}
        </PhotosArea>
      } 
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
        >
          <ModalArea>
            <ModalImage source={{uri: modalImg}} resizeMode='contain'/>
            <ModalCloseButton onPress={()=>setShowModal(false)}>
              <Icon name="close" size={24} color="#FFF"/>
            </ModalCloseButton>
          </ModalArea>
        </Modal>
    </Box>
  );
};
export default WarnItem;