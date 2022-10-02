import { mockSnackbar } from '@lib/services/snackbar/snackbar.service.spec';
import { of } from 'rxjs';
import { CanLoadGuard } from './can-load.guard';

describe('CanLoadGuard', () => {
  let guard: CanLoadGuard;

  const mockAuthService: any = {
    isLoggedIn$: of(true)
  };

  const mockLoggerService: any = {
    createLogger: jest.fn().mockImplementation(() => {
      return {
        log: jest.fn().mockReturnValue('activated')
      };
    })
  };

  beforeEach(() => {
    guard = new CanLoadGuard(mockAuthService, mockSnackbar, mockLoggerService);
  });

  test('should init guard', () => {
    expect(guard).toBeTruthy();
  });

  test('should allow to access if the user is logged in', (done) => {
    guard.canLoad().subscribe({
      next: (allowed: boolean) => {
        expect(allowed).toBe(true);
        done();
      },
      error: ({ message }) => fail(message),
    });
  });

  test('should NOT allow to access if the user is NOT logged in', (done) => {
    mockAuthService.isLoggedIn$ = of(false);
    guard.canLoad().subscribe({
      next: (allowed: boolean) => {
        expect(allowed).toBe(false);
        expect(mockSnackbar.warning).toBeCalledWith('You must log in first');
        done();
      },
      error: ({ message }) => fail(message),
    });
  });
});
