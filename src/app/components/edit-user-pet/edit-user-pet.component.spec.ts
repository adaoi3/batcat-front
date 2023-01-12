import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserPetComponent } from './edit-user-pet.component';

describe('EditUserPetsComponent', () => {
  let component: EditUserPetComponent;
  let fixture: ComponentFixture<EditUserPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserPetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUserPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
