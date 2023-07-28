import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevoUsuarioComponent } from './nuevo-usuario/nuevo-usuario.component';
import { GestionUsuariosComponent } from './utils/gestion-usuarios.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { CambiarContrasenaComponent } from './cambiar-contrasena/cambiar-contrasena.component';

const routes: Routes = [
  {
    path: 'lista-usuarios', 
    component: GestionUsuariosComponent
  },
  {
    path: 'nuevo-usuario', 
    component: NuevoUsuarioComponent
  },
  {
    path: 'editar-usuario/:id_Usuario', 
    component: EditarUsuarioComponent
  },
  {
    path: 'cambiarPassword/:id_Usuario', 
    component: CambiarContrasenaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionUsuariosRoutingModule { }
