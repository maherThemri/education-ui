import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { RoleComponent } from './components/role/role.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "",
    component: MainPageComponent,
    //canActivate: [TokenGuard],
    children: [
      { path: "", component: DashboardComponent },
      { path: "users", component: UsersComponent },
      { path: "users/addUser", component: AddUserComponent },
      { path: "role", component: RoleComponent },
      { path: "edit-user/:id", component: EditUserComponent },
      { path: '', redirectTo: "dashboard", pathMatch: "full" }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
