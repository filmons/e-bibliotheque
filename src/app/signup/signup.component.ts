import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { passwordStrengthValidator, emailValidator } from '../validator/validator'; // Adjust the path accordingly

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

  onSignup(form: NgForm) {
    if (form.invalid) return;

    const signupFirstName = form.value.signupFirstName;
    const signupLastName = form.value.signupLastName;
    const email = form.value.email;
    const password = form.value.password;

    const passwordStrength = passwordStrengthValidator(8, 1, 1, 1);
    const emailValidation = emailValidator();

    if (passwordStrength({ value: password } as any) === null && emailValidation({ value: email } as any) === null) {
      // If both password and email are valid, proceed with signup
      this.authService.signUp(email, password, signupFirstName, signupLastName)
        .then(() => {
          this.router.navigate(['/login']);
          this.toastr.success('Your action was successful!', 'Success');
        })
        .catch(error => {
          // Display error message
          this.toastr.error('Something went wrong during signup.', 'Error');
          console.error(error);
        });
    } else {
      // Display error message based on which validation failed
      if (passwordStrength({ value: password } as any) !== null) {
        this.toastr.error('Password does not meet the strength requirements.', 'Error');
      } else {
        this.toastr.error('Invalid email format.', 'Error');
      }
    }
  }
}
