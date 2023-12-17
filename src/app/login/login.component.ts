// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { passwordStrengthValidator } from '../validator/validator'; // Adjust the path accordingly
import { FormControl, FormGroup, Validators } from '@angular/forms'; // Import necessary forms modules
import { PasswordStrengthPipe } from '../pipes/password.pipe'; //

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup; // Define a FormGroup to manage the login form
  loginEmail: string = '';
  loginPassword: string = '';

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {
    // Initialize the login form in the constructor
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onLogin() {
    // Assuming you want to check password strength on login as well
    const passwordStrength = passwordStrengthValidator(8, 1, 1, 1);
    const passwordPipe = new PasswordStrengthPipe();

    
    if (this.loginForm.get('password')!.value && passwordStrength(this.loginForm.get('password')!)) {
      // If the password meets the strength requirements, proceed with login
      this.authService.login(this.loginEmail, this.loginForm.get('password')!.value)
        .then(() => {
          this.router.navigate(['/books']);
        })
        .catch(error => {
          // Handle login error
          
        });
      } else {
      console.log('Password validator checking...');
      // Display a message indicating that the password does not meet the strength requirements
      this.toastr.error('Password does not meet the strength requirements.');
    }
    
    
    
  }
}