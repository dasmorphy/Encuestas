import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEvaluacionComponent } from './editar-evaluacion.component';

describe('EditarEvaluacionComponent', () => {
  let component: EditarEvaluacionComponent;
  let fixture: ComponentFixture<EditarEvaluacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarEvaluacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
