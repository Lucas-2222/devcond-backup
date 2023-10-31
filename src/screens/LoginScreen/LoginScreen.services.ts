import { request } from "../../services/api";
import { Response, Props } from "./LoginScreen.types";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ServicesLogin = {
  login: async ({email, password}: Props): Promise<Response> => {
    let json = await request<Response>('post', '/auth/signin', {email, password});
    if(json.error === '') {
      await AsyncStorage.setItem('token', json.token);
      await AsyncStorage.setItem('hash', json.hash);
    }
    return json;
  }
}

export { ServicesLogin };