import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, map, merge, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivatedParamsService {
  private _param$ = new BehaviorSubject<Record<string, string>>({});
  readonly paramsMap$ = this._param$.asObservable();

  private _path$ = new BehaviorSubject<Array<string>>([]);
  readonly pathSegment$ = this._path$.asObservable();

  private isShallowEqual<A = Array<string> | Record<string, string>>(a: A, b: A): boolean {
    return a === b;
  }

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {
    this.getParams();
  }

  private getParams(): void {
    const mappedRoute = merge(
      of(this.route),
      this.router.events.pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        map((): ActivatedRoute => this.route),
      )
    );

    mappedRoute.subscribe({
      next: (route: ActivatedRoute) => {
        const paths = this.router.routerState.snapshot.url
          .replace(/^\//, '').replace(/(\?|#).*$/, '').split('/');

        let snapshot = route.snapshot;
        const paramMap: Record<string, string> = {};
        while (snapshot) {
          Object.assign(paramMap, snapshot.params);
          snapshot = snapshot.children?.[0];
        }

        // add leaf child params

        if (!this.isShallowEqual(this._param$.getValue(), paramMap)) {
          this._param$.next(paramMap);
        }

        if (!this.isShallowEqual(this._path$.getValue(), paths)) {
          this._path$.next(paths);
        }
      }
    });
  }
}

/** Existed issues
 * 1. catch 2 params (same) at the first snapshot
 * 2.handle case is NaN
 */