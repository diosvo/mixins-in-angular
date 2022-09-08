import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { slideInOut } from '@lib/animations/animations';
import { AlertComponent } from '@lib/components/alert/alert.component';
import { CustomButtonComponent } from '@lib/components/custom-button/custom-button.component';
import { TableColumnDirective } from '@lib/components/custom-table/custom-table-abstract.directive';
import { CustomTableComponent, TableColumn } from '@lib/components/custom-table/custom-table.component';
import { LineBreakPipe } from '@lib/pipes/line-break.pipe';
import { map, merge, mergeMap, Observable, skip, Subject, switchMap, take } from 'rxjs';
import { Joke, JokesService } from '../../services/jokes.service';

@Component({
  selector: 'app-advanced-caching',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,

    LineBreakPipe,
    AlertComponent,
    TableColumnDirective,
    CustomTableComponent,
    CustomButtonComponent,
  ],
  animations: [slideInOut],
  templateUrl: './advanced-caching.component.html',
})
export class AdvancedCachingComponent implements OnInit {

  protected jokes$: Observable<Joke[]>;
  protected showNotification$: Observable<boolean>;

  protected update$ = new Subject<void>();
  protected forceReload$ = new Subject<void>();

  protected columns: TableColumn[] = [
    { key: 'id', flex: '10%' },
    { key: 'joke', flex: '70%' },
    { key: 'categories', flex: '30%' },
  ];

  constructor(
    private readonly service: JokesService,
  ) { }

  ngOnInit(): void {
    this.fetchJokes();
    this.showNotification();
  }

  forceReload(): void {
    this.service.forceReload();
    this.forceReload$.next();
  }

  private fetchJokes(): void {
    const initial$ = this.getJokesOnce();
    const updates$ = merge(this.update$, this.forceReload$).pipe(
      mergeMap(() => this.getJokesOnce())
    );
    this.jokes$ = merge(initial$, updates$);
  }

  private showNotification(): void {
    const initial$ = this.getNotification();
    const reload$ = this.forceReload$.pipe(
      switchMap(() => this.getNotification())
    );
    const show$ = merge(initial$, reload$).pipe(map(() => true));
    const hide$ = this.update$.pipe(map(() => false));
    this.showNotification$ = merge(show$, hide$);
  }

  private getNotification(): Observable<Joke[]> {
    return this.service.jokes.pipe(skip(1));
  }

  private getJokesOnce(): Observable<Joke[]> {
    return this.service.jokes.pipe(take(1));
  }
}
