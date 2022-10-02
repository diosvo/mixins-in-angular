import { ERole } from '@lib/models/role';
import { of } from 'rxjs';
import { DetectPermissionService } from './detect-permission.service';

describe('DetectPermissionService', () => {
  let service: DetectPermissionService;

  const mockRoute: any = {
    data: of({ roles: [ERole.ADMIN] })
  };

  let mockAuthService: any = {
    user: {
      roles: [ERole.ADMIN, ERole.GUEST]
    }
  };

  beforeEach(() => {
    service = new DetectPermissionService(mockAuthService, mockRoute);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isAuthorized() to determine if the user has role', () => {
    test('returns true if the user has permissions', () => {
      service.isAuthorized();
      expect(service.hasPermission).toBe(true);
    });

    test('returns false if the user does NOT have permissions', () => {
      mockAuthService.user.roles = [ERole.SUBSCRIBER];
      service.isAuthorized();
      expect(service.hasPermission).toBe(false);
    });

    test('returns false if user does NOT log in', () => {
      mockAuthService.user = null;
      service.isAuthorized();
      expect(service.hasPermission).toBe(false);
    });
  });
});
