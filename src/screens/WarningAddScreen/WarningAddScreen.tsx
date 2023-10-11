import React,{ useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import C from "./WarningAddScreen.style";
import { Warns, useStateUser } from '../../contexts/StateContext';
import Icon  from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ServicesLogin } from './WarningAddScreen.services';
import WarnItem from '../../components/WarnItem';

type Props = NativeStackScreenProps<any>

const WarningAddScreen: React.FC<Props> = ({navigation, routes}) => {

	const { property } = useStateUser();

	const [ warnText, setWarnText] = useState('');


	useEffect(()=>{
		navigation.setOptions({
			headerTitle: 'Adicionar um ocorrência'
		});
	}, [])

  return(
		<C.Container>
			<C.Scroller>
				<C.Title>Descreva a ocorrência</C.Title>
				<C.Field 
					placeholder="Ex: Vizinho está fazendo barulho."
					value={warnText}
					onChangeText={(text: string)=>setWarnText(text)}
				/>

				<C.Title>Fotos Relacionadas</C.Title>
				<C.PhotoArea>
					<C.PhotoScroll horizontal={true}>
						<C.PhotoAddButton onPress={()=>{}}>
							<Icon name="camera" size={24} color="#000"/>
						</C.PhotoAddButton>
					</C.PhotoScroll>
				</C.PhotoArea>

				<C.ButtonArea onPress={()=>{}}>
					<C.ButtonText>Salvar</C.ButtonText>
				</C.ButtonArea>
			</C.Scroller>
    </C.Container>		
  )
}

export default WarningAddScreen;