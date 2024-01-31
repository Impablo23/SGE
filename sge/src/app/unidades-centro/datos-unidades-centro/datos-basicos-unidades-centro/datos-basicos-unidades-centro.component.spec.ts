import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosBasicosUnidadesCentroComponent } from './datos-basicos-unidades-centro.component';

describe('DatosBasicosEntidadComponent', () => {
  let component: DatosBasicosUnidadesCentroComponent;
  let fixture: ComponentFixture<DatosBasicosUnidadesCentroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosBasicosUnidadesCentroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosBasicosUnidadesCentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
