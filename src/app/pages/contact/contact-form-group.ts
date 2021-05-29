import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

export class ContactFormGroup extends FormGroup {
  public get name(): AbstractControl {
    return this.controls.name;
  }

  public get surname(): AbstractControl {
    return this.controls.surname;
  }

  public get email(): AbstractControl {
    return this.controls.email;
  }

  public get message(): AbstractControl {
    return this.controls.message;
  }

  constructor() {
    super({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', Validators.required),
    });
  }
}
