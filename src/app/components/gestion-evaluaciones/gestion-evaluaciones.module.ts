import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

import { GestionEvaluacionesRoutingModule } from './gestion-evaluaciones-routing.module';
import { GestionEvaluacionesComponent } from './gestion-evaluaciones.component';
import { NuevaEvaluacionComponent } from './nueva-evaluacion/nueva-evaluacion.component';
import { EditarEvaluacionComponent } from './editar-evaluacion/editar-evaluacion.component';
import { NuevaCompetenciaComponent } from './nueva-competencia/nueva-competencia.component';
import { SearchPipeListaEvaluacionesComponent } from '../search-pipe-lista-evaluaciones/search-pipe-lista-evaluaciones.component';


@NgModule({
  declarations: [
    GestionEvaluacionesComponent,
    NuevaEvaluacionComponent,
    EditarEvaluacionComponent,
    NuevaCompetenciaComponent,
    SearchPipeListaEvaluacionesComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    GestionEvaluacionesRoutingModule,
    NgxPaginationModule
  ]
})
export class GestionEvaluacionesModule { }
