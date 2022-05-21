import { TestBed } from '@angular/core/testing';
import { ViewArticleStateService } from './view-article-state.service';

describe.skip('ViewArticleStateService', () => {
  let service: ViewArticleStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewArticleStateService]
    });
    service = TestBed.inject(ViewArticleStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
