import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {IEmailMessage, IEmailMessageSuccess} from '../intrerfaces/email-message';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(protected http: HttpClient) {
  }

  public sendEmailMessage(url: string, body: IEmailMessage): Observable<IEmailMessageSuccess> {
    return this.http.post<IEmailMessageSuccess>(url, body);
  }
}
