import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IGroupValue } from '@home/models/search.model';
import { EUrl } from '@home/models/url.enum';
import { SearchService } from './search.service';

const ui_comps: Array<IGroupValue> = [
  {
    groupName: 'button',
    groupUrl: EUrl.COMPONENT,
    groupDetails: [
      {
        name: 'Micro Interaction',
        route: 'micro-interaction',
        description: 'GSAP'
      }
    ]
  }
];

const funcs: Array<IGroupValue> = [
  {
    groupName: 'rxjs',
    groupUrl: EUrl.FUNCTION,
    groupDetails: [
      {
        name: 'Data Composition #ng-conf',
        route: 'data-composition-ng-conf',
        description: 'Without subscription, improve performance'
      }
    ]
  },
];

describe('SearchService', () => {
  let service: SearchService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(SearchService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('uiComponentsList$', () => {
    service.uiComponentsList$.subscribe({
      next: (response: Array<IGroupValue>) => {
        expect(response).toEqual(ui_comps);
        expect(response.length).toEqual(1);
      },
      error: ({ message }) => fail(message)
    });

    const request = http.expectOne(service['path'](EUrl.COMPONENT));
    expect(request.request.method).toBe('GET');
    request.flush(ui_comps);
  });

  test('functionsList$', () => {
    service.functionsList$.subscribe({
      next: (response: Array<IGroupValue>) => {
        expect(response).toEqual(funcs);
        expect(response.length).toEqual(1);
      },
      error: ({ message }) => fail(message)
    });

    const request = http.expectOne(service['path'](EUrl.FUNCTION));
    expect(request.request.method).toBe('GET');
    request.flush(funcs);
  });
});
