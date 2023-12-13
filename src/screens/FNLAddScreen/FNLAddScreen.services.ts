import { request } from "../../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PropDocs, PropWalls } from "../../contexts/StateContext";
import { useStateUser } from "../../contexts/StateContext";
import { Fnl, lostData } from "../FNLScreen/FNLScreen.types";



const ServicesAddFnl = {

  addFnl: async (): Promise<Fnl> => {
    let json = await request<Fnl>('post', '/foundandlost', {})
    return json;
  }
}

export { ServicesAddFnl };