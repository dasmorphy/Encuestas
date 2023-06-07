import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionEvaluacionesComponent } from './gestion-evaluaciones.component';
import { NuevaEvaluacionComponent } from './nueva-evaluacion/nueva-evaluacion.component';
import { EditarEvaluacionComponent } from './editar-evaluacion/editar-evaluacion.component';
import { NuevaCompetenciaComponent } from './nueva-competencia/nueva-competencia.component';

const routes: Routes = [
  {
    path: 'lista-evaluaciones', 
    component: GestionEvaluacionesComponent
  },
  {
    path: 'nueva-evaluacion', 
    component: NuevaEvaluacionComponent
  },
  {
    path: 'editar-evaluacion', 
    component: EditarEvaluacionComponent
  },
  {
    path: 'nueva-competencia', 
    component: NuevaCompetenciaComponent
  }
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionEvaluacionesRoutingModule { }
