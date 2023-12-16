// signup.component.ts
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(
    private authService: AuthService,
     private router: Router,
    private toastr: ToastrService) { }


  onSignup(form: NgForm) {
    if (form.invalid) return;
    const signupFirstName = form.value.signupFirstName;
    const signupLastName = form.value.signupLastName;
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signUp(email, password, signupFirstName, signupLastName).then(() => {
      this.router.navigate(['/login']);
      this.toastr.success('Your action was successful!', 'Success');

    }).catch(error => {
      // Display error message
      this.toastr.error('Something went wrong.', 'Error');
      console.error(error);
      // You can set an error message to display to the user here
    });
  }
}
