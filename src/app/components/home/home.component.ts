import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'batcat-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private userName = '';

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    if (token) {
      this.userName = this.authService.parseJwt(token).sub;
    }
  }

  getWelcomeMessage(): string {
    return this.userName
      ? `Welcome to batcat, ${this.userName}!`
      : 'Welcome to batcat!';
  }

}
