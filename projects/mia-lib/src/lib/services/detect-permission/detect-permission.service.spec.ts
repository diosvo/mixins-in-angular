import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { DetectPermissionService } from './detect-permission.service';

describe.skip('DetectPermissionService', () => {
  let service: DetectPermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: jest.fn()
          }
        },
      ]
    });
    service = TestBed.inject(DetectPermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
