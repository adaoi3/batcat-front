import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TokenDto } from "../interfaces/token-dto";
import { Observable } from "rxjs";
import { Role } from "../interfaces/role";
import { Data } from "@angular/router";
import { RolesForPermission } from "../interfaces/roles-for-permission";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  getToken(login: string, password: string): Observable<TokenDto> {
    let body = {login, password};
    return this.http.post<TokenDto>('http://localhost:8080/token', body, {
      headers: new HttpHeaders({
        // 'Authorization': 'Basic ' + btoa(login + ':' + password)
        // 'Authorization': 'Basic ' + btoa(`${login}:${password}`) // интеполяция строк `` string interpolation (tick) string literal
        'Authorization': `Basic ${AuthService.toBase64(login, password)}`
      })
    });
  }

  private static toBase64(login: string, password: string): string {
    return btoa(`${login}:${password}`);
  }

  parseJwt(token: string) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    let parsedToken = '';
    let token = localStorage.getItem('token');
    if (token) {
      parsedToken = this.parseJwt(token).scope;
    }
    let roles = parsedToken.split(' ')
    let isAllowed = false;
    for (const element of roles) {
      if (element === Role.admin) {
        isAllowed = true;
      }
    }
    return isAllowed;
  }

  isManager(): boolean {
    let parsedToken = '';
    let token = localStorage.getItem('token');
    if (token) {
      parsedToken = this.parseJwt(token).scope;
    }
    let roles = parsedToken.split(' ')
    let isAllowed = false;
    for (const element of roles) {
      if (element === Role.manager) {
        isAllowed = true;
      }
    }
    return isAllowed;
  }

  CheckEnoughPermissions(rolesForPermission: RolesForPermission): boolean {
    let parsedToken = '';
    let token = localStorage.getItem('token');
    if (token) {
      parsedToken = this.parseJwt(token).scope;
    }
    let roles = parsedToken.split(' ')
    let isAllowed = false;
    for (const role of roles) {
      for (const allowedRoles of rolesForPermission.allowedRoles) {
        if (allowedRoles === role) {
          isAllowed = true;
          break;
        }
      }
    }
    return isAllowed;
  }

}
