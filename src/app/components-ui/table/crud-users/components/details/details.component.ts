import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'user-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  form = this.fb.group({
    name: [''],
    email: ['']
  })

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

}
