import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TokenDto } from "../interfaces/token-dto";
import { Observable } from "rxjs";
import { Role } from "../interfaces/role";
import { RolesForPermission } from "../interfaces/roles-for-permission";
import { TokenJsonPayload } from "../interfaces/token.json.payload";

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

  parseJwt(token: string): TokenJsonPayload {
    let base64Url = token.split('.')[1] || '';
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return jsonPayload? JSON.parse(jsonPayload) : {};
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    let token = localStorage.getItem('token') || '';
    let parsedToken = this.parseJwt(token);
    let roles: string[] = parsedToken.roles || [];
    return !!roles.find(role => role === Role.admin)
  }

  isManager(): boolean {
    let token = localStorage.getItem('token') || '';
    let parsedToken = this.parseJwt(token);
    let roles: string[] = parsedToken.roles || [];
    return !!roles.find(role => role === Role.manager)
  }

  isUser(): boolean {
    let token = localStorage.getItem('token') || '';
    let parsedToken = this.parseJwt(token);
    let roles: string[] = parsedToken.roles || [];
    return !!roles.find(role => role === Role.user)
  }

  checkEnoughPermissions(rolesForPermission: RolesForPermission): boolean {
    let token = localStorage.getItem('token') || '';
    let parsedToken = this.parseJwt(token);
    let roles: string[] = parsedToken.roles || [];
    for (const userRole of roles) {
      for (const allowedRole of rolesForPermission.allowedRoles) {
        if (userRole === allowedRole) {
          return true;
        }
      }
    }
    return false;
  }

}
