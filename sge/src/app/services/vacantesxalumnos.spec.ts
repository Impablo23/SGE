import { TestBed } from '@angular/core/testing';

import { VacantesXAlumnosService } from './vacantesxalumnos.service';

describe('VacantesXAlumnosService', () => {
  let service: VacantesXAlumnosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacantesXAlumnosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
