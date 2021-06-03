import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Actions, ofActionCompleted, Select, Store } from '@ngxs/store';
import { ErrorAction, Login, LoginSuccess } from '../../store/login/login.actions';
import { ROUTES } from '../../consts/routes';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { LoginState } from '../../store/login/login.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  @Select(LoginState.isLogin) public isLogin$: Observable<boolean>;

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
      password: new FormControl('', Validators.required)
    });
  }

  public ngOnInit(): void {
    this.initLoginSuccessListener();
    this.initErrorListener();
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

  public onSubmit(): void {
    if (this.form.valid) {
      this.store.dispatch(new Login(this.email.value, this.password.value));
    }
  }

  private initLoginSuccessListener(): void {
    this.actions.pipe(
      ofActionCompleted(LoginSuccess),
      take(1)
    ).subscribe(() => this.router.navigate([ROUTES.main]));
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
