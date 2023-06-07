import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEvaluacionesComponent } from './gestion-evaluaciones.component';

describe('GestionEvaluacionesComponent', () => {
  let component: GestionEvaluacionesComponent;
  let fixture: ComponentFixture<GestionEvaluacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionEvaluacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionEvaluacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
