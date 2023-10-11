import { request } from "../../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PropDocs, PropWalls } from "../../contexts/StateContext";
import { useStateUser } from "../../contexts/StateContext";



const ServicesLogin = {

  getBillets: async (id: number): Promise<PropDocs> => {
    let json: PropDocs = await request('get', '/billets', {id});
    return json;
  }
}

export { ServicesLogin };