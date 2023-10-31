import { request } from "../../services/api";
import {  PropWarns } from "../../contexts/StateContext";

const ServicesWarning = {
  getWarnings: async (): Promise<PropWarns> => {
    let json = await request<PropWarns>('get', '/warningsphotos', {});
    return json;
  }
}

export { ServicesWarning };