import React,{ useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import C from "./FNLAddScreen.style";
import { Docs, Photos, useStateUser } from '../../contexts/StateContext';
import { FlatList } from 'react-native-gesture-handler';
import { ServicesAddFnl } from './FNLAddScreen.services';
import { launchCamera } from 'react-native-image-picker';

type Props = NativeStackScreenProps<any>

type Photo = {
	name: string;
  uri?: string;
  fileName?: string;
  type?: string;
}

const FNLAddScreen: React.FC<Props> = ({navigation, route}) => {

	const { addFnl } = ServicesAddFnl;

	const [description, setDescription] = useState('');
	const [where, setWhere] = useState('');
	const [photo, setPhoto] = useState<Photo[]>([] as Photo[]);

	useEffect(()=>{
		navigation.setOptions({
			headerTitle: 'Adicione um perdido'
		});
	}, [])

	const handleAddFnl = async () => {
		try {
			const result = await addFnl();
			if(result.error === '') {
				
			}
		} catch (error) {
			
		}
	}

	const handleAddPhoto = () => {
		launchCamera({ mediaType: 'photo', maxWidth: 1280 }, async (response) => {
			if (!response.didCancel) {
				setPhoto((prevPhoto) => [
					...prevPhoto,
					{ 
						name: response?.assets?.[0]?.uri || "" ,
						uri: response?.assets?.[0]?.uri || "",
						fileName: response?.assets?.[0]?.fileName || "",
						type: response?.assets?.[0]?.type || ""
					}, 
				]);
			}
		});
	}

  return(
		<C.Container>
				<C.Scroller>
					{photo.map((item, index)=>(
							<C.PhotoArea key={index}>
								<C.PhotoItem source={{uri: item.uri}} resizeMode="cover" />
							</C.PhotoArea>
						))
					}
					<C.PhotoArea>
							<C.ButtonArea onPress={handleAddPhoto} >
								<C.ButtonText>Tira uma foto</C.ButtonText>
							</C.ButtonArea>
						
					</C.PhotoArea>

					<C.Title>Descreva o objeto perdido</C.Title>
					<C.Field 
						placeholder="Ex: Carteira da cor marrom"
						value={description}
						onChangeText={(text: string)=>setDescription(text)}
					/>

					<C.Title>Diga onde foi encontrado</C.Title>
					<C.Field 
						placeholder="Ex: Perto da Piscina"
						value={where}
						onChangeText={(text: string)=>setWhere(text)}
					/>

					<C.ButtonArea onPress={handleAddFnl}>
						<C.ButtonText>Adicionar</C.ButtonText>
					</C.ButtonArea>
				</C.Scroller>
    </C.Container>		
  )
}

export default FNLAddScreen;