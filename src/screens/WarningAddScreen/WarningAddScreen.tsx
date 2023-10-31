import React,{ useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import C from "./WarningAddScreen.style";
import { launchCamera } from 'react-native-image-picker';
import Icon  from 'react-native-vector-icons/FontAwesome';
import { ServicesAddWarning } from './WarningAddScreen.services';
import { Photos } from '../../contexts/StateContext';

type Props = NativeStackScreenProps<any, any>;

const WarningAddScreen: React.FC<Props> = ({navigation, route}) => {
	

	const callback = route?.params?.callback;

	const [ warnText, setWarnText] = useState('');
	const [photoList, setPhotoList] = useState<Photos[]>([] as Photos[]);

	useEffect(()=>{
		navigation.setOptions({
			headerTitle: 'Adicionar um ocorrência'
		});
	}, [])


	const handlePhotoAdd = async () => {
		launchCamera({ mediaType: 'photo', maxWidth: 1280 }, async (response) => {
			console.log(response);
			if (!response.didCancel) {
				setPhotoList((prevPhoto) => [
					...prevPhoto,
					{ 
						name: response?.assets?.[0]?.uri || "" ,
						url: response?.assets?.[0]?.uri || "",
						fileName: response?.assets?.[0]?.fileName || "",
						type: response?.assets?.[0]?.type || ""
					}, 
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
		// 	const result = await addWarning(warnText, photoList);
		// 	if(result.error === '') {
		// 		navigation.navigate('WarningScreen');
		// 	} else {
		// 		console.log(result.error);
		// 	} 
		// } else {
		// 	console.log('Descreva a ocorrência');
		callback((prevPhoto: any) => [
			...prevPhoto,
			{
				id: 2,
				title: warnText,
				status: 'IN_REVIEW',
				dateCreated: '21/05/21',
				photos: photoList
			}
		])};
		navigation.navigate('WarningScreen');
		setWarnText('');
		setPhotoList([]);
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
								<C.Photo source={{uri: item.name}}/>
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