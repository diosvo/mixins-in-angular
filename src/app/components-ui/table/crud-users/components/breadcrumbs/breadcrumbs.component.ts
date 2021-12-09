import { Component, Input } from '@angular/core';
import { User } from '@lib/services/users/users.service';

@Component({
  selector: 'user-breadcrumbs',
  templateUrl: './breadcrumbs.component.html'
})
export class BreadcrumbsComponent {
  @Input() user: User;
}
