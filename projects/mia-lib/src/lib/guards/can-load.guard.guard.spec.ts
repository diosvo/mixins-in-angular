import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { AuthService } from '@auth/services/auth.service';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import { CanLoadGuard } from './can-load.guard';

describe('CanLoadGuard', () => {
  let guard: CanLoadGuard;
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
    guard = TestBed.inject(CanLoadGuard);
    service = TestBed.inject(AuthService);
  });

  it('should allow to access if user has logged in', (done) => {
    service['_isLoggedIn$'].next(true);

    guard.canLoad().subscribe({
      next: (allowed: boolean) => {
        expect(allowed).toBe(true);
        done();
      },
      error: error => fail(error),
    });
  });

  it('should NOT allow to access if user has NOT logged in', (done) => {
    service['_isLoggedIn$'].next(false);

    guard.canLoad().subscribe({
      next: (allowed: boolean) => {
        expect(allowed).toBe(false);
        expect(snackbar.warning).toBeCalledWith('You must log in first');
        done();
      },
      error: error => fail(error),
    });
  });
});