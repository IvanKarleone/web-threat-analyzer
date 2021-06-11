import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IEmailMessage, IEmailMessageSuccess } from '../intrerfaces/email-message';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ILoginRequest, ILoginResponse } from '../intrerfaces/login';
import { EMAIL_MESSAGE_URL, FIREBASE_API_URL, FIREBASE_DB_USERS_URL, VIRUS_TOTAL_API_URL } from '../consts/urls.const';
import { IUser } from '../intrerfaces/user';
import { IAnalyzeAttributes, IAnalyzeDataResponse, IUrlId, IUrlIdResponse } from '../intrerfaces/scan';
import { pluck } from 'rxjs/operators';

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

    return this.http.post<ILoginResponse>(`${FIREBASE_API_URL}/accounts:signInWithPassword?key=${environment.apiKey}`, body);
  }

  public getUsers(idToken: string): Observable<IUser[]> {
    const params = new HttpParams().set('auth', idToken);

    return this.http.get<IUser[]>(FIREBASE_DB_USERS_URL, { params });
  }

  public getUrlId(apiKey: string, url: string): Observable<IUrlId> {
    const body = new URLSearchParams();
    body.append('url', url);

    const headers: HttpHeaders = new HttpHeaders()
      .set('Content-type', 'application/x-www-form-urlencoded')
      .set('x-apikey', apiKey);

    return this.http.post<IUrlIdResponse>(`${VIRUS_TOTAL_API_URL}/urls`, body.toString(), { headers }).pipe(
      pluck('data')
    );
  }

  public getAnalyzeData(apiKey: string, urlId: string): Observable<IAnalyzeAttributes> {
    const url = `${VIRUS_TOTAL_API_URL}/analyses/${urlId}`;

    const headers: HttpHeaders = new HttpHeaders().set('x-apikey', apiKey);

    return this.http.get<IAnalyzeDataResponse>(url, {headers}).pipe(
      pluck('data', 'attributes')
    );
  }
}
