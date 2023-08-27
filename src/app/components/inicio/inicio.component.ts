import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListaUsuariosInterface } from 'src/app/models/usuarios';
import { ApiService } from 'src/app/services/ApiService';
//import { InactivitySessionService } from 'src/app/services/InactivitySessionService';
import { SessionService } from 'src/app/services/SessionService';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';
import { ListaRolesInterface } from 'src/app/models/roles';
import { ListaColaboresInterface } from 'src/app/models/colaboradores';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit{
  usuarios: ListaUsuariosInterface[];
  sessionData: any;
  usuarioSesion: ListaUsuariosInterface;
  nombreUsuario: ListaColaboresInterface;
  rolUsuario: ListaRolesInterface;
  rolAdmi: boolean = false;
  loginAuth: any;


  constructor(
    private api:ApiService, private router: Router, private sessionService: SessionService, 
   // private inactivityService: InactivitySessionService
  ){}

  async ngOnInit() {
    this.api.getAllUsuarios().subscribe(data =>{
      this.usuarios = data; 
    })
    
    const sessionData = this.sessionService.getSession();
    this.sessionData = sessionData;
    //console.log("SESIONNN",sessionData);


    const loginAuthString = localStorage.getItem('loginAuth');
    if (loginAuthString) {
      this.loginAuth = JSON.parse(loginAuthString);
      this.router.navigate(['inicio']);

    }

    const usuarioNombre = await firstValueFrom(this.api.getColaboradorByIdentificacion(this.loginAuth.identificacion));
    this.nombreUsuario = usuarioNombre;


    const usuarioLogin = await firstValueFrom(this.api.getSingleUsuario(this.loginAuth.id_Usuario));
    this.usuarioSesion = usuarioLogin;

    const rolUsuario = await firstValueFrom(this.api.getSingleRol(this.usuarioSesion.rol_Id));
          
    this.rolUsuario = rolUsuario;
    if (this.rolUsuario.nombre_Rol == "administrador"){
      this.rolAdmi = true;
    }

  }

  //Cierre de sesion 
  async confirmLogout() {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres cerrar la sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión'
    });
  
    if (result.isConfirmed) {
      //this.logout();
      await Swal.fire('Ok', 'Sesión Cerrada', 'success');
      this.logout();
      //this.router.navigate(['gestion-usuarios/lista-usuarios']);
    }
  }


  logout() {
    this.sessionService.logout();
  }

  procesosEvaluacion(){
    this.router.navigate(['procesosEvaluacion']);

  }
  // onUserActivity(): void {
  //   this.inactivityService.resetInactivityTimer();
  // }
}
