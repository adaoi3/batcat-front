import { Component, OnInit } from '@angular/core';
import { User } from "../../interfaces/user";
import { UserService } from "../../services/user.service";
import { MatDialog } from "@angular/material/dialog";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'batcat-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'login', 'email',
    'roles', 'date', 'actions'];

  constructor(
    public dialog: MatDialog,
    private usersService: UserService,
    public authService: AuthService
  ) {
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.usersService.getUsers(/*token*/).subscribe({
      next: users => this.users = users,
      error: error => console.error(error),
      complete: () => console.log("completed")
    })
  }

  getRolesNamesArr(roles: string[]): string {
    return roles.map(role => role[0].toUpperCase() + role.slice(1).toLowerCase()).join(', ');
  }

  deleteUser(id: number): void {
    // const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    //   data: {
    //     title: 'Delete user',
    //     message: 'Are you sure you want to delete the user?'
    //   },
    // });         // TODO  NO delete!
    //
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.usersService.deleteUser(id).subscribe(
    //       () => this.users = this.users.filter(user => user.id !== id)
    //     );
    //   }
    // });
    this.usersService.deleteUser(id).subscribe(
      () => this.users = this.users.filter(user => user.id !== id)
    );
  }

  createRandomUser(): void {
    this.usersService.createUser({
      firstName: btoa(Math.random().toString()).substring(6, 15),
      lastName: btoa(Math.random().toString()).substring(6, 15),
      login: btoa(Math.random().toString()).substring(6, 15),
      password: btoa(Math.random().toString()).substring(6, 15),
      email: btoa(Math.random().toString()).substring(8, 15) + '@mail',
      roles: ["Admin", "User", "Manager"] || [],   // Транспиляция (из ts -> js)
      date: '1995-02-08',
    }).subscribe();
  }

}
