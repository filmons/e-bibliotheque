// import { Injectable } from '@angular/core';
// import { AngularFireAuth, AuthError, AuthState } from '@angular/fire/auth'; // Updated import
// import { User } from '../user.model';
// import { catchError } from 'rxjs/operators'; // Added import for catchError

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   constructor(private auth: AngularFireAuth) {}

//   signUp(user: User): Promise<void> {
//     return this.auth.createUserWithEmailAndPassword(user.email, user.password);
//   }

//   login(user: User): Promise<void> {
//     return this.auth.signInWithEmailAndPassword(user.email, user.password);
//   }

//   logout(): Promise<void> {
//     return this.auth.signOut();
//   }

//   getCurrentUser(): AuthState | null { // Updated return type
//     return this.auth.authState;
//   }
// }
