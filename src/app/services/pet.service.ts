import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { AppSettings } from "../global-constants/app.settings";
import { DateTime } from "luxon";
import { Pet } from "../interfaces/pet";
import { PetDto } from "../interfaces/pet-dto";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(
    private http: HttpClient,
    public authService: AuthService
    ) {
  }

  getPets(): Observable<Pet[]> {
    return this.http.get<PetDto[]>(AppSettings.API_ENDPOINT + '/pets').pipe(
      map(response => response.map(petDto => {
        return {
          userId: petDto.userId,
          petId: petDto.petId,
          species: petDto.species,
          breed: petDto.breed,
          name: petDto.name,
          growth: petDto.growth,
          weight: petDto.weight,
          date: petDto.date ? DateTime.fromISO(petDto.date) : undefined
        };
      }))
    )
  }

  getPetById(id: number): Observable<Pet> {
    return this.http.get<PetDto>(`${AppSettings.API_ENDPOINT}/pets/${id}`).pipe(
      map(petDto => {
        return {
          petId: petDto.petId,
          userId: petDto.userId,
          species: petDto.species,
          breed: petDto.breed,
          name: petDto.name,
          growth: petDto.growth,
          weight: petDto.weight,
          date: petDto.date ? DateTime.fromISO(petDto.date) : undefined
        };
      })
    )
  }

  createPet(petDto: PetDto): Observable<Pet> {
    return this.http.post<Pet>(AppSettings.API_ENDPOINT + '/pets', petDto);
  }

  deletePet(petId: number) {
    return this.http.delete(`${AppSettings.API_ENDPOINT}/pets/${petId}`);
  }

  editPet(petDto: PetDto) {
    return this.http.put<Pet>(AppSettings.API_ENDPOINT + '/pets', petDto);
  }

  checkIfUserIdExists(userId: string): Observable<Object> {
    return this.http.post(AppSettings.API_ENDPOINT + '/pets/check-id-available', userId)
  }

  getMyPets(): Observable<Pet[]> {
    let id = this.authService.getCurrentUserId();
    return this.http.get<PetDto[]>(`${AppSettings.API_ENDPOINT}/pets/user/${id}`).pipe(
      map(response => response.map(petDto => {
        return {
          userId: petDto.userId,
          petId: petDto.petId,
          species: petDto.species,
          breed: petDto.breed,
          name: petDto.name,
          growth: petDto.growth,
          weight: petDto.weight,
          date: petDto.date ? DateTime.fromISO(petDto.date) : undefined
        };
      }))
    )
  }

}
