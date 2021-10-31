import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IUser } from '@lib/models/user';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

type User = Partial<IUser>;

@Component({
  selector: 'user-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnChanges, OnDestroy {
  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });
  destroy$ = new Subject<void>();

  @Input() user: User;
  @Output() isValid = new EventEmitter<boolean>();
  @Output() changed = new EventEmitter<{ name: string, email: string }>();

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(details => {
        this.changed.emit(details);
        this.isValid.emit(this.form.valid);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { user: { currentValue } } = changes;
    this.form.patchValue(currentValue);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
