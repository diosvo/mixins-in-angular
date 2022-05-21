import { HandleService } from '@lib/services/base/handle.service';
import { of } from 'rxjs';
import { GithubApi } from '../models/service.model';
import { GithubRepoIssuesService } from './github-repo-issues.service';

const data: GithubApi = {
  total_count: 0,
  items: []
};

describe('GithubRepoIssuesService', () => {
  let service: GithubRepoIssuesService;

  const mockHttp: any = {
    get: jest.fn().mockReturnValue(of(data))
  };

  beforeEach(() => {
    service = new GithubRepoIssuesService(mockHttp, new HandleService());
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('should get repository issues', (done) => {
    service.getRepoIssues(0).subscribe((response: GithubApi) => {
      expect(response).toEqual(data);
      done();
    });
  });
});
