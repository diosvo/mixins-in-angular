import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '@lib/components/alert/alert.component';
import { ConfirmDialogComponent, Dialog } from '@lib/components/confirm-dialog/confirm-dialog.component';
import { CustomButtonComponent } from '@lib/components/custom-button/custom-button.component';
import { CustomInputComponent } from '@lib/components/custom-input/custom-input.component';
import { TableColumnDirective } from '@lib/components/custom-table/custom-table-abstract.directive';
import { CustomTableComponent, TableColumn } from '@lib/components/custom-table/custom-table.component';
import { NoResultsComponent } from '@lib/components/no-results/no-results.component';
import { TrackByKeyDirective } from '@lib/directives/track-by-key.directive';
import { EAction } from '@lib/models/table';
import { FilterPipe } from '@lib/pipes/filter.pipe';
import { User } from '@lib/services/users/user-service.model';
import { UsersService } from '@lib/services/users/users.service';
import isEmpty from 'lodash.isempty';
import { filter, take } from 'rxjs';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'list-users',
  standalone: true,
  imports: [
    CommonModule,

    AlertComponent,
    NoResultsComponent,
    CustomTableComponent,
    CustomInputComponent,
    CustomButtonComponent,
    ConfirmDialogComponent,

    FilterPipe,
    TrackByKeyDirective,
    TableColumnDirective,
  ],
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {

  protected selection = [];
  readonly state$ = this.service.users_state$;

  protected query = new FormControl('', { nonNullable: true });
  @ViewChild(CustomTableComponent) private readonly table: CustomTableComponent<User>;
  @ViewChild('selectionTpl') private readonly selectionRef: TemplateRef<ElementRef>;

  readonly columns: TableColumn[] = [
    { key: 'id', flex: '10%' },
    { key: 'name', flex: '20%' },
    { key: 'email', flex: '20%' },
    { key: 'phone', flex: '20%' },
    { key: 'actions', flex: '15%', truncate: false },
  ];

  constructor(
    private readonly dialog: MatDialog,
    private readonly service: UsersService,
  ) { }

  ngOnInit(): void {
    this.service.loadState();
  }

  onBulk(user: User): void {
    this.dialog
      .open(DetailsComponent, {
        data: {
          user,
          isEdit: !isEmpty(user)
        },
        width: '500px',
        disableClose: true,
      })
      .afterClosed()
      .pipe(
        filter((ok: boolean) => ok),
        take(1)
      )
      .subscribe({
        next: () => this.service.adjust(isEmpty(user) ? EAction.CREATE : EAction.UPDATE, user.id)
      });
  }

  onDelete(users: User[]): void {
    let data: Dialog;

    if (users.length > 1) {
      data = {
        title: 'Delete',
        template: this.selectionRef,
        details: users
      };
    } else {
      data = {
        title: 'Delete',
        content: `Are you sure you want to delete ${users.at(0).name}?`
      };
    }

    this.dialog
      .open(ConfirmDialogComponent, {
        data,
        width: '450px',
        disableClose: true,
      })
      .afterClosed()
      .pipe(
        filter((ok: boolean) => ok),
        take(1)
      )
      .subscribe({
        next: () => {
          this.service.delete(users);
          this.onCancel();
        }
      });
  }

  onCancel(): void {
    this.table.deselectAll();
  }
}
