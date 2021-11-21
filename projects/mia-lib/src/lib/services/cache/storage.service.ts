import { Injectable } from '@angular/core';
import { Safe } from '../../helpers/safe.decorators';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  @Safe()
  static getItem<T>(key: string): T {
    return (
      this.fromJson(sessionStorage.getItem(key))
      || this.fromJson(localStorage.getItem(key))
    );
  }

  @Safe()
  static setItem<T>(key: string, valueObject: T, remember = true): void {
    if (remember) {
      localStorage.setItem(key, this.toJson<T>(valueObject));
    } else {
      sessionStorage.setItem(key, this.toJson<T>(valueObject));
    }
  }

  @Safe()
  static removeItem<T>(key: string): void {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  }

  private static fromJson<T>(value: string | null): T {
    if (value !== null) return JSON.parse(value);
    else return JSON.parse('');
  }

  private static toJson<T>(value: T): string {
    return JSON.stringify(value);
  }
}
