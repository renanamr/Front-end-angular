import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user_service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent{
  users: User[];

  constructor(private userService: UserService) {
    this.users = this.userService.getUsers();
  }
}