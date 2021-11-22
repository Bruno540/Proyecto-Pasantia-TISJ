import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTurnoComponent } from './create-turno.component';

describe('CreateTurnoComponent', () => {
  let component: CreateTurnoComponent;
  let fixture: ComponentFixture<CreateTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTurnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
