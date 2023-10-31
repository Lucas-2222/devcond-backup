import React,{ useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Container, Field, Logo, ButtonText, ButtonArea } from "./LoginScreen.style";
import { useStateUser} from '../../contexts/StateContext';
import { ServicesLogin } from './LoginScreen.services';

const LoginScreen = ({navigation}:NativeStackScreenProps<any>) => {
	
	const { login } = ServicesLogin;

	const { user, handleUser } = useStateUser();
	
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLoginButton = async () => {
		if(email && password) {
			let result = await login({email, password});
			if(result.error == '') {
				handleUser({...result});
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
				placeholder='Digite seu email'
				value={email}
				onChangeText={(value: string)=>setEmail(value)}
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