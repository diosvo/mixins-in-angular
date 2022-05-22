import { DestroyService } from './destroy.service';

describe('DestroyService', () => {
  let service: DestroyService;

  beforeEach(() => {
    service = new DestroyService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
