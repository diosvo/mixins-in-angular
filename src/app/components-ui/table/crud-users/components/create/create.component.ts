import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import { UserDetailsService } from '@lib/services/users/user-details.service';
import { User } from '@lib/services/users/user-service.model';
import { finalize } from 'rxjs';

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
    private readonly service: UserDetailsService,
  ) { }

  onFormChanged(data: User): void {
    this.user = data;
  }

  onCreate(): void {
    this.saving = true;
    this.service.create(this.user)
      .pipe(finalize(() => this.saving = false))
      .subscribe({
        next: () => this.snackbar.success('The user has been created.'),
        error: ({ message }) => this.snackbar.error(message),
        complete: () => this.router.navigate(['ui-components/table/crud-users'])
      });
  }
}
