import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpCacheStorage } from './http-request-cache';

@Injectable({
  providedIn: 'root'
})

export class CacheService implements HttpCacheStorage {

  private readonly cache = new Map<string, Observable<unknown>>();

  setItem(key: string, item: Observable<unknown>): void {
    this.cache.set(key, item);
  }

  getItem(key: string): Observable<unknown> {
    return this.cache.get(key);
  }
}