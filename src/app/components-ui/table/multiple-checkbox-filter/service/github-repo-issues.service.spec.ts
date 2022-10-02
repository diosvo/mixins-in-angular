import { ErrorHandlerService } from '@lib/services/base/error-handler.service';
import { of } from 'rxjs';
import { GithubRepoIssuesService } from './github-repo-issues.service';

describe('GithubRepoIssuesService', () => {
  let service: GithubRepoIssuesService;

  const mockHttp: any = {
    get: jest.fn().mockReturnValue(of([]))
  };

  beforeEach(() => {
    service = new GithubRepoIssuesService(mockHttp, new ErrorHandlerService());
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});
