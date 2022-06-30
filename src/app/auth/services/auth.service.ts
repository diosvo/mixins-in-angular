import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import firebase from 'firebase/compat';
import { BehaviorSubject } from 'rxjs';

export type FirebaseAuth = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  private userSubj$ = new BehaviorSubject<FirebaseAuth>(null);
  readonly user$ = this.userSubj$.asObservable();

  private readonly TOKEN_KEY = 'firebase_auth';

  get token(): string {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  get user(): FirebaseAuth {
    return this.userSubj$.value;
  }

  constructor(
    private readonly router: Router,
    private readonly afa: AngularFireAuth,
    private readonly afs: AngularFirestore,
    private readonly snackbar: SnackbarService,
  ) {
    this.isLoggedIn$.next(!!this.token);
  }

  login({ email, password }): Promise<void> {
    return this.afa.signInWithEmailAndPassword(email, password)
      .then((response: FirebaseAuth) => {
        this.setUserData(response.user);
        this.isLoggedIn$.next(true);
        this.snackbar.success('Logged in successfully.');
      })
      .catch((error) => this.snackbar.error(error));
  }

  register({ email, password }): Promise<void> {
    return this.afa.createUserWithEmailAndPassword(email, password)
      .then((response: FirebaseAuth) => {
        this.setUserData(response.user);
        this.snackbar.success('Logged in successfully.');
        this.verifyEmail();
      })
      .catch((error) => this.snackbar.error(error));
  }

  resetPassword(password: string): void {
    this.afa.sendPasswordResetEmail(password)
      .then(() => this.snackbar.success('Password reset was sent, please check your message box.'))
      .catch((error) => this.snackbar.error(error));
  }

  private verifyEmail(): Promise<boolean> {
    return this.afa.currentUser
      .then((user) => user.sendEmailVerification())
      .then(() => this.router.navigate(['verify-email-address']));
  }

  setUserData(user: FirebaseAuth['user']): Promise<void> {
    const ref: AngularFirestoreDocument = this.afs.doc(
      `users/${user.uid}`
    );
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(user));
    return ref.set(user, { merge: true });
  }

  logout(): void {
    this.isLoggedIn$.next(false);
    localStorage.clear();
  }
}
