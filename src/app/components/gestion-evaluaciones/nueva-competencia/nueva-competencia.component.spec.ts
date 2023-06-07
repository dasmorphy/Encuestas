import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaCompetenciaComponent } from './nueva-competencia.component';

describe('NuevaCompetenciaComponent', () => {
  let component: NuevaCompetenciaComponent;
  let fixture: ComponentFixture<NuevaCompetenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaCompetenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevaCompetenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
