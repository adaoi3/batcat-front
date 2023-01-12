import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, Validators } from "@angular/forms";
import { DateTime } from "luxon";
import { ActivatedRoute, Router } from "@angular/router";
import { PetService } from "../../services/pet.service";
import { UniqueLoginValidator } from "../../validators/unique-login.validator";
import { IsIdExistsValidator } from "../../validators/is-id-exists.validator";

@Component({
  selector: 'batcat-create-pet',
  templateUrl: './create-pet.component.html',
  styleUrls: ['./create-pet.component.scss']
})
export class CreatePetComponent {

  createPetForm = this.formBuilder.group({
    petId: 0,
    userId: new FormControl(null, {
      asyncValidators: [this.isIdExistsValidator.validate.bind(this.isIdExistsValidator)],
  updateOn: 'blur',
  validators: [
      Validators.required
    ]}),
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
    private isIdExistsValidator: IsIdExistsValidator
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
