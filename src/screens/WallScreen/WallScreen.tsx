import React,{ useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import C from "./WallScreen.style";
import { useStateUser } from '../../contexts/StateContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ServicesLogin } from './WallScreen.services';
import api from '../../services/api';

type Props = NativeStackScreenProps<any>

const WallScreen: React.FC<Props> = ({navigation, routes}) => {
	const { logout } = ServicesLogin;
	const { user, handleProperty } = useStateUser();

	const [loading, setLoading] = useState(true);
	const [wallList, setWallList] = useState([]);

	useEffect(()=>{
		navigation.setOptions({
			headerTitle: 'Mural de Avisos'
		});
		getWall();
	}, [])

	const getWall = async () => {
		setLoading(true);
		const result = await api.getWall();
		setLoading(false);
		if(result.error === '') {
			setWallList(result.list)
		} else {
			console.log(result.error);
		}
	}

  return(
		<C.Container>
				{loading &&
					<C.LoadingIcon color="#8863E6" size="large"/>
				}
				{!loading && wallList.length === 0 && 
					<C.NoListArea>
						<C.NoListText>Não há avisos.</C.NoListText>
					</C.NoListArea>
				}
    </C.Container>		
  )
}

export default WallScreen;