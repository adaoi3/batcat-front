import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { UsersComponent } from "./components/users/users.component";
import { CreateUserComponent } from "./components/create-user/create-user.component";
import { EditUserComponent } from "./components/edit-user/edit-user.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { LogInComponent } from "./components/log-in/log-in.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/create', component: CreateUserComponent },
  { path: 'users/edit/:id', component: EditUserComponent },
  { path: 'log-in', component: LogInComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
