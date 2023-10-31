import { request } from "../../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ResponseProperty } from "./ChoosePropertyScreen.types";

const ServicesChooseProperty = {
  getProperties: async (): Promise<ResponseProperty> => {
    let json = await request<ResponseProperty>('get', '/properties');
    return json;
  }
}

export { ServicesChooseProperty };