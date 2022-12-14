import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  currentId = 1;
  usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([])

  constructor() {
  }

  generateNextUserId(): number {
    return this.currentId++;
  }

  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  getUserByLoginAndPassword(login: string, password: string): User | null {
    let users = this.usersSubject.getValue();
    for (let id = 0; id < this.usersSubject.getValue().length; id++) {
      if (
        users[id].login === login &&
        users[id].password === password
      ) {
        return users[id]
      }
    }
    return null;
  }

  createUser(user: User) {
    user.id = this.generateNextUserId();
    this.usersSubject.next([...this.usersSubject.getValue(), user]);
  }

  deleteUser(id: number) {
    this.usersSubject.next(this.usersSubject.getValue().filter(user => user.id !== id));
  }

  getUserById(id: number): User {
    return this.usersSubject.getValue()[id - 1];
  }

  editUser(user: User) {
    let desired_user = this.usersSubject.getValue()[user.id - 1];
    desired_user.id = user.id;
    desired_user.firstName = user.firstName;
    desired_user.lastName = user.lastName;
    desired_user.lastName = user.lastName;
    desired_user.login = user.login;
    desired_user.password = user.password;
    desired_user.email = user.email;
    desired_user.roles = user.roles;
    desired_user.date = user.date;
  }

}
