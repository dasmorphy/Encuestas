import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';

import { EvaluacionRoutingModule } from './evaluacion-routing.module';
import { EvaluacionColaboradorComponent } from './evaluacion-colaborador/evaluacion-colaborador.component';
import { EvaluacionComponent } from './utils/evaluacion.component';

@NgModule({
  declarations: [
    EvaluacionColaboradorComponent,
    EvaluacionComponent
  
  ],
  imports: [
    CommonModule,
    EvaluacionRoutingModule,
    ReactiveFormsModule,
    FormsModule 
  ]
})
export class EvaluacionModule { }
