import { ErrorHandlerService } from '@lib/services/base/error-handler.service';
import { DestroyService } from '@lib/services/destroy/destroy.service';
import { of } from 'rxjs';
import { JokesService } from './jokes.service';

describe('JokesService', () => {
  let service: JokesService;

  const mockHttp: any = {
    get: jest.fn().mockReturnValue(of([])),
  };

  beforeEach(() => {
    service = new JokesService(mockHttp, new ErrorHandlerService(), new DestroyService());
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});
