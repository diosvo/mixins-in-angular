import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UsersService } from '@lib/services/users/users.service';
import { Subject } from 'rxjs';

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

  state$ = this.service.users_state$;
  selected$ = new Subject<string>();
  control = new FormControl('', Validators.required);

  constructor(
    private readonly service: UsersService
  ) { }

  ngOnInit(): void {
    this.service.loadState(this.control.valueChanges);
  }

  stateChanges(name: string): void {
    this.selected$.next(name);
  }
}