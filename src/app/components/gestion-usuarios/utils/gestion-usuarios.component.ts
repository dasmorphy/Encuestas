import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListaUsuariosInterface } from 'src/app/models/usuarios';
import { ApiService } from 'src/app/services/ApiService';
import { InactivitySessionService } from 'src/app/services/InactivitySessionService';
import { SessionService } from 'src/app/services/SessionService';


@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements OnInit{

  usuarios: ListaUsuariosInterface[];
  constructor(private api:ApiService, private router: Router,
    private sessionService: SessionService, 
    private inactivityService: InactivitySessionService  
  ){}

  ngOnInit(): void {
    this.router.navigate(['gestion-usuarios/lista-usuarios']);
    this.api.getAllUsuarios().subscribe(data =>{
      this.usuarios = data; 
    })

    const sessionData = this.sessionService.getSession();
    this.inactivityService.initInactivityTimer();
    if (sessionData == null){
      this.router.navigate(['login']);
    }
  }

  editarUsuario(id_usuario: number){
    this.router.navigate(['gestion-usuarios/editar-usuario', id_usuario]);
  }

  onUserActivity(): void {
    this.inactivityService.resetInactivityTimer();
  }
}
