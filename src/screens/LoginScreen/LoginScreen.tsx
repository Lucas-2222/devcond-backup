import React,{ useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Container, Field, Logo, ButtonText, ButtonArea } from "./LoginScreen.style";
import { useStateUser} from '../../contexts/StateContext';
import { ServicesLogin } from './LoginScreen.services';
import { Login } from './LoginScreen.types';


const LoginScreen = ({navigation}:NativeStackScreenProps<any>) => {
	const { validateLogin, login } = ServicesLogin;

	//const navigation = useNavigation();

	const { user, handleUser } = useStateUser();
	
	const [cpf, setCpf] = useState('');
	const [password, setPassword] = useState('');

	const handleLoginButton = async () => {
		if(cpf && password) {
			let result: Login = await login({cpf, password});
			if(result.error == '') {
				handleUser(result);
				navigation.reset({
					index:1,
					routes:[{ name: 'ChoosePropertyScreen' }]
				})
			} else {
				console.log(result.error);
			}
		} else {
			console.log('Preencha os campos')
		}
	}


	const handleRegisterButton = () => {
		navigation.navigate('RegisterScreen');
	}
 

  return(
    <Container>
			<Logo 
				source={require('../../assets/undraw_home.png')}
				resizeMode='contain'
			/>
			<Field 
				placeholder='Digite seu CPF'
				keyboardType='numeric'
				value={cpf}
				onChangeText={(value: string)=>setCpf(value)}
			/>
			<Field 
				placeholder='Digite sua senha'
				secureTextEntry={true}
				value={password}
				onChangeText={(value: string)=>setPassword(value)}
			/>
			<ButtonArea onPress={handleLoginButton}>
				<ButtonText>ENTRAR</ButtonText>
			</ButtonArea>
			<ButtonArea onPress={handleRegisterButton}>
				<ButtonText>CADASTRAR-SE</ButtonText>
			</ButtonArea>
    </Container>
  )
}

export default LoginScreen;