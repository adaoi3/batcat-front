import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'batcat-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public name = '';

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    if (token) {
      this.name = this.authService.parseJwt(token).sub;
    }
  }

  getWelcomeMessage(): string {
    return this.name
      ? `Welcome to batcat, ${this.name}!`
      : 'Welcome to batcat!';
  }

}
