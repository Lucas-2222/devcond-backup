import React,{ useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import C from "./ReservationMyScreen.style";
import { useStateUser } from '../../contexts/StateContext';
import { ServicesMyScreen } from './ReservationMyScreen.services';
import BilletItem from '../../components/BilletItem';
import { Alert, View } from "react-native";
import { FlatList } from 'react-native-gesture-handler';
import MyReservScreen from '../../components/MyReservItem';
import { MyReserv } from './ReservationMyScreen.types';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LoadingIcon } from '../PreloadScreen/PreloadScreen.style';

type Props = NativeStackScreenProps<any>

const ReservationMyScreen: React.FC<Props> = ({navigation, route}) => {
	const { getMyReservations } = ServicesMyScreen;
	const { handleList, list } = useStateUser();
	const [loading, setLoading] = useState(false);

	const getMyReservation = async () => {
		try {
			setLoading(true);
			const result = await getMyReservations();
			setLoading(false);
			if(result.error === '') {
				handleList(result.data);
			} else {
				Alert.alert(result.error)
			}
		} catch (error) {
			Alert.alert('Erro', 'Não foi possível pegar suas reservas.');
		}
	}

	useEffect(()=>{
		navigation.setOptions({
			headerTitle:`Minhas Reservas`
		});
		getMyReservation();
	}, [navigation, route	]);

	useEffect(()=>{
		const unsubscribe = navigation.addListener('focus', () => {
			getMyReservation();
		});
		return unsubscribe;
	}, [navigation]);

  return(
		<C.Container>
				{loading &&
					<C.LoadingIcon size="large" color="#8863E6"/>
				}
				{!loading && list.length === 0 && 
					<C.NoListArea>
						<C.NoListText>Não há reservas.</C.NoListText>
					</C.NoListArea>
				}
				{!loading &&
					<FlatList 
						data={list}
						onRefresh={getMyReservation}
						refreshing={loading}
						renderItem={({item}) => <MyReservScreen {...item}/>}  
						keyExtractor={(item, index)=> item?.id.toString()+index}
					/>
				}

    </C.Container>		
  )
}

export default ReservationMyScreen;