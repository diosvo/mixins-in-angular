import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IUser } from '@lib/models/user';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

type User = Partial<IUser>;

@Component({
  selector: 'user-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  form = this.fb.group({
    name: [''],
    email: ['']
  });
  destroy$ = new Subject<void>();

  @Input() user!: User;
  @Output() changed = new EventEmitter<{ name: string, email: string }>();

  constructor(
    private fb: FormBuilder,
  ) { }


  ngOnInit(): void {
    this.form.patchValue(this.user);
    this.form.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(response => this.changed.emit(response));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
