import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { useState, useEffect, useRef } from "react";
import C from "./ReservationAddScreen.style";
import { Alert } from "react-native";
import CalendarPicker from 'react-native-calendar-picker';
import { ServicesAddReservation } from "./ReservationAddScreen.services";
import { Data, NewTime } from "./ReservationAddScreen.types";
import { Moment } from "moment";
import { useStateUser } from "../../contexts/StateContext";
import { useNavigation } from "@react-navigation/native";

  
type Props = NativeStackScreenProps<any>

const ReservationAddScreen: React.FC<Props> = ({route}) => {
  const ref = useRef(null)
  const id = route?.params?.id;

  const navigation: any = useNavigation();

  const { handleList } = useStateUser();

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
      const {title, cover, id, dates, date, times}:any = route?.params;
      const result = await setReservations(
        id,
        selectedTime,
        selectedDate.split('/').reverse().join('-'),
        title,
        cover,
        dates
      );
      if(result.error == '') {
        // handleList({
        //   title,
        //   cover,
        //   id,
        //   dates,
        //   date: selectedDate.split('/').reverse().join('-'),
        //   times: selectedTime
        // })
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

  const getTimes = async (data: string) => {
    try {
      const result = await getReservationsTime(id, data);
      if(result.error == '') {
        setSelectedTime('');
        setTimeList(result.data);
      }
      
    } catch (error) {
      Alert.alert("Erro", "Algo deu errado.")
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
  const handleDateChange = (date: Moment): void => {
    const formated = new Date(date.toString());
    
    const newData = formated.toLocaleDateString('pt-BR', {
      timeZone: 'UTC',
    })

    setSelectedDate(newData);
    getTimes(newData.split('/').reverse().join('-'));
    setTimeout(()=>{
      ref?.current?.scrollToEnd();
    }, 500)
    
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