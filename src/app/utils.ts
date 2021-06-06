import { AbstractControl } from '@angular/forms';

export function getFormControlErrorMessage(control: AbstractControl, controlName: string): string {
  if (control.hasError('required')) {
    return `${controlName} is required`;
  }
  if (control.hasError('email')) {
    return 'Not a valid email';
  }
  if (control.hasError('pattern')) {
    return `${controlName} is not correct`;
  }
  if (control.hasError('minlength')) {
    const minLengthError = control.errors.minlength;
    return `${controlName} must has ${minLengthError.requiredLength} symbols`;
  }
  return '';
}
