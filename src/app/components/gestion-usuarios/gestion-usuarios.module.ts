import { NgModule } from '@angular/core';
import {  CommonModule, NgForOf  } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { GestionUsuariosRoutingModule } from './gestion-usuarios-routing.module';
import { NuevoUsuarioComponent } from './nuevo-usuario/nuevo-usuario.component';
import { GestionUsuariosComponent } from './utils/gestion-usuarios.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';


@NgModule({
  declarations: [
    NuevoUsuarioComponent,
    GestionUsuariosComponent,
    EditarUsuarioComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    GestionUsuariosRoutingModule
  ]
})
export class GestionUsuariosModule { }
