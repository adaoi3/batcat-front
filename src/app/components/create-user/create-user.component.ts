import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroupDirective,
  Validators
} from '@angular/forms';
import { UserService } from "../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DateTime } from 'luxon';
import { UniqueLoginValidator } from "../../validators/unique-login.validator";

@Component({
  selector: 'batcat-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})

export class CreateUserComponent {

  roles: string[] = ['Admin', 'Manager', 'User'];

  createUserForm = this.formBuilder.group({
    id: 0,
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(25)
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(25)
    ]),
    login: new FormControl('', {
      asyncValidators: [this.uniqueLoginValidator.validate.bind(this.uniqueLoginValidator)],
      updateOn: 'blur',
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(25)
      ]}),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(30)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(6),
      Validators.maxLength(30)
    ]),
    roles: new FormControl([], [
      Validators.required
    ]),
    date: new FormControl(DateTime.now(), [
      Validators.required
    ]),
  }, {
    validators: []
  });

  constructor(
    private usersService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private uniqueLoginValidator: UniqueLoginValidator
  ) {
  }

  getErrorMessage(formControl: FormControl) {
    if (formControl.hasError('required')) {
      return 'You must enter a value';
    }
    if (formControl.hasError('minlength')) {
      return 'Not enough characters entered';
    }
    if (formControl.hasError('maxlength')) {
      return 'Too many characters';
    }
    if (formControl.hasError('uniqueLogin')) {
      return 'Not unique login';
    }
    return formControl.hasError('email') ? 'Not a valid email' : 'Unknown error';
  }

  onSubmit(formDirective: FormGroupDirective): void {
    if (this.createUserForm.valid) {
      this.usersService.createUser({
        firstName: this.createUserForm.value.firstName || '',
        lastName: this.createUserForm.value.lastName || '',
        login: this.createUserForm.value.login || '',
        password: this.createUserForm.value.password || '',
        email: this.createUserForm.value.email || '',
        roles: this.createUserForm.value.roles || [],   // Транспиляция (из ts -> js)
        date: this.createUserForm.value.date?.toISODate(),
      }).subscribe(() => {
        this.createUserForm.reset();
        formDirective.resetForm();
        this.router.navigate(['../'], {relativeTo: this.activatedRoute}).then(r => '');
      });
    }
  }

}
