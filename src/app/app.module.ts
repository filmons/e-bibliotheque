import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './core/auth.guard';
import { Environment } from './environment';
import { ToastrModule } from 'ngx-toastr';

import { BookComponent } from './pages/book/book.component';
import { ErrorComponent } from './pages/error/error.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserBooksComponent } from './pages/user-books/user-books.component';

import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { CardComponent } from './components/card/card.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { PasswordStrengthPipe} from './components/pipes/password.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    ErrorComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    PasswordStrengthPipe,
    UserBooksComponent,
    BreadcrumbComponent,
    CardComponent,
    FooterComponent,
    NavbarComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(Environment.firebase),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFirestoreModule,
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }