import { request } from "../../services/api";
import { DisabledProps } from "./ReservationAddScreen.types";


const ServicesAddReservation = {
  getDisabledDates: async (id: string): Promise<DisabledProps> => {
    let json = await request<DisabledProps>('get', `/reservations/dates/${id}`, {});
    return json;
  }
}

export { ServicesAddReservation };