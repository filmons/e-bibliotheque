import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { BookComponent } from './book/book.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserBooksComponent } from './user-books/user-books.component';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: SignupComponent },
  { path: 'books', component: BookComponent,
  canActivate: [AuthGuard] 
   },
  { path: 'login', component: LoginComponent },
  { path: 'history', component: UserBooksComponent,
  canActivate: [AuthGuard] 
 },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
