// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginEmail: string = '';
  loginPassword: string = '';

  constructor(private authService: AuthService, private router: Router,private toastr: ToastrService) {}
  onLogin() {
    this.authService.login(this.loginEmail, this.loginPassword)
      .then(() => {
        this.router.navigate(['/books']); 
      })
      .catch(error => {
      });
  }
  
}
