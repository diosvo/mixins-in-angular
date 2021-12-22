import { Component } from '@angular/core';
import { UserDetailsService } from '@lib/services/users/user-details.service';
import { User } from '@lib/services/users/user-service.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'user-breadcrumbs',
  templateUrl: './breadcrumbs.component.html'
})
export class BreadcrumbsComponent {
  user$: Observable<User> = this.service.currentUser$;

  constructor(private readonly service: UserDetailsService) { }
}
