export interface IEmailMessage {
  name: string;
  surname: string;
  email: string;
  message: string;
}

export interface IEmailMessageSuccess {
  next: string;
  ok: boolean;
}
