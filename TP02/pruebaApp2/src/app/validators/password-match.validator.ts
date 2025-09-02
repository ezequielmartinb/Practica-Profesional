import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const password2 = group.get('password2')?.value;

  return password === password2 ? null : { passwordMismatch: true };
}