import { TestBed } from '@angular/core/testing';

import { RouterInterceptorService } from './router-interceptor.service';

describe('RouterInterceptorService', () => {
  let service: RouterInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouterInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
