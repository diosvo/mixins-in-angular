import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { LoggerFactory } from '@lib/helpers/logger.factory';
import { asUniqueArray } from '@lib/helpers/unique-array';
import { ERole, TRole } from '@lib/models/role';
import firebase from 'firebase/compat/app';
import { BehaviorSubject, from, Observable, switchMap, take } from 'rxjs';


export interface AuthUser {
  uid: string;
  email: string;
  expire: number;
  roles: TRole[];
}

type FirebaseAuth = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private logger = this.loggerFactory.createLogger('Authentication', 'service');

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
    private readonly loggerFactory: LoggerFactory
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
      take(1),
      switchMap((response: FirebaseAuth) => this.updateUserData(response.user))
    );
  }

  googleSignIn(): Observable<void> {
    return from(this.afa.signInWithPopup(new GoogleAuthProvider())).pipe(
      take(1),
      switchMap((response: FirebaseAuth) => this.updateUserData(response.user))
    );
  }

  /* Register */

  emailRegister({ email, password }): Observable<void> {
    return from(this.afa.createUserWithEmailAndPassword(email, password)).pipe(
      switchMap((response: FirebaseAuth) => this.updateUserData(response.user))
    );
  }

  resetPassword(email: string): Observable<void> {
    return from(this.afa.sendPasswordResetEmail(email));
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

  private async updateUserData(user: firebase.User): Promise<void> {
    if (!user) {
      throw new Error('No user found');
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
      roles: asUniqueArray([ERole.SUBSCRIBER])
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
    this.logger.log(user ? new Date(user.expire * 1000) : 'Not signed in yet');
  }
}
