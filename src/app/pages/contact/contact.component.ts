import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ContactFormGroup } from './contact-form-group';
import { ApiService } from '../../services/api-service';
import { IEmailMessage } from '../../intrerfaces/email-message';
import { take, tap } from 'rxjs/operators';
import { getFormControlErrorMessage } from '../../utils';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent {
  public form: ContactFormGroup;
  public sendEmailMessage: string = '';

  constructor(private apiService: ApiService, private ref: ChangeDetectorRef) {
    this.form = new ContactFormGroup();
  }

  public getErrorMessage(control: AbstractControl, controlName: string): string {
    return getFormControlErrorMessage(control, controlName);
  }

  onSubmit(): void {
    if (this.form.valid) {
      const emailMessage: IEmailMessage = {
        name: this.form.name.value,
        surname: this.form.surname.value,
        email: this.form.email.value,
        message: this.form.message.value,
      };

      this.apiService.sendEmailMessage(emailMessage).pipe(
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
