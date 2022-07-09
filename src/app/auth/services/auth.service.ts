import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ERole, IRoles } from '@lib/models/role';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';

import firebase from 'firebase/compat/app';
import auth = firebase.auth;
import FirebaseUser = firebase.User;

export type FirebaseAuth = auth.UserCredential;

export interface AuthUser {
  uid: string;
  email: string;
  roles: Partial<IRoles>;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  private userSubj$ = new BehaviorSubject<AuthUser>(null);
  readonly user$ = this.userSubj$.asObservable();

  state$: Observable<AuthUser>;

  private readonly TOKEN_KEY = 'firebase_auth';

  get token(): string {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  get user(): AuthUser {
    return this.userSubj$.value;
  }

  constructor(
    private readonly router: Router,
    private readonly afa: AngularFireAuth,
    private readonly afs: AngularFirestore,
    private readonly snackbar: SnackbarService,
  ) {
    this.getState$();
    this.isLoggedIn$.next(!!this.token);
  }

  private getState$(): void {
    this.state$ = this.afa.authState.pipe(
      switchMap((user: FirebaseUser) => {
        if (user) {
          return this.afs.doc<AuthUser>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }

  emailSignIn({ email, password }): Promise<void> {
    return this.afa.signInWithEmailAndPassword(email, password)
      .then((response: FirebaseAuth) => {
        this.updateUserData(response.user);
        this.isLoggedIn$.next(true);
        this.snackbar.success('Logged in successfully.');
      })
      .catch((error) => this.snackbar.error(error));
  }

  async googleSignIn(): Promise<void> {
    const provider = new auth.GoogleAuthProvider();
    const credentials = await this.afa.signInWithPopup(provider);
    return this.updateUserData(credentials.user);
  }

  register({ email, password }): Promise<void> {
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

  ability(action: 'read' | 'edit' | 'delete', user: AuthUser): boolean {
    switch (action) {
      case 'read':
        return this.checkAuthorization(user, [ERole.ADMIN, ERole.GUEST, ERole.SUBSCRIBER]);
      case 'edit':
        return this.checkAuthorization(user, [ERole.ADMIN, ERole.SUBSCRIBER]);
      case 'delete':
        return this.checkAuthorization(user, [ERole.ADMIN]);
      default:
        return false;
    }
  }

  async logout(): Promise<void> {
    await this.afa.signOut();
    localStorage.clear();
    this.isLoggedIn$.next(false);
  }

  private verifyEmail(): Promise<boolean> {
    return this.afa.currentUser
      .then((user) => user.sendEmailVerification())
      .then(() => this.router.navigate(['verify-email-address']));
  }

  private updateUserData(user: FirebaseUser): Promise<void> {
    if (!user) {
      throw new Error('User is null');
    }

    const userRef: AngularFirestoreDocument<AuthUser> = this.afs.doc(`users/${user.uid}`);
    const data: AuthUser = {
      uid: user.uid,
      email: user.email,
      roles: {
        guest: true,
        subscriber: true,
      }
    };
    this.userSubj$.next(data);
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(data));
    return userRef.set(data, { merge: true });
  }

  private checkAuthorization(user: AuthUser, allowedRoles: string[]): boolean {
    if (!user) return false;

    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true;
      }
    }
    return false;
  }
}
