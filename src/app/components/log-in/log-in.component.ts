import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {

  createUserForm = this.formBuilder.group({
    login: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
  }, {
    validators: []
  });

  constructor(
    private usersService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  getErrorMessage(formControl: FormControl) {
    if (formControl.hasError('required')) {
      return 'You must enter a value';
    }
    if (formControl.hasError('minlength')) {
      return 'Minimum 5 symbols';
    }
    return '';
  }

  onSubmit(formDirective: FormGroupDirective): void {
    localStorage.removeItem('token');
    if (this.createUserForm.valid) {
        this.authService.getToken(
          this.createUserForm.value.login || '',
          this.createUserForm.value.password || ''
        ).subscribe({
          next: token => {
            localStorage.setItem('token', token.token);
            this.createUserForm.reset();
            formDirective.resetForm();
            this.router.navigate(['/home'], {relativeTo: this.activatedRoute}).then(r => '');
          },
          error: error => console.error(error)
        })
    }
  }

}
