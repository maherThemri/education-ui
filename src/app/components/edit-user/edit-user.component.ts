import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/models/role.model';
import { User } from 'src/app/models/user.model';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: User = {};
  roles: Array<Role> = [];
  id?: number;
  myImage!: string;
  uploadedImage!: File;
  isImageUpdated: Boolean = false;

  constructor(
    private roleService: RoleService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private toastrService: ToastrService

  ) { }

  ngOnInit(): void {
    this.getAllRole();
    this.findUserById();
  }
  findUserById() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.userService.findUserById(this.id!).subscribe({
      next: (data) => {
        this.user = data;
      }
    });

  }
  getAllRole() {
    this.roleService.getAllRoles().subscribe({
      next: (data) => {
        this.roles = data;
      }
    });
  }

  updateUser() {
    this.userService.addUser(this.user).subscribe({
      next: (data) => {
        // this.userService.uploadImageFS(this.uploadedImage, this.uploadedImage.name, this.id!).subscribe({
        //   next: (data) => {
        //     console.log(data);
        //   }
        // });
        this.findUserById();
        this.toastrService.success("Operation with success", "GOOD!");
      },
    });
  }

  // onImageUpload(event: any) {
  //   if (event.target.files && event.target.files.length) {
  //     this.uploadedImage = event.target.files[0];
  //     //this.isImageUpdated = true;
  //     const reader = new FileReader();
  //     reader.readAsDataURL(this.uploadedImage);
  //     console.log(this.uploadedImage.name);

  //     reader.onload = () => { this.myImage = reader.result as string; };
  //   }
  // }

}
