import { ILoginResponse } from '../../intrerfaces/login';

const enum Actions {
  Login = '[Login API] Login',
  LoginSuccess = '[Login] LoginSuccess',
  Logout = '[Login] Logout',
  ErrorAction = '[Login] ErrorAction'
}

export class Login {
  public static readonly type = Actions.Login;

  constructor(public readonly email: string, public readonly password: string) {
  }
}

export class LoginSuccess {
  public static readonly type = Actions.LoginSuccess;

  constructor(public readonly response: ILoginResponse) {
  }
}

export class Logout {
  public static readonly type = Actions.Logout;
}

export class ErrorAction {
  public static readonly type = Actions.ErrorAction;

  constructor(public readonly message: string) {
  }
}
