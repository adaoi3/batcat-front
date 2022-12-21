import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { catchError, map, Observable, of } from "rxjs";
import { Injectable } from "@angular/core";
import { UserService } from "../services/user.service";

@Injectable({ providedIn: 'root' })
export class UniqueLoginValidator implements AsyncValidator {
  constructor(private userService: UserService) {}

  validate(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return this.userService.checkIfLoginExists(control.value).pipe(
      map(() => null),
      catchError(() => of({ uniqueLogin: true }))
    );
  }
}
