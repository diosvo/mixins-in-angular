import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedParamsService } from './activated-params.service';

describe('ActivatedParamsService', () => {
  let service: ActivatedParamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
    service = TestBed.inject(ActivatedParamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
