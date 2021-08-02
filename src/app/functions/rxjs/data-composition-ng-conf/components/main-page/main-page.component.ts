import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'data-composition-main-page',
  templateUrl: './main-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor() { }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
