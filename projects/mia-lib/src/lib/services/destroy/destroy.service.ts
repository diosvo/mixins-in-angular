import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscriber } from 'rxjs';

@Injectable()
export class DestroyService extends Observable<void> implements OnDestroy {

  private life$ = new Subject<void>();

  constructor() {
    super((subscriber: Subscriber<void>) => this.life$.subscribe(subscriber));
  }

  ngOnDestroy(): void {
    this.life$.next();
    this.life$.complete();
  }
}
