import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ApiService } from '../../services/api-service';
import { ErrorAction, Login, LoginSuccess, Logout } from './login.actions';
import { ILoginResponse } from '../../intrerfaces/login';
import { take, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { LOGIN_STORAGE_KEYS } from '../../consts/storages';
import { Observable } from 'rxjs';

export class LoginStateModel {
  email: string;
  idToken: string;
  expiresIn: number;

  public static getInitialState(): LoginStateModel {
    return {
      email: '',
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
  public static isLogin(state: LoginStateModel): boolean {
    return state.expiresIn >= Date.now();
  }

  @Action(Login)
  public login(ctx: StateContext<LoginStateModel>, { email, password }: Login): Observable<ILoginResponse> {
    return this.apiService.login(email, password).pipe(
      take(1),
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
      email: response.email,
      idToken: response.idToken,
      expiresIn
    });
  }

  @Action(Logout)
  public logout(ctx: StateContext<LoginStateModel>): void {
    ctx.setState(LoginStateModel.getInitialState());
    localStorage.removeItem(LOGIN_STORAGE_KEYS.expiresIn);
    localStorage.removeItem(LOGIN_STORAGE_KEYS.formattedExpiresIn);
  }

  @Action(ErrorAction)
  public errorAction(ctx: StateContext<LoginStateModel>, { message }: ErrorAction): void {
    console.log(message);
  }
}
