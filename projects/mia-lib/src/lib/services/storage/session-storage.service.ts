import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService<T> implements StorageService<T> {

  getItem(key: string): Promise<T> {
    const value = JSON.parse(sessionStorage.getItem(key));
    return Promise.resolve(value);
  }

  setItem(key: string, value: unknown): Promise<void> {
    const result = sessionStorage.setItem(key, JSON.stringify(value));
    return Promise.resolve(result);
  }

  removeItem(key: string): Promise<void> {
    return Promise.resolve(sessionStorage.removeItem(key));
  }
}
