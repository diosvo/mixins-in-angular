import { TestBed } from '@angular/core/testing';
import { StateAtom } from './atom.service';

describe('StateAtom', () => {
  let service: StateAtom<unknown>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateAtom);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
