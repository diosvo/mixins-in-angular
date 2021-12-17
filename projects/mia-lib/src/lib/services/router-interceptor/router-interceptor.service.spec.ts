import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterInterceptorService } from './router-interceptor.service';

describe('RouterInterceptorService', () => {
  let service: RouterInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ]
    });
    service = TestBed.inject(RouterInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
