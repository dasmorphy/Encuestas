import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { GestionEvaluacionesRoutingModule } from './gestion-evaluaciones-routing.module';
import { GestionEvaluacionesComponent } from './gestion-evaluaciones.component';
import { NuevaEvaluacionComponent } from './nueva-evaluacion/nueva-evaluacion.component';
import { EditarEvaluacionComponent } from './editar-evaluacion/editar-evaluacion.component';
import { NuevaCompetenciaComponent } from './nueva-competencia/nueva-competencia.component';


@NgModule({
  declarations: [
    GestionEvaluacionesComponent,
    NuevaEvaluacionComponent,
    EditarEvaluacionComponent,
    NuevaCompetenciaComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    GestionEvaluacionesRoutingModule
  ]
})
export class GestionEvaluacionesModule { }
