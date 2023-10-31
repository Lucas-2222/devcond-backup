import React,{ useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import C from "./ChoosePropertyScreen.style";
import { useStateUser } from '../../contexts/StateContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';
import { ServicesChooseProperty } from './ChoosePropertyScreen.services';
import { ResponseProperty, Properties } from './ChoosePropertyScreen.types';

type Props = NativeStackScreenProps<any>

const ChoosePropertyScreen: React.FC<Props> = ({navigation, route}) => {
	const { user, handleProperty } = useStateUser();
	const [loading, setLoading] = useState(true);
	const [properties, setProperties] = useState<Properties[]>([] as Properties[])

	const { getProperties } = ServicesChooseProperty;

	const handleLogoutButton = async  () => {
		await api.logout();
		navigation.reset({
			index: 1,
			routes: [{name: 'LoginScreen'}]
		})
	};

	const chooseProperty = async (property: Properties) => {
		handleProperty(property)
		navigation.reset({
			index: 1,
			routes:[{name: 'MainDrawer'}]
		})
	};

	const checkPropertySel = async () => {
		setLoading(true);
		const json = await getProperties();
			setProperties(json.properties);
			setLoading(false);
	}

	useEffect(()=>{
		
		checkPropertySel();
	},[])

  return(

			<C.Container>
				<C.Scroller>
					{loading &&
						<C.LoadingIcon color="#8863E6" size="large"/>
					}
					{!loading && properties?.length > 0 &&
						<>
							<C.HeaderTitle>Olá {user?.name}</C.HeaderTitle>
							<C.HeaderTitle>Escolha uma das suas propriedades</C.HeaderTitle>

							<C.PropertyList>
									{properties.map((item, index)=>(
										<C.ButtonArea onPress={()=>chooseProperty(item)} key={index}>
											<C.ButtonText >{item?.name}</C.ButtonText>
										</C.ButtonArea>
									))}
							</C.PropertyList>
						</>
					}
					{!loading && properties?.length <= 0 &&
						<C.BigArea>
							<C.HeaderTitle>{user.name}, parabéns pelo seu cadastro!</C.HeaderTitle>
							<C.HeaderTitle>Aguarde a administração liberar seu acesso.</C.HeaderTitle>
						</C.BigArea>
					}
					</C.Scroller>
					<C.ExitButtonArea onPress={handleLogoutButton}>
						<C.ExitButtonText>Sair</C.ExitButtonText>
					</C.ExitButtonArea>
				
    	</C.Container>
		
  )
}

export default ChoosePropertyScreen;