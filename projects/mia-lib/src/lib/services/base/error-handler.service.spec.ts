import { environment } from '@env/environment';
import { throwError, TimeoutError } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;

  const component_name = 'AnyName';

  beforeEach(() => {
    service = new ErrorHandlerService();
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe.skip('handleError()', () => {
    beforeEach(() => {
      jest.spyOn(service as any, 'env').mockReturnValue(throwError(() => new Error('aaaa')));
    });

    test('should throw message when a timeout occurs', async () => {
      const timeout_info: TimeoutError<number, number> = {
        info: {
          meta: 1000,
          seen: 1000,
          lastValue: 1001
        },
        name: component_name,
        message: ''
      };
      const result = await service.handleError(component_name)(timeout_info);
      console.log(result);
    });
  });

  describe('env()', () => {
    const error_message = 'Bad Request';

    test('should throw error message in Dev mode', (done) => {
      environment.production = false;
      service['env'](component_name)(error_message).subscribe({
        error: ({ message }) => {
          expect(message).toEqual(`${error_message}. (${component_name})`);
          done();
        }
      });
    });

    test('should throw error message in Prod mode', (done) => {
      environment.production = true;
      service['env'](component_name)(error_message).subscribe({
        error: ({ message }) => {
          expect(message).toEqual(`${error_message}.`);
          done();
        }
      });
    });
  });
});