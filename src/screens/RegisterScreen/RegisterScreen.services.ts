import { request } from "../../services/api";
import { Response, Props, Register, RequestRegister } from "./";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ServicesRegister = {
  register: async ({ name, cpf, email, password }: RequestRegister): Promise<Register> => {
    let json = await request<Register>('post', '/auth/register', {name, email, cpf, password});
    return json;
  }
}

export { ServicesRegister };