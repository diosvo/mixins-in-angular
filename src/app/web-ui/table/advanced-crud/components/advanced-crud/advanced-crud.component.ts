import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { slideInOut } from 'src/app/library/animations/animations';
import { ICategory } from 'src/app/library/models/category';

@Component({
  selector: 'app-advanced-crud',
  templateUrl: './advanced-crud.component.html',
  animations: [slideInOut],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdvancedCrudComponent  {
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource = new MatTableDataSource<any>();

  form: FormGroup = this.fb.group({
    rows: this.fb.array([])
  });
  isEdit: boolean;
  rowValue: ICategory;

  @ViewChild('searchInput') searchInput: ElementRef<HTMLElement>;
  @ViewChildren('focusInput') focusInput: QueryList<ElementRef>;

  visibleBox = false;

  constructor(
    private fb: FormBuilder,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) { }

  /* ngOnInit(): void {
    // problem: cant not path value between form array with response data from service
  } */

  /**
   * @description: adding new row
   */

  addNewRow(): void {
    this.isEdit = false;
    this.rows.push(this.initRow());
    this.dataSource = new MatTableDataSource(this.rows.controls);
  }

  editItem(idx: number): void {
    this.isEdit = true;
    this.rowValue = this.getRowValue(idx);
    this.rows.at(idx).get('isEditable').patchValue(false);
  }

  deleteItem(idx: number): void {
    this.rows.removeAt(idx);
    this.dataSource = new MatTableDataSource(this.rows.controls);
  }

  saveChanges(idx: number): void {
    this.rows.at(idx).get('isEditable').patchValue(true);
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
        this.rows.at(idx).get('isEditable').patchValue(true);
        break;
      }
      default:
        this.rows.at(idx).get('isEditable').patchValue(true);
        break;
    }
  }

  isValidRow(idx: number): boolean {
    return this.rows.at(idx).valid ? false : true;
  }

  onFocus(): void {
    /***
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

  onEnter(idx: number, event: KeyboardEvent): void {
    if (event.key === 'Enter' && !this.isValidRow(idx)) {
      this.saveChanges(idx);
      event.preventDefault();
    }
    return;
  }

  private getRowValue(idx: number): ICategory {
    const values = this.rows.at(idx).value;
    delete values.isEditable;

    return this.rowValue = values;
  }

  private get rows(): FormArray {
    return this.form.get('rows') as FormArray;
  }

  private initRow(): FormGroup {
    return this.fb.group({
      categoryId: [null, Validators.required],
      categoryName: [null, Validators.required],
      isEditable: [false]
    });
  }

  /**
   * @description: searching related
   */

  openSearchBox(): void {
    this.visibleBox = !this.visibleBox;
  }

  onSearch(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSearchFocus(): void {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        if (this.searchInput) {
          this.searchInput.nativeElement.focus();
          this.cdr.detectChanges();
        }
      });
    });
  }
}
