import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from '@lib/services/users/user-service.model';
import { UsersService } from '@lib/services/users/users.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [`
    :host {
      display: flex;
      justify-content: center;
    }
  `]
})
export class SearchPageComponent implements OnInit {

  users$: Observable<Array<User>>;
  imported$: Observable<Array<User>>;

  control = new FormControl('', Validators.required);
  selected = new FormControl([], Validators.required);

  constructor(
    private readonly service: UsersService
  ) { }

  ngOnInit(): void {
    this.users$ = this.service.all();
    this.imported$ = this.service.lookup(this.users$, this.selected.valueChanges);
  }

  stateChanges(id: number): void {
    this.selected.setValue([...this.control.value, id]);
  }
}