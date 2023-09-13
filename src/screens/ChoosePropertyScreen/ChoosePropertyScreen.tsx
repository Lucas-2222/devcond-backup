import React,{ useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import C from "./ChoosePropertyScreen.style";
import { useStateUser, Property } from '../../contexts/StateContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ServicesLogin } from './ChoosePropertyScreen.services';

const ChoosePropertyScreen = ({navigation}:NativeStackScreenProps<any>) => {
	const { logout } = ServicesLogin;
	const { user, handleProperty } = useStateUser();
	const [loading, setLoading] = useState(true);

	const handleLogoutButton = async  () => {
		await logout();
		navigation.reset({
			index: 1,
			routes: [{name: 'LoginScreen'}]
		})
	};

	const chooseProperty = async (property: Property[]) => {
		handleProperty(property)

		navigation.reset({
			index: 1,
			routes:[{name: 'MainDrawer'}]
		})
	};

	useEffect(()=>{
		const checkPropertySel = async () => {
			let property = await AsyncStorage.getItem('property');
			if(property) {
				property = JSON.parse(property);
			}
			setLoading(false);
		}
		checkPropertySel();
	},[])

  return(
    <C.Container>
				<C.Scroller>
					{loading &&
						<C.LoadingIcon color="#8863E6" size="large"/>
					}
					{!loading && user?.properties?.length > 0 &&
						<>
							<C.HeaderTitle>Olá {user?.name}</C.HeaderTitle>
							<C.HeaderTitle>Escolha uma das suas propriedades</C.HeaderTitle>

							<C.PropertyList>
									{user.properties.map((item, index)=>(
										<C.ButtonArea key={index} onPress={()=>{}}>
											<C.ButtonText>{item.name}</C.ButtonText>
										</C.ButtonArea>
									))}
							</C.PropertyList>
						</>
					}
					{!loading && user?.properties?.length <= 0 &&
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