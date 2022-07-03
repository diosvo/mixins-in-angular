import { ChangeDetectorRef, inject, ViewRef } from '@angular/core';
import { Observable, Subject, takeUntil, UnaryFunction } from 'rxjs';

export function untilDestroy<T>(): UnaryFunction<
  Observable<T>,
  Observable<T>
> {
  const viewRef = inject(ChangeDetectorRef) as ViewRef;
  const destroy$ = new Subject();

  viewRef.onDestroy(() => destroy$.next(true));
  return (observable: Observable<T>) => observable.pipe(takeUntil(destroy$));
}