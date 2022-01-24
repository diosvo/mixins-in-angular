import { Component } from '@angular/core';
import { delay, of } from 'rxjs';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent {

  list$ = of([
    {
      name: 'algorithms',
      image: 'assets/images/core/algorithms.png'
    },
    {
      name: 'data structures',
      image: 'assets/images/core/data-structures.png'
    }
  ]).pipe(delay(500));
}
