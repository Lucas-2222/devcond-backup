  import { NativeStackScreenProps } from "@react-navigation/native-stack"
  import React, { useState, useEffect } from "react";
  import C from "./ReservationScreen.style";
  import { Alert, View } from "react-native";
  import { ServicesReservation } from "./ReservationScreen.services";
  import ReservationItem from "../../components/ReservationItem";
  import { Reservations } from "../../contexts/StateContext";
  import { FlatList } from "react-native-gesture-handler";

  type Props = NativeStackScreenProps<any>

  const ReservationScreen: React.FC<Props> = ({navigation, route}) => {

    const { getReservations } = ServicesReservation;

    const [loading, setLoading] = useState(true);
    const [list, setList] = useState<Reservations[]>([]);

    useEffect(()=>{
      navigation.setOptions({
        headerTitle: 'Reservas'
      });
      getReservation();
    },[]);

    const getReservation = async () => {
      setLoading(true)
      try {
        const result = await getReservations();
        if(result.error === '') {
           setList(result.data);
        } else {
          Alert.alert('Erro', result.error)
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        Alert.alert('Error', error as string);
      
    }
  }

    return(
      <C.Container>
        <C.Scroller contentContainerStyle={{paddingBottom: 40}}>
          <C.ButtonArea>
            <C.ButtonText>Minhas Reservas</C.ButtonText>
          </C.ButtonArea>

          <C.Title>Selecione uma Área</C.Title>

          {loading && 
            <C.LoadingIcon size="large" color="#8863E6"/>
          }

          {!loading && list?.length === 0 && 
            <C.NoListArea>
              <C.NoListText></C.NoListText>
            </C.NoListArea>
          }
          {list?.map((item, index)=>(
            <ReservationItem {...{item,index}} />
          ))}
        
        </C.Scroller>
      </C.Container>
    );
  };

  export default ReservationScreen;