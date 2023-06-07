import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { EvaluacionComponent } from './components/evaluacion/utils/evaluacion.component';
import { ColaboradoresComponent } from './components/colaboradores/colaboradores.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EvaluacionColaboradorComponent } from './components/evaluacion/evaluacion-colaborador/evaluacion-colaborador.component';



const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'inicio', component: InicioComponent},
  
  {path: 'colaboradores', component: ColaboradoresComponent},
  {
    path: 'gestion-evaluaciones',
    loadChildren: () => import('./components/gestion-evaluaciones/gestion-evaluaciones.module').then(m => m.GestionEvaluacionesModule)
  },
  {
    path: 'gestion-usuarios',
    loadChildren: () => import('./components/gestion-usuarios/gestion-usuarios.module').then(m => m.GestionUsuariosModule)
  },
  {path: 'evaluacion', component: EvaluacionComponent},
  {path: 'evaluacion-colaborador/:id_Colaborador', component: EvaluacionColaboradorComponent},

  {path: '**', component: NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
