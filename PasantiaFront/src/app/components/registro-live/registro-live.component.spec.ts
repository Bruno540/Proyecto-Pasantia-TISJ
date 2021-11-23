import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroLiveComponent } from './registro-live.component';

describe('RegistroLiveComponent', () => {
  let component: RegistroLiveComponent;
  let fixture: ComponentFixture<RegistroLiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroLiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
