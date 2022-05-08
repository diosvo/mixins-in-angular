import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IGroupValue } from '@home/models/search.model';
import { EUrl } from '@home/models/url.enum';
import { SearchService } from './search.service';

const ui_comps: IGroupValue[] = [
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

  test('should call list based on provided group', () => {
    service['getFetch'](EUrl.COMPONENT).subscribe({
      next: (response: IGroupValue[]) => {
        expect(response).toEqual(ui_comps);
        expect(response.length).toEqual(1);
      },
      error: ({ message }) => fail(message)
    });

    const request = http.expectOne(`/assets/backend/list-items/${EUrl.COMPONENT}.json`);
    expect(request.request.method).toBe('GET');
    request.flush(ui_comps);
  });
});
