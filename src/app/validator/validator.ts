//validator.ts

import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordStrengthValidator(minLength: number, minUppercase: number, minLowercase: number, minNumbers: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    console.log('Password validator checking...');

    const password: string = control.value;

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);

    const isPasswordValid =
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers;

    if (!isPasswordValid) {
      return {
        passwordStrength: {
          requiredLength: minLength,
          requireUppercase: minUppercase,
          requireLowercase: minLowercase,
          requireNumbers: minNumbers,
          actual: control.value,
        },
      };
    }

    return null;
  };
}
export function emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      console.log('Email validator checking...');
  
      const email: string = control.value;
  
      // Regular expression for basic email validation
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
      const isEmailValid = emailPattern.test(email);
  
      if (!isEmailValid) {
        return {
          emailInvalid: {
            actual: control.value,
          },
        };
      }
  
      return null;
    };
  }
