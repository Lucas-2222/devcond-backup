import { baseUrl, request } from "../../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  File, PropFile, PropWarns } from "../../contexts/StateContext";
import { useStateUser } from "../../contexts/StateContext";

type PropPhotosAdd = {
	photos: Photos[];
}

type Photos = {
	url: string;
}


const ServicesAddWarning = {
  addWarning: async (title, list) => {
    let json = await request('post', '/warning', {
      title,
      list
    });
    return json;
  }
}

export { ServicesAddWarning };