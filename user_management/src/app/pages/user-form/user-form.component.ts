import { Component, OnInit} from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { cpfValidator } from '../../validators/cpf_validator';
import { UserService } from '../../services/user_service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit{
  userForm: FormGroup;
  editMode = false;
  userId: number | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
  ) {
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      cpf: new FormControl('', [Validators.required, cpfValidator]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = +params.get('id')!;
      if (this.userId) {
        this.editMode = true;
        const user = this.userService.getUserById(this.userId);
        if (user) {
          this.userForm.patchValue(user);
        }
      }
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

      if (this.editMode) {
        this.userService.updateUser(user);
      } else {
        this.userService.addUser(user);
      }

      this.router.navigate(['/users']);
    }
  }

}