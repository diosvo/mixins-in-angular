import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedParamsService } from './activated-params.service';

class MockRouter {
  public ne = new NavigationEnd(0, 'http://localhost:4200/ui-components', 'http://localhost:4200/ui-components');
  public events = new Observable(observer => {
    observer.next(this.ne);
    observer.complete();
  });
}

describe('ActivatedParamsService', () => {
  let service: ActivatedParamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useClass: MockRouter
        },
        {
          provide: ActivatedRoute,
          useValue: {
            firstChild: ActivatedRoute,
            outlet: 'primary',
          }
        }
      ]
    });

    service = TestBed.inject(ActivatedParamsService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isShallowEqual()', () => {
    test('returns true if the URLs are equal', () => {
      expect(service['isShallowEqual']('/ui-components', '/ui-components')).toBe(true);
    });

    test('returns true if the URLs are NOT equal (navigate to another page)', () => {
      expect(service['isShallowEqual']('/ui-components', '/functions')).toBe(false);
    });
  });
});
