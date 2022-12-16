import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root',
  useClass: SessionStorageService // be the default class that should be used
})
export abstract class StorageService<T> {

  abstract getItem(key: string): Promise<T>;
  abstract setItem(key: string, value: unknown): Promise<void>;
  abstract removeItem(key: string): Promise<void>;

}
