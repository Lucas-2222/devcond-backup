import { PropReservations } from "../../contexts/StateContext";
import { request } from "../../services/api";

const ServicesReservation = {
  getReservations: async (): Promise<PropReservations> => {
    let json = await request<PropReservations>('get', '/reservations', {});
    return json;
  }
}

export { ServicesReservation };