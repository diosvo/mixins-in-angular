import { DestroyService } from './destroy.service';

describe('DestroyService', () => {
  let service: DestroyService;

  beforeEach(() => {
    service = new DestroyService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('ngOnDestroy()', () => {
    jest.spyOn(service['life$'], 'next');
    jest.spyOn(service['life$'], 'complete');

    service.ngOnDestroy();

    expect(service['life$'].next).toBeCalled();
    expect(service['life$'].complete).toBeCalled();
  });
});
