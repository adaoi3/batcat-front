import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { AuthService } from "../../services/auth.service";
import { Pet } from "../../interfaces/pet";
import { PetService } from "../../services/pet.service";

@Component({
  selector: 'batcat-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent implements OnInit {

  pets: Pet[] = [];

  displayedColumns: string[] = ['userId', 'petId', 'species', 'breed', 'name', 'growth',
    'weight', 'date'];

  constructor(
    public dialog: MatDialog,
    private petService: PetService,
    public authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.petService.getPets().subscribe({
      next: pets => this.pets = pets,
      error: error => console.error(error),
      complete: () => console.log("completed")
    })
  }

  createRandomPet(): void {
    this.petService.createPet({
      userId: 4,
      species: btoa(Math.random().toString()).substring(6, 15),
      breed: btoa(Math.random().toString()).substring(6, 15),
      name: btoa(Math.random().toString()).substring(6, 15),
      growth: btoa(Math.random().toString()).substring(6, 15),
      weight:btoa(Math.random().toString()).substring(6, 15),
      date: '1995-02-08',
    }).subscribe();
  }

}
