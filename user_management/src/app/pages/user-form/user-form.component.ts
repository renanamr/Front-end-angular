import { Component} from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { cpfValidator } from '../../validators/cpf_validator';

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
      name: new FormControl('', Validators.required),
      cpf: new FormControl('', [Validators.required, cpfValidator]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const user: User = new User({
        id: this.userId!,
        name: this.userForm.value.name,
        email: this.userForm.value.email,
        cpf: this.userForm.value.cpf,
      });

      this.router.navigate(['/users']);
    }
  }

}