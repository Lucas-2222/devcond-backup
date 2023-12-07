import { request } from "../../services/api";
import { DataTimes, DisabledProps, ReservSaved, Saved, Times } from "./ReservationAddScreen.types";


const ServicesAddReservation = {
  getDisabledDates: async (id: string): Promise<DisabledProps> => {
    let json = await request<DisabledProps>('get', `/reservations/dates/${id}`, {});
    return json;
  },
  getReservationsTime: async (id: string, dates: string): Promise<Times> => {
    let json = await request<Times>('get', `/reservationstimes/${id}/${dates}`, {})
    return json;
  },
  setReservations: async (idReservationType: string, time: string, date: string, title: string, cover: string, dates: string): Promise<Saved> => {
    let json = await request<Saved>('post', '/reservationsmyscreen', {date, idReservationType, time, cover, title, dates});
    return json;
  }
 }

export { ServicesAddReservation };