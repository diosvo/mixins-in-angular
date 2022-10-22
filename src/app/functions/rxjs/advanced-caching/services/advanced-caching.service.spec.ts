import { MOCK_LIST_COMMENTS } from '@lib/mocks/json-placeholder/comment.mock';
import { Comment } from '@lib/models/json-placeholder/comment.model';
import { ErrorHandlerService } from '@lib/services/base/error-handler.service';
import { of } from 'rxjs';
import { AdvancedCachingService } from './advanced-caching.service';

const mockService: any = {
  filtered: jest.fn().mockReturnValue(of(MOCK_LIST_COMMENTS))
};

describe('AdvancedCachingService', () => {
  let service: AdvancedCachingService;

  const mockHttp: any = {
    get: jest.fn().mockReturnValue(of(MOCK_LIST_COMMENTS)),
  };

  beforeEach(() => {
    service = new AdvancedCachingService(mockHttp, mockService, new ErrorHandlerService());
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('should retrieve a list of comments', () => {
    it('returns the cache if the API has been called', (done) => {
      service['cache$'] = of(MOCK_LIST_COMMENTS);
      service.comments.subscribe((data: Comment[]) => {
        expect(data).toEqual(MOCK_LIST_COMMENTS);
        expect(mockService.filtered).not.toBeCalled();
        done();
      });
    });

    it('should call API if it has not been been called', (done) => {
      service['cache$'] = undefined;
      service.comments.subscribe((data: Comment[]) => {
        expect(data).toEqual(MOCK_LIST_COMMENTS);
        expect(mockService.filtered).toBeCalled();
        done();
      });
    });
  });

  describe('forceReload()', () => {
    test('should force reload to get new state', () => {
      jest.spyOn(service['reload$'], 'next');
      service.forceReload();

      expect(service['reload$'].next).toBeCalled();
      expect(service['cache$']).toBeNull();
    });
  });
});
