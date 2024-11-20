import { Component} from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent{
  userForm: FormGroup;
  editMode = false;
  userId: number | null = null;

  constructor(
    private router: Router,
  ) {
    this.userForm = new FormGroup({
      name: new FormControl(''),
      cpf: new FormControl(''),
      email: new FormControl(''),
    });
  }

  onSubmit(): void {
    const user: User = new User({
      id: this.userId!,
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      cpf: this.userForm.value.cpf,
    });
  }

}