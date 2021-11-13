import { Component, Input } from '@angular/core';
import { IUser } from '@lib/models/user';

type User = Partial<IUser>;

@Component({
  selector: 'user-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {
  @Input() user: User;
}
