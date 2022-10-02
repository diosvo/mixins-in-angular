import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  const mockRouter: any = {
    navigate: jest.fn()
  };

  const mockFireAuth: any = {
    signInWithEmailAndPassword: jest.fn().mockReturnValue(of({})),
    signInWithPopup: jest.fn().mockReturnValue(of({})),
    createUserWithEmailAndPassword: jest.fn().mockReturnValue(of({})),
    sendPasswordResetEmail: jest.fn().mockReturnValue(of({})),
    signOut: jest.fn().mockReturnValue(of({})),
    currentUser: of({}),
  };

  const mockFireStore: any = {
    doc: new AngularFirestoreDocument({} as any, mockFireAuth)
  };

  const mockLoggerService: any = {
    createLogger: jest.fn().mockImplementation(() => {
      return {
        log: jest.fn().mockReturnValue('No user is signed in.')
      };
    })
  };

  beforeEach(() => {
    service = new AuthService(
      mockRouter,
      mockFireAuth,
      mockFireStore,
      mockLoggerService
    );
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});
