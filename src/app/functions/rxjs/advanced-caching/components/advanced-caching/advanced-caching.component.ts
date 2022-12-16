import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { slideInOut } from '@lib/animations/animations';
import { AlertComponent } from '@lib/components/alert/alert.component';
import { CustomButtonComponent } from '@lib/components/custom-button/custom-button.component';
import { TableColumnDirective } from '@lib/components/custom-table/custom-table-abstract.directive';
import { CustomTableComponent, TableColumn } from '@lib/components/custom-table/custom-table.component';
import { Comment } from '@lib/models/json-placeholder/comment.model';
import { LineBreakPipe } from '@lib/pipes/line-break.pipe';
import { DestroyService } from '@lib/services/destroy/destroy.service';
import { defaultIfEmpty, map, merge, mergeMap, Observable, skip, Subject, switchMap, take, takeUntil } from 'rxjs';
import { AdvancedCachingService } from '../../services/advanced-caching.service';

@Component({
  selector: 'app-advanced-caching',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    RouterModule,

    LineBreakPipe,
    AlertComponent,
    TableColumnDirective,
    CustomTableComponent,
    CustomButtonComponent,
  ],
  animations: [slideInOut],
  templateUrl: './advanced-caching.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvancedCachingComponent implements OnInit, OnDestroy {

  protected comments$: Observable<Comment[]>;
  protected showNotification$: Observable<boolean>;

  protected update$ = new Subject<void>();
  protected forceReload$ = new Subject<void>();

  protected readonly columns: TableColumn[] = [
    { key: 'postId', flex: '10%' },
    { key: 'id', flex: '10%' },
    { key: 'name', flex: '30%' },
    { key: 'email', flex: '20%', disableSorting: true, },
    { key: 'body', flex: '50%', disableSorting: true, truncate: false },
  ];

  constructor(
    private readonly destroy$: DestroyService,
    private readonly service: AdvancedCachingService,
  ) { }

  ngOnInit(): void {
    this.fetchComments();
    this.showNotification();
  }

  forceReload(): void {
    this.service.forceReload();
    this.forceReload$.next();
  }

  private fetchComments(): void {
    const initial$ = this.getCommentsOnce();
    const updates$ = merge(this.update$, this.forceReload$).pipe(
      mergeMap(() => this.getCommentsOnce()),
      takeUntil(this.destroy$)
    );
    this.comments$ = merge(initial$, updates$);
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

  private getNotification(): Observable<Comment[]> {
    return this.service.comments.pipe(skip(1));
  }

  private getCommentsOnce(): Observable<Comment[]> {
    return this.service.comments.pipe(take(1), defaultIfEmpty([]));
  }

  ngOnDestroy(): void {
    this.forceReload();
  }
}
