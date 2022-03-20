import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'data-composition-main-page',
  templateUrl: './main-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent {

  constructor() { }

}
