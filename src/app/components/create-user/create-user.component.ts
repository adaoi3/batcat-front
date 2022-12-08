import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { UsersService } from "../../services/users.service";

@Component({
  selector: 'batcat-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})

export class CreateUserComponent implements OnDestroy {

  users = this.usersService.getUsers();

  createUserForm = this.formBuilder.group({
    id: 0,
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(5)
    ]),
  }, {
    validators: []
  });

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
  ) {
  }

  getErrorMessage(formControl: FormControl) {
    if (formControl.hasError('required')) {
      return 'You must enter a value';
    }
    if (formControl.hasError('minlength')) {
      return 'Minimum 5 symbols';
    }
    return formControl.hasError('email') ? 'Not a valid email' : '';
  }

  ngOnDestroy(): void {
    console.warn('sss');
  }

  onSubmit(formDirective: FormGroupDirective): void {
    if (this.createUserForm.valid) {
      this.usersService.createUser({
        id: this.createUserForm.value.id || 0,
        name: this.createUserForm.value.name || '',
        password: this.createUserForm.value.password || '',
        email: this.createUserForm.value.email || '',
      })
      this.createUserForm.reset();
      formDirective.resetForm();
    }
  }

}
