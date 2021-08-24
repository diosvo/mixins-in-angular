import { TestBed } from '@angular/core/testing';

import { DetectPermissionService } from './detect-permission.service';

describe('DetectPermissionService', () => {
  let service: DetectPermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetectPermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
