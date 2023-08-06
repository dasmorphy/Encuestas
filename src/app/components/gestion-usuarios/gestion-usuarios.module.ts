import { NgModule } from '@angular/core';
import {  CommonModule, NgForOf  } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { GestionUsuariosRoutingModule } from './gestion-usuarios-routing.module';
import { NuevoUsuarioComponent } from './nuevo-usuario/nuevo-usuario.component';
import { GestionUsuariosComponent } from './utils/gestion-usuarios.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { CambiarContrasenaComponent } from './cambiar-contrasena/cambiar-contrasena.component';
import { SearchPipeUsuariosComponent } from '../search-pipe-usuarios/search-pipe-usuarios.component';


@NgModule({
  declarations: [
    NuevoUsuarioComponent,
    GestionUsuariosComponent,
    EditarUsuarioComponent,
    CambiarContrasenaComponent,
    SearchPipeUsuariosComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    GestionUsuariosRoutingModule,
    FormsModule
  ]
})
export class GestionUsuariosModule { }
