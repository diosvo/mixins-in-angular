import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { AuthService } from '@auth/services/auth.service';
import { ERole } from '@lib/models/role';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import { HasRoleGuard } from './has-role.guard';

describe('HasRoleGuard', () => {
  let guard: HasRoleGuard;
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
        },
        {
          provide: AuthService,
          useValue: {
            user: {
              roles: [ERole.ADMIN, ERole.GUEST]
            }
          }
        }
      ],
    });
  }));

  beforeEach(() => {
    guard = TestBed.inject(HasRoleGuard);
    service = TestBed.inject(AuthService);
  });

  it('should allow to access if user has role', () => {
    const route = ({
      data: {
        roles: [ERole.ADMIN]
      }
    }) as any;
    expect(guard.canActivate(route)).toBe(true);
  });

  it('should NOT allow to access if user does NOT have required role', () => {
    const route = ({
      data: {
        roles: [ERole.CUSTOMER]
      }
    }) as any;
    expect(guard.canActivate(route)).toBe(false);
    expect(snackbar.warning).toBeCalledWith('You are not authorized to access this page.');
  });
});