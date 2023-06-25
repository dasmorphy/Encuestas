import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluacionColaboradorComponent } from './evaluacion-colaborador/evaluacion-colaborador.component';
import { EvaluacionComponent } from './utils/evaluacion.component';
import { VistaEvaluacionComponent } from './vista-evaluacion/vista-evaluacion.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluacionRoutingModule { }
