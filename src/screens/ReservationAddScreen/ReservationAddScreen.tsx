  import { NativeStackScreenProps } from "@react-navigation/native-stack"
  import React, { useState, useEffect } from "react";
  import C from "./ReservationAddScreen.style";
  import { Alert, View } from "react-native";
  import { Reservations } from "../../contexts/StateContext";
  import { useNavigation, useRoute } from "@react-navigation/native";
  import CalendarPicker from 'react-native-calendar-picker';

  type Props = NativeStackScreenProps<any>

  const ReservationAddScreen: React.FC<Props> = ({route, navigation}) => {
    
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
      // console.log(route)
      // const unsubscribe = navigation.addListener('focus', () => {
        navigation.setOptions({
          headerTitle: `Reservar ${route?.params?.title}`
        });
      // });
      // return unsubscribe;
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
                weekdays={['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']}
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