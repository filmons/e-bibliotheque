// this is the password.pip.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'passwordStrength'
})
export class PasswordStrengthPipe implements PipeTransform {
  transform(value: string): string {
    // Your password strength logic here
    // You can return different strength levels based on your criteria

    if (value.length < 6) {
      return 'Weak';
    } else if (value.length < 10) {
      return 'Moderate';
    } else {
      return 'Strong';
    }
  }
}
