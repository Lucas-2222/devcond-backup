import { request } from "../../services/api";
import { Response, Props, Login } from "./LoginScreen.types";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ServicesLogin = {
  validateLogin: async ({cpf, password}: Props): Promise<Response> => {
    let json = await request<Response>('post', '/auth/validateLogin', {cpf, password});
    await AsyncStorage.setItem('token', json.token);
    return json;
  },
  login: async ({cpf, password}: Props): Promise<Login> => {
    let json = await request<Login>('post', '/auth/validateLogin', {cpf, password});
    return json;
  }
}

export { ServicesLogin };