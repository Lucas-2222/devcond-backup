import React,{ useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import C from "./WarningAddScreen.style";
import { launchCamera } from 'react-native-image-picker';
import Icon  from 'react-native-vector-icons/FontAwesome';
import { ServicesAddWarning } from './WarningAddScreen.services';

type Props = NativeStackScreenProps<any>;
type Photos = {
	uri: string;
}
const WarningAddScreen: React.FC<Props> = ({navigation, routes}) => {
	const { addWarning } = ServicesAddWarning;

	const [ warnText, setWarnText] = useState('');
	const [photoList, setPhotoList] = useState<Photos[]>([]);

	useEffect(()=>{
		navigation.setOptions({
			headerTitle: 'Adicionar um ocorrência'
		});
	}, [])


	const handlePhotoAdd = async () => {
		launchCamera({ mediaType: 'photo', maxWidth: 1280 }, async (response) => {
			if (!response.didCancel) {
				setPhotoList((prevPhoto) => [
					...prevPhoto,
					{ uri: response?.assets?.[0]?.uri || "" }, 
				]);
			}
		});
	};

	const handleDelPhoto = (uri: Photos) => {
		let list = [...photoList];
		list = list.filter(value=>value!==uri)
		setPhotoList(list);
	}

	const handleSaveWarn = async () => {
		if(warnText !== '') {
			const result = await addWarning(warnText, photoList);
			if(result.error === '') {
				navigation.navigate('WarningScreen');
			} else {
				console.log(result.error);
			} 
		} else {
			console.log('Descreva a ocorrência');
		}
	}	
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
						<C.PhotoAddButton onPress={handlePhotoAdd}>
							<Icon name="camera" size={24} color="#000"/>
						</C.PhotoAddButton>
						{photoList.map((item, index)=>(
						<C.PhotoItem key={index}>
								<C.Photo source={{uri: item.uri	}}/>
						<C.RemovePhotoButton onPress={()=>handleDelPhoto(item)}>
							<Icon name="remove" size={16} color="#FF0000"/>
						</C.RemovePhotoButton>
						</C.PhotoItem>
						))}
					</C.PhotoScroll> 
				</C.PhotoArea>	
				<C.ButtonArea onPress={handleSaveWarn}>
					<C.ButtonText>Salvar</C.ButtonText>
				</C.ButtonArea>
			</C.Scroller>
    </C.Container>		
  )
}

export default WarningAddScreen; 