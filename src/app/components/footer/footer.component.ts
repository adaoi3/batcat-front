import { Component } from '@angular/core';
import { UserService } from "../../services/user.service";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'batcat-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  toHome(): void {
  this.router.navigate(['/home'], {relativeTo: this.activatedRoute}).then(r => '');
  }

}
