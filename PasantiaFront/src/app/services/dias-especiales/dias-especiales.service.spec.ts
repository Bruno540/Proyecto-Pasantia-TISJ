import { TestBed } from '@angular/core/testing';

import { DiasEspecialesService } from './dias-especiales.service';

describe('DiasEspecialesService', () => {
  let service: DiasEspecialesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiasEspecialesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
