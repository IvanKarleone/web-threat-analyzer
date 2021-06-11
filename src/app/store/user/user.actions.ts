import { IUser } from '../../intrerfaces/user';

const enum Actions {
  GetUsers = '[User API] GetUsers',
  GetUsersSuccess = '[User] GetUsersSuccess',
  GetUserByEmail = '[User] GetUserByEmail',
  ClearUserState = '[User] ClearUserState'
}

export class GetUsers {
  public static readonly type = Actions.GetUsers;

  constructor(public readonly idToken: string) {
  }
}

export class GetUsersSuccess {
  public static readonly type = Actions.GetUsersSuccess;

  constructor(public readonly users: IUser[]) {
  }
}

export class GetUserByEmail {
  public static readonly type = Actions.GetUserByEmail;

  constructor(public readonly email: string) {
  }
}

export class ClearUserState {
  public static readonly type = Actions.ClearUserState;
}
