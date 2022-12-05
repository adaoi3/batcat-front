import { Component } from '@angular/core';
import { User } from "../../interfaces/User";

@Component({
  selector: 'batcat-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  users: User[] = [
    {
      id: 3,
      name: 'Egor',
      password: '1234',
      email: 'gmail'
    },
    {
      id: 3,
      name: 'Egor',
      password: '1234',
      email: 'gmail'
    }
  ];

  displayedColumns: string[] = ['id', 'name', 'password', 'email'];

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

  //
  // this.users.push({
  //   id: 1,
  //   name: 'asdf'
  // });
  //
  // this.users = [...this.users, {
  //   id: 1,
  //   name: 'asdf'
  // }]
  //
  // let u: User = {
  //   id: 2,
  //   name: 'sdf'
  // }
  //
  // u.name = 'asdfasd';
  //
  // u = {
  //   ...u,
  //   name: 'dsfgdfg'
  // }
  //
  // }

}
