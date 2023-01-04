import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { UsersComponent } from "./components/users/users.component";
import { CreateUserComponent } from "./components/create-user/create-user.component";
import { EditUserComponent } from "./components/edit-user/edit-user.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { LogInComponent } from "./components/log-in/log-in.component";
import { PermissionGuard } from "./guard/permission-guard.service";
import { RolesForPermission } from "./interfaces/roles-for-permission";
import { Role } from "./interfaces/role";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {
    path: 'users', component: UsersComponent,
    data: {allowedRoles: [Role.admin, Role.manager]} as RolesForPermission,
    canActivate: [PermissionGuard]
  },
  {
    path: 'users/create', component: CreateUserComponent,
    data: {allowedRoles: [Role.admin]} as RolesForPermission,
    canActivate: [PermissionGuard]
  },
  {
    path: 'users/edit/:id', component: EditUserComponent,
    data: {allowedRoles: [Role.manager]} as RolesForPermission,
    canActivate: [PermissionGuard]
  },
  {path: 'log-in', component: LogInComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [PermissionGuard, Permissions]
})
export class AppRoutingModule {
}
