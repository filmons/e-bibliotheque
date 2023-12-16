// auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Books } from '../book.model';

import { ToastrService } from 'ngx-toastr';
import firebase from 'firebase/compat/app'; // Import firebase explicitly
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // private isAuthenticated: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private toastr: ToastrService
  ) {

    
  }

  get isAuthenticated(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(user => !!user)
    );
  }

  login(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async signUp(
    email: string,
    password: string,
    signupFirstName: string,
    signupLastName: string
  ): Promise<void> {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (result.user) {
        const userRef = this.firestore.collection('users').doc(result.user.uid);
        await userRef.set({
          email: email,
          password: password,
          signupFirstName: signupFirstName,
          signupLastName: signupLastName,
        });
        console.log('this is the singup ', result);
      } else {
        this.toastr.error('User not found after sign up.');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  }

  getUserByEmail(email: string) {
    return this.firestore
      .collection('users', (ref) => ref.where('email', '==', email))
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...(data as any) };
          })
        )
      );
  }

  getTasksByUserId(userId: string) {
    return this.firestore
      .collection<Books>('Books', (ref) => ref.where('userId', '==', userId))
      .valueChanges();
  }

  async getCurrentUserId(): Promise<string | null> {
    const user = await this.afAuth.currentUser;
    return user ? user.uid : null;
  }

  getUserById(userId: string) {
    return this.firestore.collection('users').doc(userId).valueChanges();
  }

}
