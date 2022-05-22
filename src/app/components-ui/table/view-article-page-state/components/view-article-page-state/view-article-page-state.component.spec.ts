import { convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { ViewArticleState } from '../../models/article.model';
import { ViewArticlePageStateComponent } from './view-article-page-state.component';

const state$: ViewArticleState = {
  id: 1,
  article: {
    userId: 1,
    id: 1,
    title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
  },
  articles: null,
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

describe('ViewArticlePageStateComponent', () => {
  let component: ViewArticlePageStateComponent;

  const mockRoute: any = {
    snapshot: {
      paramMap: convertToParamMap({
        id: state$.id
      })
    }
  };

  const mockService: any = {
    state$: of(state$),
    updateArticleId: jest.fn()
  };

  beforeEach(() => {
    component = new ViewArticlePageStateComponent(mockRoute, mockService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('ngOnInit()', () => {
    jest.spyOn(component as any, 'setArticle');
    jest.spyOn(component as any, 'getState');

    component.ngOnInit();

    expect(component['setArticle']).toBeCalled();
    expect(component['getState']).toBeCalled();
  });

  test('setArticle() to update article when the article id changes', () => {
    component['setArticle']();
    expect(mockService.updateArticleId).toBeCalledWith(state$.id);
  });

  test('getState() to get the current state', (done) => {
    component['getState']();
    component.state$.subscribe((response: ViewArticleState) => {
      expect(response).toEqual(state$);
      done();
    });
  });
});
