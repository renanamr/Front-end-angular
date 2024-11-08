import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent{
  users: User[] = [
    new User({id: 1, name: "Renan", cpf: "000", email: "renan.morais@ifrn.edu.br"})
  ];
}