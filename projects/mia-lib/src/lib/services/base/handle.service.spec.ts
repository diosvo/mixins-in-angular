import { HttpStatusCode } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HandleService } from './handle.service';

describe('HandleService', () => {
  let service: HandleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    });

    service = TestBed.inject(HandleService);
  });
  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isServerError()', () => {
    test('returns true if server returns error number is >= 500', () => {
      expect(service.isServerError({ status: HttpStatusCode.InternalServerError } as any)).toBe(true);
    });

    test('returns false if server returns error number is < 500', () => {
      expect(service.isServerError({ status: HttpStatusCode.BadRequest } as any)).toBe(false);
    });
  });
});