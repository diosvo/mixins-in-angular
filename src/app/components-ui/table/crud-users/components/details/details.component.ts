import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IUser } from '@lib/models/user';

type User = Partial<IUser>;

@Component({
  selector: 'user-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  form = this.fb.group({
    name: [''],
    email: ['']
  });

  @Input() user!: User;
  @Output() changed = new EventEmitter<{ name: string, email: string }>();

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(response => this.changed.emit(response))
  }
}
