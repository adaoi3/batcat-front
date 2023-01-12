import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { catchError, map, Observable, of } from "rxjs";
import { Injectable } from "@angular/core";
import { PetService } from "../services/pet.service";

@Injectable({ providedIn: 'root' })
export class IsIdExistsValidator implements AsyncValidator {
  constructor(private petService: PetService) {}

  validate(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return this.petService.checkIfUserIdExists(control.value).pipe(
      map(() => null),
      catchError(() => of({ idNotExists: true }))
    );
  }
}
