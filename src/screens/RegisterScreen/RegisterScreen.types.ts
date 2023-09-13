export type Response = {
  token: string;
}

export type Props = {
  cpf: string;
  password: string;
}


type User = {
    id: number;
    name: string;
    email: string;
    cpf: string;
    password: string;
  }


export type Register = {
    token: string;
    user: User;
    error: string;
}

export type RequestRegister = {
  name: string;
  email: string;
  cpf: string;
  password: string;
}