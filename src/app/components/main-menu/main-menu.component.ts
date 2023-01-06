import { Component } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'batcat-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent {

  constructor(public authService: AuthService, private router: Router) {
  }

  homeTabSelected(): boolean {
    return this.router.url.includes('/home');
  }

  usersTabSelected(): boolean {
    return this.router.url.includes('/users');
  }

}
