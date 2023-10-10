import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListaUsuariosInterface } from 'src/app/models/usuarios';
import { ApiService } from 'src/app/services/ApiService';
//import { InactivitySessionService } from 'src/app/services/InactivitySessionService';
import { SessionService } from 'src/app/services/SessionService';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements OnInit{

  usuarios: ListaUsuariosInterface[];

  searchTerm: string = ''; // Término de búsqueda
  page: number = 1;//pagina inicial para paginacion
 
  usuariosConRol: { usuario: ListaUsuariosInterface, rolUsuario: any}[] = [];

  constructor(private api:ApiService, private router: Router,
    private sessionService: SessionService, 
    //private inactivityService: InactivitySessionService  
  ){}

  async ngOnInit() {
    this.router.navigate(['gestion-usuarios/lista-usuarios']);

    let usuariosData = await firstValueFrom(this.api.getAllUsuarios())
    this.usuarios = usuariosData; 

    for (const usuario of this.usuarios) {
      const rolUsuario = await firstValueFrom(this.api.getSingleRol(usuario.rol_Id));
      this.usuariosConRol.push({ usuario, rolUsuario });
    }
  }

  editarUsuario(id_usuario: number){
    this.router.navigate(['gestion-usuarios/editar-usuario', id_usuario]);
  }

  cambioPass(id_usuario: number){
    this.router.navigate(['gestion-usuarios/cambiarPassword', id_usuario]);

  }

  async eliminarUsuario(id_usuario: number){
    const result = await Swal.fire({
      title: '¿Está seguro de continuar?',
      text: "Se eliminará el usuario definitivamente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    });
    
    if (result.isConfirmed) {
      const next = await firstValueFrom(this.api.deleteUser(id_usuario));
      await Swal.fire('Eliminado', 'Usuario eliminado', 'success');
    }
  }

  // onUserActivity(): void {
  //   this.inactivityService.resetInactivityTimer();
  // }
}
