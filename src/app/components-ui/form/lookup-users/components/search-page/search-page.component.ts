import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from '@lib/services/users/user-service.model';
import { UsersService } from '@lib/services/users/users.service';
import { Observable, Subject } from 'rxjs';

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

  users$: Observable<User[]>;
  selected$ = new Subject<string>();
  control = new FormControl('', Validators.required);

  constructor(
    private readonly service: UsersService
  ) { }

  ngOnInit(): void {
    this.users$ = this.service.all();
  }

  stateChanges(name: string): void {
    this.selected$.next(name);
  }
}