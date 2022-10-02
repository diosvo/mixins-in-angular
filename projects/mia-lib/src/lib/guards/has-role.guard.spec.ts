import { ERole } from '@lib/models/role';
import { mockSnackbar } from '@lib/services/snackbar/snackbar.service.spec';
import { HasRoleGuard } from './has-role.guard';

describe('HasRoleGuard', () => {
  let guard: HasRoleGuard;

  const mockAuthService: any = {
    user: {
      roles: [ERole.SUBSCRIBER]
    }
  };

  beforeEach(() => {
    guard = new HasRoleGuard(mockAuthService, mockSnackbar);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should allow to access if the user has matched roles', () => {
    const route: any = ({
      data: {
        roles: [ERole.SUBSCRIBER]
      }
    });
    expect(guard.canActivate(route)).toBe(true);
  });

  test('should NOT allow to access if user does NOT have matched roles', () => {
    const route: any = ({
      data: {
        roles: [ERole.ADMIN]
      }
    });
    expect(guard.canActivate(route)).toBe(false);
    expect(mockSnackbar.warning).toBeCalledWith('You are not authorized to access this page.');
  });
});