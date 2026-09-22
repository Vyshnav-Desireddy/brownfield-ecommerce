import { AbstractControl, ValidationErrors } from '@angular/forms';

export class Luv2ShopValidators {
  static notOnlyWhitespace(control: AbstractControl): ValidationErrors | null {
    if (control.value != null && control.value.toString().trim().length === 0) {
      return { notOnlyWhitespace: true };
    }
    return null;
  }

  static cardExpirationValid(control: AbstractControl): ValidationErrors | null {
    const group = control as any;
    const month = group.get?.('expirationMonth')?.value;
    const year = group.get?.('expirationYear')?.value;

    if (!month || !year) {
      return null;
    }

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    if (Number(year) < currentYear) {
      return { cardExpired: true };
    }
    if (Number(year) === currentYear && Number(month) < currentMonth) {
      return { cardExpired: true };
    }

    return null;
  }
}
