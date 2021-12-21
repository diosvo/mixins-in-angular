import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { BehaviorSubject, filter, map, mergeMap, Observable, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivatedParamsService implements OnDestroy {
  private _param$ = new BehaviorSubject<Record<string, string>>({});
  readonly paramsMap$ = this._param$.asObservable();

  private _path$ = new BehaviorSubject<string>('');
  readonly pathMap$ = this._path$.asObservable();

  private _destroyed$ = new Subject<boolean>();

  private isShallowEqual<A = string | Record<string, string>>(a: A, b: A): boolean {
    return a === b;
  }

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {
    this.getParams();
  }

  private getParams(): void {
    const mappedRoute = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((): ActivatedRoute => this.route),
      map((route: ActivatedRoute): ActivatedRoute => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(({ params }): Observable<Params> => params),
      takeUntil(this._destroyed$)
    );

    mappedRoute.subscribe({
      next: (params) => {
        const paths = this.router.routerState.snapshot.url;

        const paramMap: Record<string, string> = {};
        Object.assign(paramMap, params);

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

  ngOnDestroy(): void {
    this._destroyed$.next(true);
    this._destroyed$.complete();
  }
}