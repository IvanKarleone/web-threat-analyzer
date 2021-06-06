import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ApiService } from '../../services/api-service';
import { ErrorAction, Login, LoginSuccess, Logout } from './login.actions';
import { ILoginResponse } from '../../intrerfaces/login';
import { tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { LOGIN_STORAGE_KEYS } from '../../consts/storages.const';
import { Observable } from 'rxjs';
import { ClearUserState, GetUsers } from '../user/user.actions';

export class LoginStateModel {
  idToken: string;
  expiresIn: number;

  public static getInitialState(): LoginStateModel {
    return {
      idToken: '',
      expiresIn: 0
    };
  }
}

@Injectable()
@State<LoginStateModel>({
  name: 'LoginState',
  defaults: LoginStateModel.getInitialState()
})
export class LoginState {
  constructor(private apiService: ApiService) {
  }

  @Selector()
  public static expiresIn(state: LoginStateModel): number {
    return state.expiresIn;
  }

  @Selector()
  public static idToken(state: LoginStateModel): string {
    return state.idToken;
  }

  @Action(Login)
  public login(ctx: StateContext<LoginStateModel>, { email, password }: Login): Observable<ILoginResponse> {
    return this.apiService.login(email, password).pipe(
      tap({
        next: (response: ILoginResponse) => ctx.dispatch(new LoginSuccess(response)),
        error: ({ message }: HttpErrorResponse) => ctx.dispatch(new ErrorAction(message))
      })
    );
  }

  @Action(LoginSuccess)
  public loginSuccess(ctx: StateContext<LoginStateModel>, { response }: LoginSuccess): void {
    const expiresIn = Date.now() + +response.expiresIn * 1000;
    localStorage.setItem(LOGIN_STORAGE_KEYS.expiresIn, expiresIn.toString());
    localStorage.setItem(LOGIN_STORAGE_KEYS.formattedExpiresIn, new Date(expiresIn).toString());

    ctx.setState({
      idToken: response.idToken,
      expiresIn
    });
    ctx.dispatch(new GetUsers(response.idToken));
  }

  @Action(Logout)
  public logout(ctx: StateContext<LoginStateModel>): void {
    localStorage.removeItem(LOGIN_STORAGE_KEYS.expiresIn);
    localStorage.removeItem(LOGIN_STORAGE_KEYS.formattedExpiresIn);
    ctx.setState(LoginStateModel.getInitialState());
    ctx.dispatch(new ClearUserState());
  }

  @Action(ErrorAction)
  public errorAction(ctx: StateContext<LoginStateModel>, { message }: ErrorAction): void {
    console.log(message);
  }
}
