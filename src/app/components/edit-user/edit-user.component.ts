import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from "@angular/forms";
import { UserService } from "../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'batcat-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  id: number;
  createUserForm: FormGroup = new FormGroup({});
  roles: string[] = ['Admin', 'Manager', 'User'];
  isUserLoaded = false;

  constructor(
    private usersService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.id = +this.activateRoute.snapshot.url[2].path;
  }

  ngOnInit(): void {
    this.usersService.getUserById(this.id).subscribe(user => {
      this.createUserForm = this.formBuilder.group({
        firstName: new FormControl(user.firstName, [
          Validators.required,
          Validators.minLength(5)
        ]),
        lastName: new FormControl(user.lastName, [
          Validators.required,
          Validators.minLength(5)
        ]),
        login: new FormControl(user.login, [
          Validators.required,
          Validators.minLength(5)
        ]),
        email: new FormControl(user.email, [
          Validators.required,
          Validators.email,
          Validators.minLength(5)
        ]),
        roles: new FormControl(
          user.roles?.map(role => role[0].toUpperCase() + role.slice(1).toLowerCase()),
          [
          Validators.required
        ]),
        date: new FormControl(user.date, [
          Validators.required
        ]),
      }, {
        validators: []
      });
      this.isUserLoaded = true;
    });
  }

  getErrorMessage(formControl: AbstractControl) {
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
        id: this.id,
        firstName: this.createUserForm.value.firstName || '',
        lastName: this.createUserForm.value.lastName || '',
        login: this.createUserForm.value.login || '',
        email: this.createUserForm.value.email || '',
        roles: this.createUserForm.value.roles || [],
        date: this.createUserForm.value.date.toISODate(),
      }).subscribe(() => {
        this.createUserForm.reset();
        formDirective.resetForm();
        this.router.navigate(['../../'], {relativeTo: this.activateRoute}).then(r => '');
      });
    }
  }

}
