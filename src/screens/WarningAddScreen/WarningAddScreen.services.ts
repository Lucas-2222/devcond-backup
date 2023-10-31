import { request } from "../../services/api";
import { PropAddWarn, Photos } from "../../contexts/StateContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ServicesAddWarning = {
  // addWarning: async (title: string, list: Photos[]): Promise<PropAddWarn> => {
  //   let json = await request<PropAddWarn>('post', '/warning', {
  //     title,
  //     list
  //   });
  //   return json;
  // }
}

export { ServicesAddWarning };