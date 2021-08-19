import { TestBed } from '@angular/core/testing';
import { MiaLibService } from './mia-lib.service';


describe('MiaLibService', () => {
  let service: MiaLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiaLibService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});
