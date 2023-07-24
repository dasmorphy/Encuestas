import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';

import { EvaluacionRoutingModule } from './evaluacion-routing.module';
import { EvaluacionColaboradorComponent } from './evaluacion-colaborador/evaluacion-colaborador.component';
import { EvaluacionComponent } from './utils/evaluacion.component';
import { VistaEvaluacionComponent } from './vista-evaluacion/vista-evaluacion.component';

@NgModule({
  declarations: [
    EvaluacionColaboradorComponent,
    EvaluacionComponent,
    VistaEvaluacionComponent
  
  ],
  imports: [
    CommonModule,
    EvaluacionRoutingModule,
    ReactiveFormsModule,
    FormsModule 
  ]
})
export class EvaluacionModule { }
