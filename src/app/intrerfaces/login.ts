export interface ILoginRequest {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

export interface ILoginResponse {
  email: string;
  idToken: string;
  expiresIn: string;
}
