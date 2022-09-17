import { EComponentUI, EUrl } from '@home/models/url.enum';
import { State } from '@lib/models/server.model';
import { of, throwError } from 'rxjs';
import { CardItem, SearchService } from './search.service';

const items: CardItem[] = [
  {
    name: 'Custom Button',
    group_id: 'button',
    routing_path: EUrl.COMPONENT,
    description: '',
    is_maintained: false
  }
];

describe('SearchService', () => {
  let service: SearchService;

  const mockFirebaseService: any = {
    collection: jest.fn().mockReturnValue({
      valueChanges: () => of(items)
    })
  };

  beforeEach(() => {
    service = new SearchService(mockFirebaseService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getData()', () => {
    test('should retrieve and filter items', (done) => {
      service['getData'](EUrl.COMPONENT, of({ query: '', group: ['menu'] }), Object.values(EComponentUI)).subscribe({
        next: (response: State<CardItem>) => {
          expect(response).toEqual({
            data: [],
            loading: false
          });
        }
      });
      service['getData'](EUrl.COMPONENT, of({ query: '', group: [] }), Object.values(EComponentUI)).subscribe({
        next: (response: State<CardItem>) => {
          expect(response).toEqual({
            data: items,
            loading: false
          });
        }
      });
      done();
    });

    test('should show error if API failed', (done) => {
      mockFirebaseService.collection.mockReturnValue({
        valueChanges: () => throwError(() => new Error('Bad Request'))
      });
      service['getData'](EUrl.COMPONENT, of({ query: '', group: [] }), Object.values(EComponentUI)).subscribe({
        next: (response: State<CardItem>) => {
          expect(response).toEqual({
            data: [],
            message: 'Bad Request',
            loading: false
          });
        }
      });
      done();
    });
  });
});
