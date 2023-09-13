export type Response = {
  token: string;
}

export type Props = {
  cpf: string;
  password: string;
}

type Properties = {
  id: number;
  name: string;
}

export type User = {
    id: number;
    name: string;
    email: string;
    cpf: string;
    password: string;
    properties: Properties[]
  }


export interface Login extends User {
    token: string;
    error?: string;
}