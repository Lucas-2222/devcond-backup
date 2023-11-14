import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { useState, useEffect, useRef } from "react";
import C from "./ReservationAddScreen.style";
import { Alert } from "react-native";
import CalendarPicker from 'react-native-calendar-picker';
import { ServicesAddReservation } from "./ReservationAddScreen.services";
import { Data, NewTime } from "./ReservationAddScreen.types";
import { Moment } from "moment";

  
type Props = NativeStackScreenProps<any>

const ReservationAddScreen: React.FC<Props> = ({route, navigation}) => {
  const ref = useRef(null)
  const id = route?.params?.id;

  const { getDisabledDates, getReservationsTime, setReservations } = ServicesAddReservation;

  const [disabled, setDisabled] = useState<Date[]>([] as Date[]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [timeList, setTimeList] = useState<NewTime[]>([] as NewTime[]);
  const [selectedTime, setSelectedTime] = useState<string>(''); 

  const formatDate = (Datas: Data[]): Promise<Date[]> => {
    return new Promise((resolve, reject)=>{
      let dateList = [];
      for(let i in Datas) {
        dateList.push(new Date(Datas[i] as any))
      }
      resolve(dateList);
    })
  }
  const handleSave = async () => {
    try {
      const result = await setReservations(
        id,
        selectedDate,
        selectedTime
      );
      console.log(result);
      if(result.error == '') {
        navigation.navigate('ReservationMyScreen')
      } else {
        Alert.alert(result.error)
      }
    } catch (error) {
      Alert.alert('Erro', 'Algo deu errado.')
    }
  }
  const getDisabled = async () => {
    setDisabled([]);    
    setLoading(true);
    setSelectedDate('');
    setTimeList([]);
    setSelectedTime('');
    try {
      const result = await getDisabledDates(id);
      console.log(result);
      if(result.error == '') {
        formatDate(result.data).then((datas)=> {
          setDisabled(datas);
          setLoading(false);
        })
      }
    } catch (error) { 
      Alert.alert('Erro', 'Algo deu errado.')
    }
  };
  const getTimes = async () => {
    try {
      const result = await getReservationsTime(id);
      console.log(result);
      if(result.error == '') {
        setSelectedTime('');
        setTimeList(result.data);
      }
      
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Algo deu errado.")
    }
  }
  useEffect(()=>{
      navigation.setOptions({
        headerTitle: `Reservar ${route?.params?.title}`
      });
      getDisabled();
  },[navigation, route]);
  useEffect(()=>{
    getTimes();
  }, [selectedDate])
  
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const handleDateChange = (date: Moment): void => {
    // const dateEl = new Date(date.toString());
    // const year = String(dateEl.getFullYear());
    // const month = String(dateEl.getMonth() + 1).padStart(2, '0');
    // const day = String(dateEl.getDate()).padStart(2, '0');
    const formated = new Date(date.toString());
  
    setSelectedDate(formated.toLocaleDateString('pt-BR', {
      timeZone: 'UTC',
    }));
    ref?.current?.scrollToEnd();
  }
  return(
    <C.Container>
      <C.Scroller ref={ref} contentContainerStyle={{paddingBottom: 40}}>
        <C.CoverImage source={{uri: route?.params?.cover}} resizeMode="cover"/>
        {loading && 
          <C.LoadingIcon size="large" color="#8863E6"/>
        }
        {!loading &&
          <C.CalendarArea>
            <CalendarPicker 
              onDateChange={(item: Moment)=>handleDateChange(item)}
              minDate={minDate}
              maxDate={maxDate}
              disabledDates={disabled}
              weekdays={['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']}
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
        {!loading && selectedDate &&
          <>
            <C.Title>{`Horários disponíveis em ${selectedDate}`}: </C.Title>
            
            <C.TimeList>
                {timeList.map((item, index)=>(
                  <C.TimeItem 
                    disabled={item.disable}
                    key={index} 
                    onPress={()=>setSelectedTime(item.time)}
                    style={{backgroundColor: selectedTime === item.time ? '#8863E6' : item.disable === true ? '#CCC' : '#FFF' }}
                  >
                    <C.TimeText style={{color: selectedTime === item.time ? '#FFF' : '#000'}}>{item.time}</C.TimeText>
                  </C.TimeItem>
                ))}
            </C.TimeList>
          </>
        }  
      </C.Scroller>
      {!loading &&
      <C.ButtonView>
          <C.ButtonArea onPress={handleSave}>
            <C.ButtonText>Agendar</C.ButtonText>
          </C.ButtonArea>
      </C.ButtonView>
      }
    </C.Container>
  );
};
export default ReservationAddScreen;