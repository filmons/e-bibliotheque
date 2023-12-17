import { AuthService } from '../../services/auth.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { PasswordStrengthValidator, emailValidator } from '../../components/validator/validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  title: string = 'Simple, rapide, efficace';
  imageSrc: string = '../../../assets/images/book-2.gif';
  currentBookPage: string = 'Inscription';
  password: string = '';
  
  onSignup(form: NgForm) {
    if (form.invalid) return;

    const signupFirstName = form.value.signupFirstName;
    const signupLastName = form.value.signupLastName;
    const email = form.value.email;
    const password = form.value.password;

    const passwordStrength = PasswordStrengthValidator(8, 1, 1, 1);
    const emailValidation = emailValidator();

    if (passwordStrength({ value: password } as any) === null && emailValidation({ value: email } as any) === null) {
      this.authService.signUp(email, password, signupFirstName, signupLastName)
        .then(() => {
          this.router.navigate(['/login']);
          this.toastr.success('signup successful!', 'Success');
        })
        .catch(error => {
          this.toastr.error('Something went wrong during signup.', 'Error');
          console.error(error);
        });
    } else {
      if (passwordStrength({ value: password } as any) !== null) {
        this.toastr.error('Password does not meet the strength requirements.', 'Error');
      } else {
        this.toastr.error('Invalid email format.', 'Error');
      }
    }
  }
}