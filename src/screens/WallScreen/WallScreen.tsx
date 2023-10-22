import React,{ useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import C from "./WallScreen.style";
import { Walls, useStateUser } from '../../contexts/StateContext';
import { ServicesLogin } from './WallScreen.services';
import WallItem from '../../components/WallItem';

type Props = NativeStackScreenProps<any>

const WallScreen: React.FC<Props> = ({navigation, routes}) => {
	const { getWall } = ServicesLogin;

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