import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '@lib/models/user';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import { UsersService } from '@lib/services/users/users.service';

type User = Partial<IUser>;

@Component({
  selector: 'create-user',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  user: User;

  constructor(
    private readonly router: Router,
    private readonly snackbar: SnackbarService,
    private readonly userService: UsersService
  ) { }

  onFormChanged(data: { name: string, email: string }): void {
    this.user = data;
  }

  onCreate(): void {
    this.userService.create(this.user).subscribe({
      next: () => this.snackbar.success('The user has been created.'),
      error: ({ message }) => this.snackbar.success(message),
      complete: () => this.router.navigate(['ui-components/table/crud-users'])
    });
  }
}
