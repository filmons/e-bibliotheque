import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'passwordStrength'
})
export class PasswordStrengthPipe implements PipeTransform {
  transform(value: string): string {
    if (value.length < 6) return 'Faible';
    else if (value.length < 10) return 'Moyen';
    else return 'Fort';
  }
}