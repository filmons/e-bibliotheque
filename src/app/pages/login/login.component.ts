import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title: string = 'Lourd, léger, professionnel';
  imageSrc: string = '../../../assets/images/book-1.gif';
  currentBookPage: string = 'Connexion';
}
