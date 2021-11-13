import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '@lib/models/user';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import { UsersService } from '@lib/services/users/users.service';
import { finalize } from 'rxjs';

type User = Partial<IUser>;

@Component({
  selector: 'create-user',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  user: User;
  saving = false;
  isValid = false;

  constructor(
    private readonly router: Router,
    private readonly snackbar: SnackbarService,
    private readonly userService: UsersService
  ) { }

  onFormChanged(data: { name: string, email: string }): void {
    this.user = data;
  }

  onCreate(): void {
    this.saving = true;
    this.userService.create(this.user)
      .pipe(finalize(() => this.saving = false))
      .subscribe({
        next: () => this.snackbar.success('The user has been created.'),
        error: ({ message }) => this.snackbar.error(message),
        complete: () => this.router.navigate(['ui-components/table/crud-users'])
      });
  }
}
