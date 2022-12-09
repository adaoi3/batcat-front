import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
  ɵElement
} from "@angular/forms";
import { UsersService } from "../../services/users.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'batcat-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {

  id: number;
  createUserForm: FormGroup;

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute
  ) {
    this.id = +this.activateRoute.snapshot.url[2].path;

    this.createUserForm = this.formBuilder.group({
      id: this.id,
      name: new FormControl(this.usersService.getUserById(this.id).name, [
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
    //   if (this.createUserForm.valid) {
    //     this.usersService.editUser({
    //       id: this.createUserForm.value.id || 0,
    //       name: this.createUserForm.value.name || '',
    //       password: this.createUserForm.value.password || '',
    //       email: this.createUserForm.value.email || '',
    //     })
    //     this.createUserForm.reset();
    //     formDirective.resetForm();
    //   }
  }


}
