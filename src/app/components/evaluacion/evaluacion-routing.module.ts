import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluacionColaboradorComponent } from './evaluacion-colaborador/evaluacion-colaborador.component';
import { EvaluacionComponent } from './utils/evaluacion.component';

const routes: Routes = [
  {
    path: 'evaluacion-colaborador/:id_colaborador', 
    component: EvaluacionColaboradorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluacionRoutingModule { }
