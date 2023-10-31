import { request } from "../../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PropDocs, PropWalls } from "../../contexts/StateContext";

const ServicesDoc = {
  getDocs: async (): Promise<PropDocs> => {
    let token = await AsyncStorage.getItem('token');
    let json: PropDocs = await request('get', '/docs', {});
    return json;
  }
}

export { ServicesDoc };