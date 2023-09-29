import { request } from "../../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PropWalls } from "../../contexts/StateContext";

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
    
  },
  getWall: async (): Promise<PropWalls> => {
    let token = await AsyncStorage.getItem('token');
    let json: PropWalls = await request('get', '/walls', {});
    return json;
  }
}

export { ServicesLogin };