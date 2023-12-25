import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/models/role.model';
import { RoleService } from 'src/app/services/role.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  roleForm!: FormGroup;
  roles: Array<Role> = [];
  role: any = {};
  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllRoles();
    this.roleForm = this.formBuilder.group(
      {
        nameRole: ["", [Validators.minLength(3), Validators.required]],
        active: ["", [Validators.required]]
      }
    );

  }
  getAllRoles() {
    this.roleService.getAllRoles().subscribe({
      next: (data) => {
        console.log("here all roles", data);
        this.roles = data;
      }
    });
  }

  addRole() {
    if (this.roleForm.valid) {
      console.log(this.roleForm.value);
      this.roleService.addRole(this.roleForm.value).subscribe({
        next: () => {
          this.roleForm.reset();
          this.getAllRoles();
          this.toastrService.success("Operation with success", "GOOD!");
        },
        error: (err) => {
          this.toastrService.error("Failed operation", "OOPS!");
          console.log(err);
        }
      });
    }
  }
  updateRoleState(idRole: number, active: boolean) {

    Swal.fire({
      title: 'Confirm !',
      text: `Would you really want to ${active ? 'disable' : 'enable'} this role ?`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      cancelButtonColor: "#FF0000",
      confirmButtonColor: "#008000",
    }).then((result) => {
      if (result.isConfirmed) {

        if (active) {
          this.roleService.invalidateRole(idRole).subscribe({
            next: () => {
              this.getAllRoles();
              Swal.fire('Success', 'Role disabled', 'success');
            }
          });
        } else {
          this.roleService.validateRole(idRole).subscribe({
            next: () => {
              this.getAllRoles();
              Swal.fire('Success', 'Role enabled', 'success');
            }
          });
        }
      }
    });
  }

  findRoleById(idRole: number) {
    this.roleService.findRoleById(idRole).subscribe({
      next: (data) => {
        this.role = data;
      },
      error: (err) => {
        console.log(err);

      }
    });
  }
  updateRole() {
    console.log(this.role);
    this.roleService.addRole(this.role).subscribe({
      next: () => {
        this.toastrService.success("Operation with success", "GOOD!");
        this.getAllRoles();
      },
      error: (err) => {
        this.toastrService.error("Failed operation", "OOPS!");
        console.log(err);

      }
    });

  }
}
