import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosUnidadesCentroComponent } from './datos-unidades-centro.component';

describe('DatosEntidadComponent', () => {
  let component: DatosUnidadesCentroComponent;
  let fixture: ComponentFixture<DatosUnidadesCentroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosUnidadesCentroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosUnidadesCentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
