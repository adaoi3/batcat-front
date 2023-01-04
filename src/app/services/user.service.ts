import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { UserDto } from "../interfaces/user-dto";
import { DateTime } from "luxon";
import { AppSettings } from "../global-constants/app.settings";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<UserDto[]>(AppSettings.API_ENDPOINT + '/users').pipe(
      map(response => response.map(userDto => {
        return {
          id: userDto.id,
          firstName: userDto.firstName,
          lastName: userDto.lastName,
          login: userDto.login,
          password: userDto.password,
          email: userDto.email,
          roles: userDto.roles,
          date: userDto.date ? DateTime.fromISO(userDto.date) : undefined
        };
      }))
    )
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<UserDto>(`${AppSettings.API_ENDPOINT}/users/${id}`).pipe(
      map(userDto => {
        return {
          id: userDto.id,
          firstName: userDto.firstName,
          lastName: userDto.lastName,
          login: userDto.login,
          password: userDto.password,
          email: userDto.email,
          roles: userDto.roles,
          date: userDto.date ? DateTime.fromISO(userDto.date) : undefined
        };
      })
    )
  }

  checkIfLoginExists(login: string): Observable<Object> {
    return this.http.post(AppSettings.API_ENDPOINT + '/users/check-login-available', login)
  }

  getUserByLoginAndPassword(login: string, password: string): User | null {
    // let users = this.usersSubject.getValue();
    // for (let id = 0; id < this.usersSubject.getValue().length; id++) {
    //   if (
    //     users[id].login === login &&
    //     users[id].password === password
    //   ) {
    //     return users[id]
    //   }
    // }
    return null;
  }

  createUser(userDto: UserDto): Observable<User> {
    return this.http.post<User>(AppSettings.API_ENDPOINT + '/users', userDto);
  }

  deleteUser(id: number) {
    return this.http.delete(`${AppSettings.API_ENDPOINT}/users/${id}`);
  }

  editUser(userDto: UserDto) {
    return this.http.put<User>(AppSettings.API_ENDPOINT + '/users', userDto);
  }

}
