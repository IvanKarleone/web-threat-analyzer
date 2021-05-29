import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ContactFormGroup } from './contact-form-group';
import { ApiService } from '../../services/api-service';
import { IEmailMessage } from '../../intrerfaces/email-message';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent {
  public form: ContactFormGroup;
  public URL: string = 'https://formspree.io/f/xjvjwwng';
  public sendEmailMessage: string = '';

  constructor(private apiService: ApiService, private ref: ChangeDetectorRef) {
    this.form = new ContactFormGroup();
  }

  public getErrorMessage(control: AbstractControl, controlName: string): string {
    if (control.hasError('required')) {
      return `${controlName} is required`;
    }
    if (control.hasError('email')) {
      return 'Not a valid email';
    }
    return '';
  }

  onSubmit(): void {
    if (this.form.valid) {
      const emailMessage: IEmailMessage = {
        name: this.form.name.value,
        surname: this.form.surname.value,
        email: this.form.email.value,
        message: this.form.message.value,
      };

      this.apiService.sendEmailMessage(this.URL, emailMessage).pipe(
        take(1),
        tap({
          next: () => {
            this.form.reset();
            this.sendEmailMessage = `Your message was successfully send! :)`;
            this.ref.detectChanges();
          },
          error: () => {
            this.sendEmailMessage = `Your message was not send :( Try again.`;
            this.ref.detectChanges();
          }
        })
      ).subscribe();
    }
  }
}
