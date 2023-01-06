import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'batcat-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public authService: AuthService, private router: Router) {
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  logInTabSelected(): boolean {
    return this.router.url.includes('/log-in');
  }

}
