import { Component, OnInit } from '@angular/core';
import { Pet } from "../../interfaces/pet";
import { MatDialog } from "@angular/material/dialog";
import { PetService } from "../../services/pet.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-user-pets',
  templateUrl: './user-pets.component.html',
  styleUrls: ['./user-pets.component.scss']
})
export class UserPetsComponent implements OnInit {

  userId: string = this.authService.getCurrentUserId();
  pets: Pet[] = [];

  displayedColumns: string[] = ['petId', 'species', 'breed', 'name', 'growth',
    'weight', 'date', 'actions'];

  constructor(
    public dialog: MatDialog,
    private petService: PetService,
    public authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.petService.getMyPets().subscribe({
      next: pets => this.pets = pets,
      error: error => console.error(error)
    })
  }

  deletePet(petId: number): void {
    this.petService.deletePet(petId).subscribe(
      () => this.pets = this.pets.filter(pet => pet.petId !== petId)
    );
  }

  createRandomPet(): void {
    this.petService.createPet({
      userId: Number(this.authService.getCurrentUserId()),
      species: btoa(Math.random().toString()).substring(6, 15),
      breed: btoa(Math.random().toString()).substring(6, 15),
      name: btoa(Math.random().toString()).substring(6, 15),
      growth: btoa(Math.random().toString()).substring(6, 15),
      weight: btoa(Math.random().toString()).substring(6, 15),
      date: '1995-02-08',
    }).subscribe();
  }

}
