import { HttpClientTestingModule } from '@angular/common/http/testing';
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(SearchService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('uiComponentsList$', () => {
    service.uiComponentsList$.subscribe((response: Array<IGroupValue>) => expect(response).toEqual(ui_comps));
  });

  test('functionsList$', () => {
    service.functionsList$.subscribe((response: Array<IGroupValue>) => expect(response).toEqual(funcs));
  });
});
