  import { NativeStackScreenProps } from "@react-navigation/native-stack"
  import React, { useState, useEffect } from "react";
  import C from "./ReservationAddScreen.style";
  import { Alert, View } from "react-native";
  import { Reservations } from "../../contexts/StateContext";
  import { useNavigation, useRoute } from "@react-navigation/native";
  import CalendarPicker from 'react-native-calendar-picker';
  import { ServicesAddReservation } from "./ReservationAddScreen.services";
import { Data } from "./ReservationAddScreen.types";

  type Props = NativeStackScreenProps<any>

  const ReservationAddScreen: React.FC<Props> = ({route, navigation}) => {
    
    const { getDisabledDates } = ServicesAddReservation;
    const id = route?.params?.id;

    const [disabled, setDisabled] = useState<Date[]>([] as Date[]);
    const [loading, setLoading] = useState(false);

    const getDisabled = async () => {
      try {
        const result = await getDisabledDates(id);
        if(result.error == '') {
          let dateList = [];
          for(let i in result.data) {
            dateList.push( new Date(result.data[i]))
          }
          setDisabled(dateList)
        }
      } catch (error) {
        Alert.alert('Erro', 'Algo deu errado.')
      }
    }

    useEffect(()=>{
        navigation.setOptions({
          headerTitle: `Reservar ${route?.params?.title}`
        });
        getDisabled();
    },[navigation, route]);

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);

    const handleDateChange = () => {

    }

    return(
      <C.Container>
        <C.Scroller contentContainerStyle={{paddingBottom: 40}}>
          <C.CoverImage source={{uri: route?.params?.cover}} resizeMode="cover"/>

          {loading && 
            <C.LoadingIcon size="large" color="#8863E6"/>
          }

          {!loading &&
            <C.CalendarArea>
              <CalendarPicker 
                onDateChange={handleDateChange}
                minDate={minDate}
                maxDate={maxDate}
                disabledDates={disabled}
                weekdays={['Dom', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Seg']}
                months={["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]}
                previousTitle="Anterior"
                nextTitle="Próximo"
                selectedDayColor="#8863E6"
                selectedDayTextColor='#FFF'
                todayBackgroundColor="transparent"
                todayTextStyle={{color: '#000'}}
              />
            </C.CalendarArea>
          }

        </C.Scroller>
      </C.Container>
    );
  };

  export default ReservationAddScreen;