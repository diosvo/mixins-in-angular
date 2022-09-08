
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    service = new LoadingService();
    jest.spyOn(service['_loading'], 'next');
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('should show loading indicator', () => {
    service.show();
    expect(service['_loading'].next).toBeCalledWith(true);
  });

  test('should hide loading indicator', () => {
    service.hide();
    expect(service['_loading'].next).toBeCalledWith(false);
  });
});
