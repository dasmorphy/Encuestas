import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

import { EvaluacionRoutingModule } from './evaluacion-routing.module';
import { EvaluacionColaboradorComponent } from './evaluacion-colaborador/evaluacion-colaborador.component';
import { EvaluacionComponent } from './utils/evaluacion.component';
import { VistaEvaluacionComponent } from './vista-evaluacion/vista-evaluacion.component';
import { SearchPipeEvaluacionComponent } from '../search-pipe-evaluacion/search-pipe-evaluacion.component';

@NgModule({
  declarations: [
    EvaluacionColaboradorComponent,
    EvaluacionComponent,
    VistaEvaluacionComponent,
    SearchPipeEvaluacionComponent
  
  ],
  imports: [
    CommonModule,
    EvaluacionRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule 
  ]
})
export class EvaluacionModule { }
