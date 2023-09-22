import { request } from "../../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ServicesLogin = {
  logout: async () => {
    try {
      let token = await AsyncStorage.getItem('token');
      let json = await request('post', '/auth/logout', {});
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('property');
      return json;  
    } catch (error) {
      console.log(error)
    }
    
  }
}

export { ServicesLogin };