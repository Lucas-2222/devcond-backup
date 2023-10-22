import React,{ useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import C from "./WarningScreen.style";
import { Warns, useStateUser } from '../../contexts/StateContext';
import Icon  from 'react-native-vector-icons/FontAwesome';
import { ServicesWarning } from './WarningScreen.services';
import WarnItem from '../../components/WarnItem';

type Props = NativeStackScreenProps<any>

const WarningScreen: React.FC<Props> = ({navigation, routes}) => {
	const { getWarnings } = ServicesWarning;
	const { property } = useStateUser();

	const [loading, setLoading] = useState(true);
	const [list, setList] = useState<Warns[]>([] as Warns[]);

	useEffect(()=>{
		navigation.setOptions({
			headerTitle: 'Livro de Ocorrências',
			headerRight: () => (
				<C.AddButton onPress={()=>navigation.navigate('WarningAddScreen')}>
					<Icon name="plus" size={24} color="#000"/>
				</C.AddButton>	
			)
		});
		getWarning();
	}, [])

	const getWarning = async () => {
		setLoading(true);
		const result = await getWarnings(property.id);
		setLoading(false);
		if(result.error === '') {
			setList(result.data)
		} else {
			console.log(result.error);
		}
	}

  return(
		<C.Container>
				{!loading && list.length === 0 && 
					<C.NoListArea>
						<C.NoListText>Não há boletos.</C.NoListText>
					</C.NoListArea>
				}
				<C.List 
					data={list}
					onRefresh={getWarning}
					refreshing={loading}
					renderItem={({item}) => (<WarnItem {...item} />)}
					keyExtractor={({item})=> item?.id.toString() }
				/>
    </C.Container>		
  )
}

export default WarningScreen;