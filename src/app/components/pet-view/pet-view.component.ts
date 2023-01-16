import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Pet } from "../../interfaces/pet";

@Component({
  selector: 'app-pet-view',
  templateUrl: './pet-view.component.html',
  styleUrls: ['./pet-view.component.scss']
})
export class PetViewComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Pet
  ) {
  }

}
