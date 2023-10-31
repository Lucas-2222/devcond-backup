import React,{ useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import C from "./BilletScreen.style";
import { Docs, useStateUser } from '../../contexts/StateContext';
import { ServicesLogin } from './BilletScreen.services';
import BilletItem from '../../components/BilletItem';
import { FlatList } from 'react-native-gesture-handler';

type Props = NativeStackScreenProps<any>

const BilletScreen: React.FC<Props> = ({navigation, route}) => {
	const { getBillets } = ServicesLogin;
	const { property } = useStateUser();

	const [loading, setLoading] = useState(true);
	const [billetList, setBilletList] = useState<Docs[]>([] as Docs[]);

	useEffect(()=>{
		navigation.setOptions({
			headerTitle: 'Boletos'
		});
		getBillet();
	}, [])

	const getBillet = async () => {
		setLoading(true);
		const result = await getBillets(property.id);
		setLoading(false);
		if(result.error === '') {
			setBilletList(result.data)
		} else {
			console.log(result.error);
		}
	}

  return(
		<C.Container>
				{!loading && billetList.length === 0 && 
					<C.NoListArea>
						<C.NoListText>Não há boletos.</C.NoListText>
					</C.NoListArea>
				}
				<FlatList 
					data={billetList}
					onRefresh={getBillet}
					refreshing={loading}
					renderItem={({item}) => (<BilletItem {...item} />)}
					keyExtractor={(item, index)=> item?.id.toString()+index}
				/>
    </C.Container>		
  )
}

export default BilletScreen;