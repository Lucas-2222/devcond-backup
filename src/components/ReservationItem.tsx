import React from "react";
import styled from "styled-components/native";
import { Reservations } from "../contexts/StateContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

type Props = NativeStackScreenProps<any>

const Box = styled.TouchableOpacity`
  background-color: #FFF;
  border-width: 2px;
  border-color: #E8E9ED;
  border-radius: 15px;
  margin-bottom: 15px;
  padding-bottom: 10px;
`;
const CoverImage = styled.Image`
  background-color: #CCC;
  height: 150px;
  border-radius: 15px;
`;
const Title = styled.Text`
  font-size: 18px;
  color: #000;
  font-weight: bold;
  margin: 10px;
`;
const DateText = styled.Text`
  font-size: 13px;
  font-weight: bold;
  color: #9C9DB9;
  margin: 0 10px;
  text-transform: uppercase;
`;
const DataItem = styled.Text`
  font-size: 15px;
  color: #000;
  margin: 0 10px;
`;

const renderReservationItem = ({item}: {item: Reservations}): JSX.Element =>{
  const navigation: any = useNavigation();

  const handleClick = (title: string, cover: string) => {
    navigation.navigate('ReservationAddScreen', {title, cover});
  }
  return(
    <Box onPress={()=>handleClick(item.title, item.cover)}>
      <CoverImage source={{uri: item?.cover}} resizeMode="cover"/>
      <Title>{item?.title}</Title>
      <DateText>Horários de Funcionamento:</DateText>
      <DataItem>{item?.dates}</DataItem> 
    </Box> 
  );
}

export default renderReservationItem;