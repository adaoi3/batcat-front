import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from "@angular/forms";
import { UsersService } from "../../services/users.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'batcat-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {

  id: number;
  createUserForm: FormGroup;
  roles: string[] = ['Admin', 'Manager', 'User'];

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.id = +this.activateRoute.snapshot.url[2].path;

    this.createUserForm = this.formBuilder.group({
      id: this.id,
      firstName: new FormControl(this.usersService.getUserById(this.id).firstName, [
        Validators.required,
        Validators.minLength(5)
      ]),
      lastName: new FormControl(this.usersService.getUserById(this.id).lastName, [
        Validators.required,
        Validators.minLength(5)
      ]),
      login: new FormControl(this.usersService.getUserById(this.id).login, [
        Validators.required,
        Validators.minLength(5)
      ]),
      password: new FormControl(this.usersService.getUserById(this.id).password, [
        Validators.required,
        Validators.minLength(5)
      ]),
      email: new FormControl(this.usersService.getUserById(this.id).email, [
        Validators.required,
        Validators.email,
        Validators.minLength(5)
      ]),
      roles: new FormControl(this.usersService.getUserById(this.id).roles,[
        Validators.required
      ]),
      date: new FormControl(this.usersService.getUserById(this.id).date, [
        Validators.required
      ]),
    }, {
      validators: []
    });
  }

  getErrorMessage(formControl: AbstractControl<any>) {
    if (formControl.hasError('required')) {
      return 'You must enter a value';
    }
    if (formControl.hasError('minlength')) {
      return 'Minimum 5 symbols';
    }
    return formControl.hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit(formDirective: FormGroupDirective): void {
    if (this.createUserForm.valid) {
      this.usersService.editUser({
        id: this.createUserForm.value.id || 0,
        firstName: this.createUserForm.value.firstName || '',
        lastName: this.createUserForm.value.lastName || '',
        login: this.createUserForm.value.login || '',
        password: this.createUserForm.value.password || '',
        email: this.createUserForm.value.email || '',
        roles: this.createUserForm.value.roles || [],   // Транспиляция (из тс -> джс)
        date: this.createUserForm.value.date || new Date(),
      });

      this.createUserForm.reset();
      formDirective.resetForm();
      this.router.navigate(['../../'], {relativeTo: this.activateRoute});
    }
  }

}
