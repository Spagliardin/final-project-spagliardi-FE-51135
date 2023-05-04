import { User } from "../models/user.model";
export interface RestLogin {
  ok: boolean,
  token: string,
  user: User
}

export interface RestGoogleLogin {
  ok: boolean,
  payload : payloadTokenGoogle
}

interface payloadTokenGoogle {
  email: string,
  name: string,
  img: string,
  token: string
}

export interface LoginForm {
  email: string;
  password: string;
}