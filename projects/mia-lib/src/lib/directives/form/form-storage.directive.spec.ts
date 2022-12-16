import { FormControl } from '@angular/forms';
import { DestroyService } from '@lib/services/destroy/destroy.service';
import { FormStorageDirective } from './form-storage.directive';

describe('FormStorageDirective', () => {
  let directive: FormStorageDirective<{ name: string }>;

  const mockStorageService: any = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  };

  const mockContainer: any = {
    control: new FormControl()
  };

  beforeEach(() => {
    directive = new FormStorageDirective(new DestroyService(), mockStorageService, mockContainer);
  });

  test('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
