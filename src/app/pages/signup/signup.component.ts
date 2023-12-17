import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  title: string = 'Simple, rapide, efficace';
  imageSrc: string = '../../../assets/images/book-2.gif';
  currentBookPage: string = 'Inscription';
}
