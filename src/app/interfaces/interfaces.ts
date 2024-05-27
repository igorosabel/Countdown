import { UserInterface } from '@interfaces/user.interfaces';

export interface LoginData {
  username: string;
  pass: string;
}

export interface LoginResult {
  status: string;
  user: UserInterface;
}
