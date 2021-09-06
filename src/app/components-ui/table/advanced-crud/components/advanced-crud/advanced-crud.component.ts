import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ICategory } from '@lib/models/category';
import { CategoryService } from '@lib/services/category/category.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-advanced-crud',
  templateUrl: './advanced-crud.component.html',
  styleUrls: ['./advanced-crud.component.scss'],
})

export class AdvancedCrudComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource = new MatTableDataSource<unknown>([]);
  category$: Observable<Array<ICategory>>;

  form: FormGroup = this.fb.group({
    rows: this.fb.array([])
  });
  isEdit: boolean;
  rowValue: ICategory;

  private destroy$ = new Subject();

  @ViewChild('searchInput') searchInput: ElementRef<HTMLElement>;
  @ViewChildren('focusInput') focusInput: QueryList<ElementRef>;

  constructor(
    private ngZone: NgZone,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private service: CategoryService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.category$ = this.service.all().pipe(
      tap({
        next: (data) => {
          this.form = this.fb.group({
            rows: this.fb.array(data.map(item =>
              this.fb.group({
                categoryId: item.categoryId,
                categoryName: item.categoryName,
                isEditable: [false]
              })
            ))
          });
          this.dataSource = new MatTableDataSource(this.rows.controls);
        }
      }),
      takeUntil(this.destroy$)
    );
  }

  /**
   * @description Adding new row
   */

  addNewRow(): void {
    this.isEdit = false;
    this.rows.push(this.initRow());
    this.dataSource = new MatTableDataSource(this.rows.controls);
  }

  editItem(idx: number): void {
    this.isEdit = true;
    this.rowValue = this.getRowValue(idx);
    this.rows.at(idx).get('isEditable').patchValue(true);
  }

  deleteItem(idx: number): void {
    this.rows.removeAt(idx);
    this.dataSource = new MatTableDataSource(this.rows.controls);
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
        this.rows.at(idx).patchValue({
          categoryId: this.rowValue.categoryId,
          categoryName: this.rowValue.categoryName,
        });
        this.rows.at(idx).get('isEditable').patchValue(false);
        break;
      }
      default:
        this.rows.at(idx).get('isEditable').patchValue(false);
        break;
    }
  }

  isValidRow(idx: number): boolean {
    return !this.rows.at(idx).valid;
  }

  onFocus(): void {
    /**
     * @description: another way to set autofocus: OnPush
     * @issues: delete the first item, it returns this.focusInput.first is undefined
     this.focusInput.changes.subscribe(() => {
        return this.focusInput.last.nativeElement.focus();
      });
     */

    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.focusInput.last.nativeElement.focus();
        this.cdr.detectChanges();
      });
    });
  }

  private getRowValue(idx: number): ICategory {
    const values = this.rows.at(idx).value;
    delete values.isEditable;

    return this.rowValue = values;
  }

  get rows(): FormArray {
    return this.form.get('rows') as FormArray;
  }

  private initRow(): FormGroup {
    return this.fb.group({
      categoryId: [null, Validators.required],
      categoryName: [null, Validators.required],
      isEditable: [true]
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
