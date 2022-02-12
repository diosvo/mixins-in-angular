import { TestBed } from '@angular/core/testing';

import { ViewArticleStateService } from './view-article-state.service';

describe('ViewArticleStateService', () => {
  let service: ViewArticleStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewArticleStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
