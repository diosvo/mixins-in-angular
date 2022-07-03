import { of } from 'rxjs';
import { ViewArticleState } from '../../models/article.model';
import { ListArticlesComponent } from './list-articles.component';

const state$: ViewArticleState = {
  id: undefined,
  article: null,
  articles: [
    {
      userId: 1,
      id: 1,
      title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
    },
  ],
  comments: [],
  loading: true,
  searchTerm: '',
  paginate: {
    limit: 100,
    start: 0,
    sort: 'id',
    order: 'asc'
  }
};

describe('ListArticlesComponent', () => {
  let component: ListArticlesComponent;

  const mockRoute: any = {
    queryParams: of({ limit: 10 })
  };

  const mockService: any = {
    state$: of(state$),
    updateStateFromQueryParams: jest.fn()
  };

  beforeEach(() => {
    component = new ListArticlesComponent(mockRoute, mockService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    test('should set up component after page load', () => {
      jest.spyOn(component as any, 'getState');
      jest.spyOn(component as any, 'updateParams');

      component.ngOnInit();

      expect(component['getState']).toBeCalled();
      expect(component['updateParams']).toBeCalled();
    });
  });

  describe('getState()', () => {
    test('should set up state when API returns success', (done) => {
      component['getState']();
      component.state$.subscribe((response: ViewArticleState) => {
        expect(response).toEqual(state$);
        done();
      });
    });
  });

  describe('updateParams()', () => {
    test('should update params when there has changed', () => {
      component['updateParams']();
      expect(mockService.updateStateFromQueryParams).toBeCalledWith({ limit: 10 });
    });
  });
});
