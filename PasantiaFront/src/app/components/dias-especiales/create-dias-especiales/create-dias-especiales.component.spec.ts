import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDiasEspecialesComponent } from './create-dias-especiales.component';

describe('CreateDiasEspecialesComponent', () => {
  let component: CreateDiasEspecialesComponent;
  let fixture: ComponentFixture<CreateDiasEspecialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDiasEspecialesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDiasEspecialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
