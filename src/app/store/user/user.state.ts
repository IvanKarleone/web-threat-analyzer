import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ApiService } from '../../services/api-service';
import { IUser } from '../../intrerfaces/user';
import { ClearUserState, GetUserByEmail, GetUsers, GetUsersSuccess } from './user.actions';
import { tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorAction } from '../login/login.actions';
import { Observable } from 'rxjs';
import { LoginState } from '../login/login.state';

export class UserStateModel {
  users: IUser[];
  currentUser: IUser;

  public static getInitialState(): UserStateModel {
    return {
      users: [],
      currentUser: null
    };
  }
}

@Injectable()
@State<UserStateModel>({
  name: 'UserState',
  defaults: UserStateModel.getInitialState()
})
export class UserState {
  constructor(private apiService: ApiService) {
  }

  @Selector([LoginState.expiresIn])
  public static isLogin(state: UserStateModel, expiresIn: number): boolean {
    return state.currentUser !== null && expiresIn >= Date.now();
  }

  @Selector()
  public static fullName(state: UserStateModel): string {
    return `${state.currentUser.name} ${state.currentUser.surname}`;
  }

  @Selector()
  public static apiKey(state: UserStateModel): string {
    return state.currentUser.virusTotalApiKey;
  }

  @Action(GetUsers)
  public getUsers(ctx: StateContext<UserStateModel>, { idToken }: GetUsers): Observable<IUser[]> {
    if (ctx.getState().users.length !== 0) {
      return;
    }

    return this.apiService.getUsers(idToken).pipe(
      tap({
        next: (users: IUser[]) => ctx.dispatch(new GetUsersSuccess(users)),
        error: ({ message }: HttpErrorResponse) => ctx.dispatch(new ErrorAction(message))
      })
    );
  }

  @Action(GetUsersSuccess)
  public getUsersSuccess(ctx: StateContext<UserStateModel>, { users }: GetUsersSuccess): void {
    ctx.patchState({
      users
    });
  }

  @Action(GetUserByEmail)
  public getUserByEmail(ctx: StateContext<UserStateModel>, { email }: GetUserByEmail): void {
    const currentUser: IUser = ctx.getState().users.find((user: IUser) => user.email === email);

    ctx.patchState({
      currentUser
    });
  }

  @Action(ClearUserState)
  public clearUserState(ctx: StateContext<UserStateModel>): void {
    ctx.setState(UserStateModel.getInitialState());
  }
}
