import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, map, of, Subject, switchMap, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivatedParamsService implements OnDestroy {
  private _param$ = new BehaviorSubject<Record<string, string>>({});
  readonly paramsMap$ = this._param$.asObservable();

  private _data$ = new BehaviorSubject<Record<string, any>>({});
  readonly dataMap$ = this._data$.asObservable();

  private _path$ = new BehaviorSubject<string>('');
  readonly pathMap$ = this._path$.asObservable();

  private _destroyed$ = new Subject<boolean>();

  private isShallowEqual<V = string | Record<string, unknown>>(prev: V, curr: V): boolean {
    return prev === curr;
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
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      switchMap(({ params, data }) => of({ params, data })),
      takeUntil(this._destroyed$)
    );

    mappedRoute.subscribe({
      next: ({ params, data }) => {
        const paths = this.router.routerState.snapshot.url;

        const paramMap: Record<string, string> = {};
        Object.assign(paramMap, params['_value']);

        const dataMap: Record<string, unknown> = {};
        Object.assign(dataMap, data['_value']);

        /*  add leaf child params */

        if (!this.isShallowEqual(this._param$.getValue(), paramMap)) {
          this._param$.next(paramMap);
        }

        if (!this.isShallowEqual(this._data$.getValue(), dataMap)) {
          this._data$.next(dataMap);
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