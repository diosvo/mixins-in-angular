import { TestBed } from '@angular/core/testing';

import { GithubRepoIssuesService } from './github-repo-issues.service';

describe('GithubRepoIssuesService', () => {
  let service: GithubRepoIssuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GithubRepoIssuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});