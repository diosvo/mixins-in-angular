import { Component, OnInit } from '@angular/core';
import { IUser } from '@lib/models/user';
import { UsersService } from '@lib/services/users/users.service';
import { catchError, Observable, Subject, throwError } from 'rxjs';

type User = Partial<IUser>;

@Component({
  selector: 'list-users',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  users$: Observable<Array<User>>;
  errorMessage$ = new Subject<string>();

  constructor(readonly userService: UsersService) { }

  ngOnInit(): void {
    this.users$ = this.userService.all().pipe(
      catchError(({ message }) =>
        throwError(() => {
          this.errorMessage$.next(message);
          return new Error(message);
        })
      ),
    )
  }
}