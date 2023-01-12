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
import { PetsComponent } from "./components/pets/pets.component";
import { CreatePetComponent } from "./components/create-pet/create-pet.component";
import { EditPetComponent } from "./components/edit-pet/edit-pet.component";
import { UserPetsComponent } from "./components/user-pets/user-pets.component";
import { CreateUserPetComponent } from "./components/create-user-pet/create-user-pet.component";
import { EditUserPetComponent } from "./components/edit-user-pet/edit-user-pet.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'users', component: UsersComponent,
    data: { allowedRoles: [Role.admin, Role.manager] } as RolesForPermission,
    canActivate: [PermissionGuard]
  },
  {
    path: 'users/create', component: CreateUserComponent,
    data: { allowedRoles: [Role.admin] } as RolesForPermission,
    canActivate: [PermissionGuard]
  },
  {
    path: 'users/edit/:id', component: EditUserComponent,
    data: { allowedRoles: [Role.manager] } as RolesForPermission,
    canActivate: [PermissionGuard]
  },
  { path: 'log-in', component: LogInComponent },
  {
    path: 'pets', component: PetsComponent,
    data: { allowedRoles: [Role.admin, Role.manager] } as RolesForPermission,
    canActivate: [PermissionGuard]
  },
  {
    path: 'pets/create', component: CreatePetComponent,
    data: { allowedRoles: [Role.admin] } as RolesForPermission,
    canActivate: [PermissionGuard]
  },
  {
    path: 'pets/edit/:id', component: EditPetComponent,
    data: { allowedRoles: [Role.manager] } as RolesForPermission,
    canActivate: [PermissionGuard]
  },
  {
    path: 'my-pets', component: UserPetsComponent,
    data: { allowedRoles: [Role.user] } as RolesForPermission,
    canActivate: [PermissionGuard]
  },
  {
    path: 'my-pets/create', component: CreateUserPetComponent,
    data: { allowedRoles: [Role.user] } as RolesForPermission,
    canActivate: [PermissionGuard]
  },
  {
    path: 'my-pets/edit/:id', component: EditUserPetComponent,
    data: { allowedRoles: [Role.user] } as RolesForPermission,
    canActivate: [PermissionGuard]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [PermissionGuard, Permissions]
})
export class AppRoutingModule {
}
