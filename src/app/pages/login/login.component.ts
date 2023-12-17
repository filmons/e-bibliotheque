import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../services/auth.service';
import { PasswordStrengthValidator } from '../../components/validator/validator';
import { PasswordStrengthPipe } from '../../components/pipes/password.pipe';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  loginEmail: string = "";
  loginPassword: string = "";
  title: string = 'Lourd, léger, professionnel';
  imageSrc: string = '../../../assets/images/book-1.gif';
  currentBookPage: string = 'Connexion';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  async onLogin() {
    if (!this.loginEmail || !this.loginPassword) {
      this.toastr.error(
        "Please enter both email and password.",
        "Missing Credentials"
      );
      return;
    }

    try {
      await this.authService.login(this.loginEmail, this.loginPassword);
      this.toastr.success(
        "You have successfully logged in!",
        "Login Successful"
      );
      this.router.navigate(["/books"]);
    } catch (error: any) {
      let errorMessage = "Login failed. Please try again.";

      if (error && typeof error === "object" && "code" in error) {
        if (error.code === "auth/user-not-found") {
          errorMessage = "No user found with this email.";
        } else if (error.code === "auth/wrong-password") {
          errorMessage = "Incorrect password. Please try again.";
        } else if (error.code === "auth/network-request-failed") {
          errorMessage = "Network error. Please check your connection.";
        }
      }

      this.toastr.error(errorMessage, "Login Failed");
    }
  }
  showSuccess() {
    this.toastr.success("Welcome to the application!", "Greetings");
  }
}
