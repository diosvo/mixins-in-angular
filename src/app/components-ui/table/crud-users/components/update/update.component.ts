import { Component, OnInit } from '@angular/core';
import { UsersService } from '@lib/services/users/users.service';

@Component({
  selector: 'update-user',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  constructor(
    private readonly userService: UsersService,
  ) { }

  ngOnInit(): void { }

  onUpdate(): void {
    this.userService.update({ id: 1 }).subscribe({
      next: (response) => console.log('demo', response)
    })
  }
}
