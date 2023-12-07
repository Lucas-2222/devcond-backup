import React,{ useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import C from "./FNLScreen.style";
import { Docs } from '../../contexts/StateContext';
import renderDocItem from '../../components/DocItem';
import { Alert, FlatList } from 'react-native';
import { ServicesFNL } from './FNLScreen.services';
import { lostData, recData } from './FNLScreen.types';
import LostItem from '../../components/LostItem';
import RecItem from '../../components/RecItem';

type Props = NativeStackScreenProps<any>

const FNLScreen: React.FC<Props> = ({navigation, route}) => {
	
	const { getFnls } = ServicesFNL;
	
	const [loading, setLoading] = useState(false);
	const [recoveredList, setRecoveredList] = useState<recData[]>([]);
	const [lostList, setLostList] = useState<lostData[]>([]);

	useEffect(()=>{
		navigation.setOptions({
			headerTitle: 'Achados e Perdidos'
		});
		getFnl();
	}, [])

	

	const getFnl = async () => {
		try {
			setLoading(true);
			const result = await getFnls();
			setLoading(false);
			if(result.error === '') {
				setLostList(result.lost);
				setRecoveredList(result.recovered);
			 } else {
				Alert.alert('Erro', result.error)
			}
		} catch (error) {
			Alert.alert('Error', error as string);
		
		}
	}

  return(
		<C.Container>
			<C.Scroller>
				{loading && 
					<C.LoadingIcon color="#E8E9ED" size="large"/>
				}
				{!loading && recoveredList.length === 0 && lostList.length === 0 &&
					<C.NoListArea>
						<C.NoListText>Não há nenhum objeto perdido no momento.</C.NoListText>
					</C.NoListArea>
				}
				{!loading && lostList?.length > 0 &&
					<>
					<C.Title>Itens Perdidos</C.Title>
					<C.ObjectScroller
						horizontal={true}
						showsHorizontalScrollIndicator={false}
					>
						{lostList?.map((item, index)=>(
							<LostItem {...{item,index}}/>
						))}
					</C.ObjectScroller>
					</>
				}
				{!loading && recoveredList?.length > 0 &&
					<>
					<C.Title>Itens Recuperados</C.Title>
					<C.ObjectScroller
						horizontal={true}
						showsHorizontalScrollIndicator={false}
					>
						{recoveredList?.map((item, index)=>(
							<RecItem {...{item, index}}/>
						))}
					</C.ObjectScroller>
					</>
				}
				</C.Scroller>
    </C.Container>		
  )
}

export default FNLScreen;