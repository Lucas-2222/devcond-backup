import React,{ useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import C from "./WallScreen.style";
import { Walls, useStateUser } from '../../contexts/StateContext';
import { ServicesWall } from './WallScreen.services';
import WallItem from '../../components/WallItem';
import { FlatList } from 'react-native-gesture-handler';

type Props = NativeStackScreenProps<any>

const WallScreen: React.FC<Props> = ({navigation}) => {
	const { getWall } = ServicesWall;

	const [loading, setLoading] = useState(true);
	const [wallList, setWallList] = useState<Walls[]>([] as Walls[]);

	useEffect(()=>{
		// navigation.setOptions({
		// 	headerTitle: 'Mural de Avisos'
		// });
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
				<FlatList 
					data={wallList}
					onRefresh={getWall}
					refreshing={loading}
					renderItem={({item}) => (<WallItem {...item} />)}
					keyExtractor={(item: any, index)=> item?.id.toString()+index}
				/>
    </C.Container>		
  )
}

export default WallScreen;