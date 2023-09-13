import { request } from "../../services/api";
import { Response } from "./PreloadScreen.types";
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from "../../services/api";

const ServicesPreaload = {
  validateToken: async (): Promise<Response> => {
    let token = api.getToken();
    let json = await request<Response>('post', '/auth/validate', token);
    await AsyncStorage.setItem('token', json.login.token);
    return json;
  }
}

export { ServicesPreaload };