import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnosUnidadesCentroComponent } from './alumnos-unidades-centro.component';

describe('AlumnosUnidadesCentroComponent', () => {
  let component: AlumnosUnidadesCentroComponent;
  let fixture: ComponentFixture<AlumnosUnidadesCentroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnosUnidadesCentroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnosUnidadesCentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
