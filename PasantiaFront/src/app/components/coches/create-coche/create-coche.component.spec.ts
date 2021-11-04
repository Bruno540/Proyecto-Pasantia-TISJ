import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCocheComponent } from './create-coche.component';

describe('CreateCocheComponent', () => {
  let component: CreateCocheComponent;
  let fixture: ComponentFixture<CreateCocheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCocheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCocheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
