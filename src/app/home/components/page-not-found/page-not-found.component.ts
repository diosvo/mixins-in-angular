import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  standalone: true,
  styles: [`
    .divider {
      width: 30rem;
      height: 1px;
      background: var(--base-03);
    }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNotFoundComponent { }
