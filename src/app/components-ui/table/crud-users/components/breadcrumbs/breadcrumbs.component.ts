import { Component } from '@angular/core';
import { UserDetailsService } from '@lib/services/users/user-details.service';
import { Observable, pluck } from 'rxjs';

@Component({
  selector: 'user-breadcrumbs',
  templateUrl: './breadcrumbs.component.html'
})
export class BreadcrumbsComponent {
  name$: Observable<string> = this.service.currentUser$.pipe(
    pluck('name'),
  ) as Observable<string>;

  constructor(private readonly service: UserDetailsService) { }
}
