export interface UserInterface {
  id: number | null;
  username: string | null;
  pass: string | null;
  conf_pass: string | null;
  token: string | null;
}

export interface LoginData {
  username: string | null;
  pass: string | null;
}

export interface LoginValidation {
  username: boolean;
  pass: boolean;
}

export interface LoginResult {
  status: string;
  user: UserInterface;
}

export interface RegisterData {
  username: string | null;
  pass: string | null;
  conf: string | null;
}

export interface RegisterValidation {
  username: boolean;
  pass: boolean;
  conf: boolean;
  passMatch: boolean;
}
