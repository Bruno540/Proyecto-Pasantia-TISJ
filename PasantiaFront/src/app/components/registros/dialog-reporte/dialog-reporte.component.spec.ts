import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogReporteComponent } from './dialog-reporte.component';

describe('DialogReporteComponent', () => {
  let component: DialogReporteComponent;
  let fixture: ComponentFixture<DialogReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogReporteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
