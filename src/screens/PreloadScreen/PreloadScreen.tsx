import React,{ useEffect } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Container, LoadingIcon } from "./PreloadScreen.style";
import { useStateUser } from '../../contexts/StateContext';

import { ServicesPreaload } from './PreloadScreen.services';

import api from '../../services/api';

import { ApiResponse } from './preloadScreen.types';

const PreloadScreen = ({navigation}: NativeStackScreenProps<any>) => {
	const { validateToken } = ServicesPreaload;
	const { handleUser } = useStateUser();

	useEffect(()=> {
		const checkLogin = async () => {
			let token = await api.getToken();
			if(token) {
				let result: ApiResponse = await validateToken();
				if(result.error === '') {
					handleUser(result.login);
					navigation.reset({
						index: 1,
						routes:[{name: 'ChoosePropertyScreen'}]
					})
				} else {
					
					navigation.reset({
						index: 1,
						routes:[{name: 'LoginScreen'}]
					})
				}
			} else {
				navigation.reset({
						index: 1,
						routes:[{name: 'LoginScreen'}]
				})
			}
		}
		checkLogin();
	},[]);

  return(
    <Container>
		  <LoadingIcon color='#8863E6' size='large'/>
    </Container>
  )
}

export default PreloadScreen;