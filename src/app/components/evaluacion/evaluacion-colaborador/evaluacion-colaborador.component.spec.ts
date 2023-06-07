import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionColaboradorComponent } from './evaluacion-colaborador.component';

describe('EvaluacionColaboradorComponent', () => {
  let component: EvaluacionColaboradorComponent;
  let fixture: ComponentFixture<EvaluacionColaboradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluacionColaboradorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluacionColaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
