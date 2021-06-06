import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IEmailMessage, IEmailMessageSuccess } from '../intrerfaces/email-message';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ILoginRequest, ILoginResponse } from '../intrerfaces/login';
import { EMAIL_MESSAGE_URL, FIREBASE_API_URL, FIREBASE_DB_USERS_URL } from '../consts/urls.const';
import { IUser } from '../intrerfaces/user';

@Injectable()
export class ApiService {
  constructor(protected http: HttpClient) {
  }

  public sendEmailMessage(body: IEmailMessage): Observable<IEmailMessageSuccess> {
    return this.http.post<IEmailMessageSuccess>(EMAIL_MESSAGE_URL, body);
  }

  public login(email: string, password: string): Observable<ILoginResponse> {
    const body: ILoginRequest = {
      email,
      password,
      returnSecureToken: true
    };

    return this.http.post<ILoginResponse>(`${FIREBASE_API_URL}accounts:signInWithPassword?key=${environment.apiKey}`, body);
  }

  public getUsers(idToken: string): Observable<IUser[]> {
    const params = new HttpParams().set('auth', idToken);

    return this.http.get<IUser[]>(FIREBASE_DB_USERS_URL, { params });
  }
}
