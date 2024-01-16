import { TestBed } from '@angular/core/testing';
import { UnidadesCentroService } from './unidades-centro.service';

describe('UnidadesDualService', () => {
  let service: UnidadesCentroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnidadesCentroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
