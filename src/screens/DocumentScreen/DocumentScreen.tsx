import React,{ useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import C from "./DocumentScreen.style";
import { Docs } from '../../contexts/StateContext';
import { ServicesDoc } from './DocumentScreen.services';
import renderDocItem from '../../components/DocItem';
import { Alert, FlatList } from 'react-native';

type Props = NativeStackScreenProps<any>

const DocumentScreen: React.FC<Props> = ({navigation, route}) => {
	const { getDocs } = ServicesDoc;

	const [loading, setLoading] = useState(true);
	const [docList, setDocList] = useState<Docs[]>([] as Docs[]);

	useEffect(()=>{
		navigation.setOptions({
			headerTitle: 'Documentos'
		});
		getDoc();
	}, [])

	const getDoc = async () => {
		setLoading(true);
		try {
			const result = await getDocs();
			if(result.error === '') {
				setDocList(result.data)
			} else {
				Alert.alert('Error', result.error);
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
			Alert.alert('Error', error as string);
		}
	}

  return(
		<C.Container>
				{!loading && docList.length === 0 && 
					<C.NoListArea>
						<C.NoListText>Não há documentos.</C.NoListText>
					</C.NoListArea>
				}
				<FlatList 
					data={docList}
					onRefresh={getDoc}
					refreshing={loading}
					renderItem={renderDocItem}
					keyExtractor={(item, index)=> item?.id.toString()+index}
				/>
    </C.Container>		
  )
}

export default DocumentScreen;