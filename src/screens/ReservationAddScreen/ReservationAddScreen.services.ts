import { request } from "../../services/api";
import { DataTimes, DisabledProps, ReservSaved, Saved, Times } from "./ReservationAddScreen.types";


const ServicesAddReservation = {
  getDisabledDates: async (id: string): Promise<DisabledProps> => {
    let json = await request<DisabledProps>('get', `/reservations/dates/${id}`, {});
    return json;
  },
  getReservationsTime: async (id: string): Promise<Times> => {
    let json = await request<Times>('get', `/reservationstimes/${id}/2023-11-22`, {})
    console.log(json);
    return json;
  },
  setReservations: async (idReservationsType: string, time: string, date: string): Promise<Saved> => {
    let json = await request<Saved>('post', '/reservationssaved', {date, idReservationsType, time});
    return json;
  }
 }

export { ServicesAddReservation };