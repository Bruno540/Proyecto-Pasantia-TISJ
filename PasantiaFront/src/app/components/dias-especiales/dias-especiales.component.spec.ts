import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiasEspecialesComponent } from './dias-especiales.component';

describe('DiasEspecialesComponent', () => {
  let component: DiasEspecialesComponent;
  let fixture: ComponentFixture<DiasEspecialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiasEspecialesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiasEspecialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
