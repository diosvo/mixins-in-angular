import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { ERole } from '@lib/models/role';
import { of } from 'rxjs';
import { DetectPermissionService } from './detect-permission.service';

describe('DetectPermissionService', () => {
  let service: DetectPermissionService;

  const route = ({
    data: of({ roles: [ERole.ADMIN] })
  }) as any;

  const user = {
    roles: [ERole.ADMIN, ERole.GUEST]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: route
        },
        {
          provide: AuthService,
          useValue: {
            user: user
          }
        },
        DetectPermissionService
      ]
    });

    service = TestBed.inject(DetectPermissionService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isAuthorized() to determine if the user has role', () => {
    test('returns true if user has permissions', () => {
      service.isAuthorized();
      expect(service.hasPermission).toBe(true);
    });

    test('returns false if user does NOT have permissions', () => {
      user.roles = [ERole.CUSTOMER];
      service.isAuthorized();
      expect(service.hasPermission).toBe(false);
    });

    test('returns false if user does NOT log in', () => {
      service['authService'].user = null;
      service.isAuthorized();
      expect(service.hasPermission).toBe(false);
    });
  });
});
