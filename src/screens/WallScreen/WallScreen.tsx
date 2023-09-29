import React,{ useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import C from "./WallScreen.style";
import { PropWalls, Walls, useStateUser } from '../../contexts/StateContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ServicesLogin } from './WallScreen.services';
import api from '../../services/api';
import WallItem from '../../components/WallItem';

type Props = NativeStackScreenProps<any>



const WallScreen: React.FC<Props> = ({navigation, routes}) => {
	const { logout, getWall } = ServicesLogin;
	const { user, handleProperty } = useStateUser();

	const [loading, setLoading] = useState(true);
	const [wallList, setWallList] = useState<Walls[]>([] as Walls[]);

	useEffect(()=>{
		navigation.setOptions({
			headerTitle: 'Mural de Avisos'
		});
		getWalls();
	}, [])

	const getWalls = async () => {
		setLoading(true);
		const result = await getWall();
		setLoading(false);
		if(result.error === '') {
			setWallList(result.data)
		} else {
			console.log(result.error);
		}
	}

  return(
		<C.Container>
				{!loading && wallList.length === 0 && 
					<C.NoListArea>
						<C.NoListText>Não há avisos.</C.NoListText>
					</C.NoListArea>
				}
				<C.List 
					data={wallList}
					onRefresh={getWall}
					refreshing={loading}
					renderItem={({item}) => (<WallItem {...item} />)}
					keyExtractor={({item})=> item?.id.toString() }
				/>
    </C.Container>		
  )
}

export default WallScreen;