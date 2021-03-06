import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { AuthService } from '@auth/services/auth.service';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import { IsAuthenticatedGuard } from './is-authenticated.guard';

describe('IsAuthenticatedGuard', () => {
  let guard: IsAuthenticatedGuard;
  let service: AuthService;

  const snackbar = {
    warning: jest.fn()
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: SnackbarService,
          useValue: snackbar
        }
      ],
    });
  }));

  beforeEach(() => {
    guard = TestBed.inject(IsAuthenticatedGuard);
    service = TestBed.inject(AuthService);
  });

  it('should allow to access if user has logged in', (done) => {
    service['_isLoggedIn$'].next(true);

    guard.canActivate().subscribe({
      next: (allowed: boolean) => {
        expect(allowed).toBe(true);
        done();
      },
      error: error => fail(error),
    });
  });

  it('should NOT allow to access if user has NOT logged in', (done) => {
    service['_isLoggedIn$'].next(false);

    guard.canActivate().subscribe({
      next: (allowed: boolean) => {
        expect(allowed).toBe(false);
        expect(snackbar.warning).toBeCalledWith('You must log in first');
        done();
      },
      error: error => fail(error),
    });
  });
});