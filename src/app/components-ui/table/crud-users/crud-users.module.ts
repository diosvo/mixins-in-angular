import { NgModule } from '@angular/core';
import { UserDetailsService } from '@lib/services/users/user-details.service';
import { UsersService } from '@lib/services/users/users.service';
import { CrudUsersRoutingModule } from './crud-users-routing.module';

@NgModule({
  imports: [CrudUsersRoutingModule],
  providers: [UsersService, UserDetailsService]
})
export class CrudUsersModule { }
