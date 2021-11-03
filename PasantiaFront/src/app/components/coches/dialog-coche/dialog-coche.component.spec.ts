import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCocheComponent } from './dialog-coche.component';

describe('DialogCocheComponent', () => {
  let component: DialogCocheComponent;
  let fixture: ComponentFixture<DialogCocheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCocheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCocheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
