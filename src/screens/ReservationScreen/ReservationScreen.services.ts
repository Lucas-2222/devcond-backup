import { PropReservations } from "../../contexts/StateContext";
import { request } from "../../services/api";

const ServicesReservation = {
  getReservationsType: async (): Promise<PropReservations> => {
    let json = await request<PropReservations>('get', '/reservationsType', {});
    return json;
  }
}

export { ServicesReservation };