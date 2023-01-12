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
import { UniqueLoginValidator } from "../../validators/unique-login.validator";

@Component({
  selector: 'batcat-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  id: number;
  editUserForm: FormGroup = new FormGroup({});
  roles: string[] = ['Admin', 'Manager', 'User'];
  isUserLoaded = false;

  constructor(
    private usersService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private uniqueLoginValidator: UniqueLoginValidator
  ) {
    this.id = +this.activateRoute.snapshot.url[2].path;
  }

  ngOnInit(): void {
    this.usersService.getUserById(this.id).subscribe(user => {
      this.editUserForm = this.formBuilder.group({
        firstName: new FormControl(user.firstName, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25)
        ]),
        lastName: new FormControl(user.lastName, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25)
        ]),
        login: new FormControl(user.login, [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(25)
        ]),
        email: new FormControl(user.email, [
          Validators.required,
          Validators.email,
          Validators.minLength(5),
          Validators.maxLength(30)
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
    if (formControl.hasError('maxlength')) {
      return 'Too many characters';
    }
    if (formControl.hasError('minlength')) {
      return 'Not enough characters entered';
    }
    // if (formControl.hasError('uniqueLogin')) {
    //   return 'Not unique login'; todo do something with unique login in edit-user page...
    // }
    return formControl.hasError('email') ? 'Not a valid email' : 'Unknown error';
  }

  onSubmit(formDirective: FormGroupDirective): void {
    if (this.editUserForm.valid) {
      this.usersService.editUser({
        id: this.id,
        firstName: this.editUserForm.value.firstName || '',
        lastName: this.editUserForm.value.lastName || '',
        login: this.editUserForm.value.login || '',
        email: this.editUserForm.value.email || '',
        roles: this.editUserForm.value.roles || [],
        date: this.editUserForm.value.date?.toISODate(),
      }).subscribe(() => {
        this.editUserForm.reset();
        formDirective.resetForm();
        this.router.navigate(['../../'], {relativeTo: this.activateRoute}).then(r => '');
      });
    }
  }

}
