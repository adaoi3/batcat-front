import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, Validators } from "@angular/forms";
import { UsersService } from "../../services/users.service";
import { ActivatedRoute, Router } from "@angular/router";

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
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private router: Router,
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
    if (this.createUserForm.valid) {
      console.log(


        this.usersService.getUserByLoginAndPassword(
          this.createUserForm.value.login || '',
          this.createUserForm.value.password || ''
        )


      )
      this.createUserForm.reset();
      formDirective.resetForm();
      this.router.navigate([''], {relativeTo: this.activatedRoute}).then(r => '');
    }
  }

}