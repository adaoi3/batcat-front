import { Component } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'batcat-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent {

  constructor(public authService: AuthService) {
  }

}
