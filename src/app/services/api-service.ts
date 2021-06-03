import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEmailMessage, IEmailMessageSuccess } from '../intrerfaces/email-message';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ILoginRequest, ILoginResponse } from '../intrerfaces/login';
import { EMAIL_MESSAGE_URL, FIREBASE_URL } from '../consts/urls';

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

    return this.http.post<ILoginResponse>(`${FIREBASE_URL}accounts:signInWithPassword?key=${environment.apiKey}`, body);
  }
}
