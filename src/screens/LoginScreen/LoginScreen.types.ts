import { User } from "../../contexts/StateContext.type";

export type Props = {
  email: string;
  password: string;
}

export type Response = {
  error?: string;
  token: string;
  name: string;
  hash: string;
}
