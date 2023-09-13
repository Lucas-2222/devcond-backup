import React,{ useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Container, Field, Logo, ButtonText, ButtonArea } from "./RegisterScreen.style";
import { useStateUser} from '../../contexts/StateContext';
import { ServicesRegister } from './RegisterScreen.services';

const RegisterScreen = ({navigation}: NativeStackScreenProps<any>) => {
	const { register } = ServicesRegister;

	const {user, handleUser } = useStateUser();
	
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [cpf, setCpf] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');

	useEffect(()=>{
		navigation.setOptions({headerTitle: 'Cadastro'})
	},[])

	const handleRegister  = async () => {
		if (!name || !email || !cpf || !password || !confirmPassword) {
      console.log('Preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      console.log('As senhas não coincidem.');
      return;
    }

    try {
      const registrationResult  = await register({
        name,
        email,
        cpf,
        password,
      });

      if (registrationResult) {
        console.log('Registro bem-sucedido.');
        navigation.navigate('LoginScreen');
      } else {
        console.log('Falha no registro.');
      }
    } catch (error) {
      console.error('Erro ao registrar:', error);
      console.log('Erro ao registrar.');
    }
	}	

  return(
    <Container>
			<Logo 
				source={require('../../assets/undraw_home.png')}
				resizeMode='contain'
			/>
			<Field 
				placeholder='Digite seu Nome Completo'
				value={name}
				onChangeText={(value: string)=>setName(value)}
			/>
			<Field 
				placeholder='Digite seu E-mail'
				value={email}
				onChangeText={(value: string)=>setEmail(value)}
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
			<Field 
				placeholder='Confirme sua senha'
				secureTextEntry={true}
				value={confirmPassword}
				onChangeText={(value: string)=>setConfirmPassword(value)}
			/>
			<ButtonArea onPress={handleRegister}>
				<ButtonText>CADASTRAR-SE</ButtonText>
			</ButtonArea>
    </Container>
  )
}

export default RegisterScreen;