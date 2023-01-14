import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, Validators } from "@angular/forms";
import { DateTime } from "luxon";
import { PetService } from "../../services/pet.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'batcat-create-user-pet',
  templateUrl: './create-pet.component.html',
  styleUrls: ['./create-pet.component.scss']
})
export class CreatePetComponent {

  createPetForm = this.formBuilder.group({
    petId: 0,
    userId: parseInt(this.authService.getCurrentUserId()),
    species: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30)
    ]),
    breed: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30)
    ]),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(25)
    ]),
    growth: new FormControl('', [
      Validators.required,
      Validators.maxLength(10)
    ]),
    weight: new FormControl('', [
      Validators.required,
      Validators.maxLength(10)
    ]),
    date: new FormControl(DateTime.now(), [
      Validators.required
    ]),
  }, {
    validators: []
  });

  constructor(
    private petService: PetService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
  }

  getErrorMessage(formControl: FormControl) {
    if (formControl.hasError('maxlength')) {
      return 'Too many characters';
    }
    if (formControl.hasError('minlength')) {
      return 'Not enough characters entered';
    }
    if (formControl.hasError('idNotExists')) {
      return 'This id does not exist';
    }
    return formControl.hasError('required') ? 'You must enter a value' : 'Unknown error';
  }

  onSubmit(formDirective: FormGroupDirective): void {
    if (this.createPetForm.valid) {
      this.petService.createPet({
        userId: this.createPetForm.value.userId || 0,
        species: this.createPetForm.value.species || '',
        breed: this.createPetForm.value.breed || '',
        name: this.createPetForm.value.name || '',
        growth: this.createPetForm.value.growth || '',
        weight: this.createPetForm.value.weight || '',   // Транспиляция (из ts -> js)
        date: this.createPetForm.value.date?.toISODate(),
      }).subscribe(() => {
        this.createPetForm.reset();
        formDirective.resetForm();
        this.router.navigate(['../'], { relativeTo: this.activatedRoute }).then(r => '');
      });
    }
  }

}
