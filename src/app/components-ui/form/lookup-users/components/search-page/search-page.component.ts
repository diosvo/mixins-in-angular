import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from '@lib/services/users/user-service.model';
import { UsersService } from '@lib/services/users/users.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  users$: Observable<Array<User>>;
  control = new FormControl();

  constructor(
    private readonly service: UsersService
  ) { }

  ngOnInit(): void {
    this.users$ = this.service.all();
  }
}
