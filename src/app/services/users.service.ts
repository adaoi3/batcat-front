import { Injectable } from '@angular/core';
import { User } from "../interfaces/user";
import { BehaviorSubject, Observable } from "rxjs";

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

  createUser(user: User) {
    user.id = this.generateNextUserId();
    this.usersSubject.next([...this.usersSubject.getValue(), user]);
  }

  deleteUser(id: number) {
    this.usersSubject.next(this.usersSubject.getValue().filter(user => user.id !== id));
  }

  getUserById(id: number): User | undefined {
    return this.usersSubject.getValue().at(this.usersSubject.getValue().length - 1);
  }

  editUser(id: number) {
    // this.usersSubject.next(this.usersSubject.getValue().;
  }

}
