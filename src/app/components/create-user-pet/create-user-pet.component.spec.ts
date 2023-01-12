import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserPetComponent } from './create-user-pet.component';

describe('CreateUserPetComponent', () => {
  let component: CreateUserPetComponent;
  let fixture: ComponentFixture<CreateUserPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUserPetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUserPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
