import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component, OnInit
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomInputComponent } from '@lib/components/custom-input/custom-input.component';
import { CustomTableComponent, TableColumn } from '@lib/components/custom-table/custom-table.component';
import { UserDetailsService } from '@lib/services/users/user-details.service';
import { User } from '@lib/services/users/user-service.model';
import { UsersService } from '@lib/services/users/users.service';

@Component({
  selector: 'app-advanced-crud',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    CustomInputComponent,
    CustomTableComponent
  ],
  templateUrl: './advanced-crud.component.html',
  styleUrls: ['./advanced-crud.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdvancedCrudComponent implements OnInit {

  readonly state$ = this.list.users_state$;
  readonly columns: TableColumn[] = [
    { key: 'id', flex: '10%' },
    { key: 'name', flex: '20%' },
    { key: 'email', flex: '20%' },
    { key: 'phone', flex: '15%' },
    { key: 'actions', flex: '20%', truncate: false },
  ];

  form: FormGroup = this.fb.group({
    rows: this.fb.array([])
  });
  isEdit: boolean;
  rowValue: User;

  constructor(
    private readonly fb: FormBuilder,
    private readonly list: UsersService,
    private readonly details: UserDetailsService,
  ) { }

  ngOnInit(): void {
    this.list.loadState();
  }

  /**
   * @description add new user
   */

  addNewRow(): void {
    this.isEdit = false;
    this.rows.push(this.details.buildForm());
    this.list.executeJob('create$', this.rowValue.id);
  }

  editItem(idx: number): void {
    this.isEdit = true;
    this.rowValue = this.getRowValue(idx);
    this.rows.at(idx).get('isEditable').patchValue(true);
    this.list.executeJob('update$', this.rowValue.id);
  }

  deleteItem(idx: number): void {
    this.rows.removeAt(idx);
    this.list.executeJob('remove$', this.rowValue.id);
  }

  saveChanges(idx: number): void {
    this.rows.at(idx).get('isEditable').patchValue(false);
  }

  cancelChanges(idx: number): void {
    switch (this.isEdit) {
      case false: {
        this.deleteItem(idx);
        break;
      }
      case true: {
        this.rows.at(idx).patchValue(this.rowValue);
        this.rows.at(idx).get('isEditable').patchValue(false);
        break;
      }
      default:
        this.rows.at(idx).get('isEditable').patchValue(false);
        break;
    }
  }

  isValid(idx: number): boolean {
    return this.rows.at(idx).valid;
  }

  private getRowValue(idx: number): User {
    const values = this.rows.at(idx).value;
    delete values.isEditable;

    return this.rowValue = values;
  }

  get rows(): FormArray {
    return this.form.get('rows') as FormArray;
  }
}
