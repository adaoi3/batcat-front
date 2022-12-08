import { Component, OnInit } from '@angular/core';
import { User } from "../../interfaces/user";
import { UsersService } from "../../services/users.service";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'batcat-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];

  displayedColumns: string[] = ['id', 'name', 'password', 'email', 'delete'];

  constructor(
    public dialog: MatDialog,
    private usersService: UsersService
  ) {
  }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(value => this.users = value);
  }

  editUser(id: number): void {
    this.usersService.editUser(id);
  }

  deleteUser(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete user',
        message: 'Are you sure you want to delete the user?'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.usersService.deleteUser(id);
      }
    });
  }

}


// userNameInput = new FormControl('');
// deleteUserInput = new FormControl('');
// users: User[] = [];
// counter = 1;
//
// createUser($event: Event) {
//     $event.preventDefault();
//     this.users.push({
//       id: this.counter,
//       name: this.userNameInput.value || ''
//     })
//     this.counter++;
//     this.userNameInput.setValue(null);
//
// }
//
// deleteUserById($event: Event) {
//   $event.preventDefault();
//   this.users = this.users.filter(user => user.id !== Number(this.deleteUserInput.value));
//   this.deleteUserInput.setValue(null);

