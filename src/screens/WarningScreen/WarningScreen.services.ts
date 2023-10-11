import { request } from "../../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  PropWarns } from "../../contexts/StateContext";
import { useStateUser } from "../../contexts/StateContext";



const ServicesLogin = {

  getWarnings: async (id: number): Promise<PropWarns> => {
    let json: PropWarns = await request('get', '/warnings', {id});
    return json;
  }
}

export { ServicesLogin };