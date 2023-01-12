import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators
} from "@angular/forms";
import { PetService } from "../../services/pet.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-edit-user-pets',
  templateUrl: './edit-user-pet.component.html',
  styleUrls: ['./edit-user-pet.component.scss']
})
export class EditUserPetComponent implements OnInit {

  petId: number;
  editPetForm: FormGroup = new FormGroup({});
  isPetLoaded = false;

  constructor(
    private petService: PetService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.petId = +this.activateRoute.snapshot.url[2].path;
  }

  ngOnInit(): void {
    this.petService.getPetById(this.petId).subscribe(pet => {
      this.editPetForm = this.formBuilder.group({
        userId: pet.userId,
        species: new FormControl(pet.species, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30)
        ]),
        breed: new FormControl(pet.breed, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30)
        ]),
        name: new FormControl(pet.name, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25)
        ]),
        growth: new FormControl(pet.growth, [
          Validators.required,
          Validators.maxLength(10)
        ]),
        weight: new FormControl(pet.weight, [
          Validators.required,
          Validators.maxLength(10)
        ]),
        date: new FormControl(pet.date, [
          Validators.required
        ]),
      }, {
        validators: []
      });
      this.isPetLoaded = true;
    });
  }

  getErrorMessage(formControl: AbstractControl) {
    if (formControl.hasError('maxlength')) {
      return 'Too many characters';
    }
    if (formControl.hasError('minlength')) {
      return 'Not enough characters entered';
    }
    return formControl.hasError('required') ? 'You must enter a value' : 'Unknown error';
  }

  onSubmit(formDirective: FormGroupDirective): void {
    if (this.editPetForm.valid) {
      this.petService.editPet({
        petId: this.petId,
        userId: this.editPetForm.value.userId || '',
        species: this.editPetForm.value.species || '',
        breed: this.editPetForm.value.breed || '',
        name: this.editPetForm.value.name || '',
        growth: this.editPetForm.value.growth || '',
        weight: this.editPetForm.value.weight || '',
        date: this.editPetForm.value.date?.toISODate(),
      }).subscribe(() => {
        this.editPetForm.reset();
        formDirective.resetForm();
        this.router.navigate(['../../'], {relativeTo: this.activateRoute}).then(r => '');
      });
    }
  }

}
