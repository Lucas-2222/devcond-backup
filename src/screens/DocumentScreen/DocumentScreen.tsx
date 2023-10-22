import React,{ useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import C from "./DocumentScreen.style";
import { Docs } from '../../contexts/StateContext';
import { ServicesLogin } from './DocumentScreen.services';
import DocItem from '../../components/DocItem';

type Props = NativeStackScreenProps<any>

const DocumentScreen: React.FC<Props> = ({navigation, routes}) => {
	const { getDocs } = ServicesLogin;

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
		const result = await getDocs();
		setLoading(false);
		if(result.error === '') {
			setDocList(result.data)
		} else {
			console.log(result.error);
		}
	}

  return(
		<C.Container>
				{!loading && docList.length === 0 && 
					<C.NoListArea>
						<C.NoListText>Não há documentos.</C.NoListText>
					</C.NoListArea>
				}
				<C.List 
					data={docList}
					onRefresh={getDoc}
					refreshing={loading}
					renderItem={({item}) => (<DocItem {...item} />)}
					keyExtractor={({item})=> item?.id.toString() }
				/>
    </C.Container>		
  )
}

export default DocumentScreen;