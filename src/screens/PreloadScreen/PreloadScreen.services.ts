import { request } from "../../services/api";
import { Response } from "./PreloadScreen.types";

const ServicesPreaload = {
  validateToken: async (): Promise<Response> => {
    let json = await request<Response>('post', '/auth/validate');
    return json;
  }
}

export { ServicesPreaload };