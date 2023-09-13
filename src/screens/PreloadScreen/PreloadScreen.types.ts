import { Login, User } from '../LoginScreen/LoginScreen.types'

export interface ApiResponse {
  error?: string;
  login: Login;

}

export type Response = {
  error: string;
  login: Login;
}