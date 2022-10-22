import { MOCK_COMMENT, MOCK_LIST_COMMENTS } from '@lib/mocks/json-placeholder/comment.mock';
import { Comment } from '@lib/models/json-placeholder/comment.model';
import { ErrorHandlerService } from '@lib/services/base/error-handler.service';
import { of } from 'rxjs';
import { CommentsService } from './comments.service';

describe('CommentsService', () => {
  let service: CommentsService;

  const mockHttp: any = {
    get: jest.fn().mockReturnValue(of(MOCK_LIST_COMMENTS)),
    put: jest.fn().mockReturnValue(of(MOCK_COMMENT)),
    post: jest.fn().mockReturnValue(of(MOCK_COMMENT)),
    delete: jest.fn().mockReturnValue(of({})),
  };

  beforeEach(() => {
    service = new CommentsService(mockHttp, new ErrorHandlerService());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('should retrieve a list of comments', (done) => {
    service.filtered({}).subscribe((response: Comment[]) => {
      expect(response).toEqual(MOCK_LIST_COMMENTS);
      done();
    });
  });
});
