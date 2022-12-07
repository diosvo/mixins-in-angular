import { User } from '@lib/models/json-placeholder/user.model';
import { StorageService } from './storage.service';

class MockStorageService implements StorageService<User> {
  getItem(key: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  setItem(key: string, value: unknown): Promise<void> {
    throw new Error('Method not implemented.');
  }
  removeItem(key: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

describe('StorageService', () => {
  let service: MockStorageService;

  beforeEach(() => {
    service = new MockStorageService();
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});
