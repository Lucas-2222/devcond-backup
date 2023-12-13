import { request } from "../../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PropDocs, PropWalls } from "../../contexts/StateContext";
import { Fnl, recData } from "./FNLScreen.types";

const ServicesFNL = {
  getFnls: async (): Promise<Fnl> => {
    let json = await request<Fnl>('get', '/foundandlost', {})
    return json;
  },
  putFnl: async (id: string): Promise<Fnl> => {
    let json = await request<Fnl>('put', `/foundandlost/${id}`, {
      status: 'recovered'
    })
    return json;
  }
}

export { ServicesFNL };