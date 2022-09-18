import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styles: [`
    .divider {
      width: 30rem;
      height: 1px;
      background: lightgray;
    }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNotFoundComponent { }
