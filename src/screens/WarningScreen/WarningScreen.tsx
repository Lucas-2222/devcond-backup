import React,{ useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import C from "./WarningScreen.style";
import { Warns } from '../../contexts/StateContext';
import Icon  from 'react-native-vector-icons/FontAwesome';
import { ServicesWarning } from './WarningScreen.services';
import WarnItem from '../../components/WarnItem';
import { FlatList } from 'react-native-gesture-handler';

type Props = NativeStackScreenProps<any>

const WarningScreen: React.FC<Props> = ({navigation, route}) => {
	
	const { getWarnings } = ServicesWarning;

	const [loading, setLoading] = useState(true);
	const [list, setList] = useState<Warns[]>([] as Warns[]);

	useEffect(()=>{
		navigation.setOptions({
			headerTitle: 'Livro de Ocorrências',
			headerRight: () => (
				<C.AddButton onPress={()=>navigation.navigate('WarningAddScreen', {callback: getWarning})}>
					<Icon name="plus" size={24} color="#000"/>
				</C.AddButton>	
			)
		});
		getWarning();
	}, [])

	const getWarning = async () => {
		setLoading(true);
		const result = await getWarnings();
		if(result.error === '') {
			setList(result.warning);
		} else {
			console.log(result.error);
		}
		setLoading(false);
	}

  return(
		<C.Container>
				{!loading && list?.length === 0 && 
					<C.NoListArea>
						<C.NoListText>Não há boletos.</C.NoListText>
					</C.NoListArea>
				}
				<FlatList 
					data={list}
					onRefresh={getWarning}
					refreshing={loading}
					renderItem={({item}) => (<WarnItem {...item} />)}
					keyExtractor={(item: any,index)=> item?.idWarning?.toString() + index}    
				/>
    </C.Container>		
  )
}

export default WarningScreen;