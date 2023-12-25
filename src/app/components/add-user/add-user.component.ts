import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/models/role.model';
import { RoleService } from 'src/app/services/role.service';
import { ConfirmedValidator } from '../utils/confirmedValidator';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addUser!: FormGroup;
  roles: Array<Role> = [];
  progress: boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private userService: UserService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getRoleActive();
    this.addUser = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      lastName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      email: ["", [Validators.required, Validators.email]],
      idRole: ["", [Validators.required]],
      active: ["", [Validators.required]],
      phoneNumber: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      confirmPassword: ["", [Validators.required]]
    },
      {
        validator: ConfirmedValidator('password', 'confirmPassword')
      });
  }
  getRoleActive() {
    this.roleService.getAllRolesActive().subscribe({
      next: (data) => {
        this.roles = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);

      }
    });
  }
  saveUser() {
    if (this.addUser.valid) {
      this.progress = false;
      this.userService.addUser(this.addUser.value).subscribe({
        next: (data) => {
          console.log(data);
          this.progress = true;
          this.addUser.reset();
          this.toastrService.success("Operation with success", "GOOD!");
        },
        error: (err) => {
          console.log(err);
          this.toastrService.error(err.error.errorMessage, "OOPS!");
          this.progress = true;
        }
      })
    }
  }
}
