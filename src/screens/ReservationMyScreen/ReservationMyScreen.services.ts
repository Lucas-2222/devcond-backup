import { request } from "../../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PropDocs, PropList, PropWalls } from "../../contexts/StateContext";
import { useStateUser } from "../../contexts/StateContext";
import { MyReservations, RemoveReserv } from "./ReservationMyScreen.types";



const ServicesMyScreen = {

  getMyReservations: async (): Promise<PropList> => {
    let json = await request<PropList>('get', `/reservationsmyscreen`, {});
    return json;
  },
  removeReservations: async (id: string): Promise<RemoveReserv> => {
    let json = await request<RemoveReserv>('delete', `/reservationsmyscreen/${id}`, {});
    return json;
  }
}

export { ServicesMyScreen };