import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Actions, ofActionCompleted, Store } from '@ngxs/store';
import { ErrorAction, Login } from '../../store/login/login.actions';
import { ROUTES } from '../../consts/routes.const';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { getFormControlErrorMessage } from '../../utils';
import { GetUserByEmail, GetUsersSuccess } from '../../store/user/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public isCorrectCredentials: boolean = true;

  public get email(): AbstractControl {
    return this.form.controls.email;
  }

  public get password(): AbstractControl {
    return this.form.controls.password;
  }

  constructor(private store: Store, private actions: Actions, private router: Router, private ref: ChangeDetectorRef) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  public ngOnInit(): void {
    this.initGetUsersSuccessListener();
    this.initErrorListener();
  }

  public getErrorMessage(control: AbstractControl, controlName: string): string {
    return getFormControlErrorMessage(control, controlName);
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.store.dispatch(new Login(this.email.value, this.password.value));
    }
  }

  private initGetUsersSuccessListener(): void {
    this.actions.pipe(
      ofActionCompleted(GetUsersSuccess),
      take(1)
    ).subscribe(() => {
      this.store.dispatch(new GetUserByEmail(this.email.value));
      this.router.navigate([ROUTES.main]);
    });
  }

  private initErrorListener(): void {
    this.actions.pipe(
      ofActionCompleted(ErrorAction),
      take(1)
    ).subscribe(() => {
      this.isCorrectCredentials = false;
      this.ref.detectChanges();
    });
  }
}
