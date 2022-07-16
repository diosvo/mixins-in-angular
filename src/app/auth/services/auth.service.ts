import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ERole, TRole } from '@lib/models/role';
import { BehaviorSubject, from, Observable, switchMap } from 'rxjs';

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
  ) {
    this.handleState();
  }

  private handleState(): void {
    // TODO: check the user is existed in collection
    const current = JSON.parse(localStorage.getItem(this.TOKEN_KEY));

    if (current) {
      const expired = Date.now() >= current.expire * 1000;
      return this.updateUserState(current, !expired);
    };
    return this.updateUserState(null, false);
  }

  /* Sign in */

  emailSignIn({ email, password }): Observable<void> {
    return from(this.afa.signInWithEmailAndPassword(email, password)).pipe(
      switchMap((response: FirebaseAuth) => this.updateUserData(response.user))
    );
  }

  googleSignIn(): Observable<void> {
    const provider = new auth.GoogleAuthProvider();
    return from(this.afa.signInWithPopup(provider)).pipe(
      switchMap((response: FirebaseAuth) => this.updateUserData(response.user))
    );
  }

  /* Register */

  emailRegister({ email, password }): Observable<void> {
    return from(this.afa.createUserWithEmailAndPassword(email, password)).pipe(
      switchMap((response: FirebaseAuth) => this.updateUserData(response.user))
    );
  }

  resetPassword(password: string): Observable<void> {
    return from(this.afa.sendPasswordResetEmail(password));
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
    const idToken = await user.getIdToken(true);
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
    if (!loggedIn) {
      localStorage.clear();
    }
    this.userSubj$.next(user);
    this.isLoggedIn$.next(loggedIn);
  }
}
