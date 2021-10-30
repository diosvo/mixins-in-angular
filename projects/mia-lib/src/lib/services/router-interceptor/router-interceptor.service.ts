import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouterInterceptorService {
  private _previousUrl: string;
  private _currentUrl: string;
  private _routeHistory: Array<string>;

  constructor(router: Router) {
    this._routeHistory = [];
    router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => this.setURLs(event));
  }

  private setURLs(event: NavigationEnd): void {
    const tempUrl = this._currentUrl;
    this._previousUrl = tempUrl;
    this._currentUrl = event.urlAfterRedirects;
    this._routeHistory.push(event.urlAfterRedirects);
  }

  get previousUrl(): string {
    return this._previousUrl;
  }

  get currentUrl(): string {
    return this._currentUrl;
  }

  get routeHistory(): Array<string> {
    return this._routeHistory;
  }
}
