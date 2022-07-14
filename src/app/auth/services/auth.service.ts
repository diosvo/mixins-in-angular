import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import { BehaviorSubject } from 'rxjs';

import { ERole, TRole } from '@lib/models/role';
import firebase from 'firebase/compat/app';
import auth = firebase.auth;
import FirebaseUser = firebase.User;

export type FirebaseAuth = auth.UserCredential;

export interface AuthUser {
  uid: string;
  email: string;
  expire: number;
  roles: TRole[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  private userSubj$ = new BehaviorSubject<AuthUser>(null);
  readonly user$ = this.userSubj$.asObservable();

  private readonly TOKEN_KEY = 'auth';

  get user(): AuthUser {
    return this.userSubj$.value;
  }

  constructor(
    private readonly router: Router,
    private readonly afa: AngularFireAuth,
    private readonly afs: AngularFirestore,
    private readonly snackbar: SnackbarService,
  ) {
    this.handleState();
  }

  private handleState(): void {
    const current = JSON.parse(localStorage.getItem(this.TOKEN_KEY));

    if (current) {
      const expired = Date.now() >= current.expire * 1000;
      return this.updateUserState(current, !expired);
    };
    return this.updateUserState(null, false);
  }

  /* Sign in */

  emailSignIn({ email, password }): Promise<void> {
    return this.afa.signInWithEmailAndPassword(email, password)
      .then((response: FirebaseAuth) => {
        this.updateUserData(response.user);
        this.snackbar.success('Logged in successfully.');
      })
      .catch((error) => this.snackbar.error(error));
  }

  async googleSignIn(): Promise<void> {
    const provider = new auth.GoogleAuthProvider();
    const credentials = await this.afa.signInWithPopup(provider);
    return this.updateUserData(credentials.user);
  }

  /* Register */

  emailRegister({ email, password }): Promise<void> {
    return this.afa.createUserWithEmailAndPassword(email, password)
      .then((response: FirebaseAuth) => {
        this.updateUserData(response.user);
        this.snackbar.success('Register successfully.');
        this.verifyEmail();
      })
      .catch((error) => this.snackbar.error(error));
  }

  resetPassword(password: string): void {
    this.afa.sendPasswordResetEmail(password)
      .then(() => this.snackbar.success('Password to reset was sent, please check your message box.'))
      .catch((error) => this.snackbar.error(error));
  }

  async logout(): Promise<void> {
    await this.afa.signOut();
    localStorage.clear();
    this.updateUserState(null, false);
  }

  /* Utils */

  private verifyEmail(): Promise<boolean> {
    return this.afa.currentUser
      .then((user) => user.sendEmailVerification())
      .then(() => this.router.navigate(['verify-email-address']));
  }

  private async updateUserData(user: FirebaseUser): Promise<void> {
    if (!user) {
      throw new Error('User is null');
    }

    const { uid, email } = user;
    const idToken = await user.getIdToken();
    const expire = JSON.parse(
      Buffer
        .from(idToken.split('.')[1], 'base64')
        .toString('ascii')
    )['exp'];

    const userRef: AngularFirestoreDocument<AuthUser> = this.afs.doc(`users/${uid}`);
    const data: AuthUser = {
      uid,
      email,
      expire,
      roles: [ERole.SUBSCRIBER]
    };
    this.updateUserState(data, true);
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(data));
    return userRef.set(data, { merge: true });
  }

  updateUserState(user: AuthUser, loggedIn: boolean): void {
    this.userSubj$.next(user);
    this.isLoggedIn$.next(loggedIn);
  }
}
