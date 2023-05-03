import { User } from "../models/user.model";
export interface RestLogin {
  ok: boolean,
  token: string,
  user: User
}

export interface LoginForm {
  email: string;
  password: string;
}