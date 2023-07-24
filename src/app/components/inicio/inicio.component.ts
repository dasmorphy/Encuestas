import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListaUsuariosInterface } from 'src/app/models/usuarios';
import { ApiService } from 'src/app/services/ApiService';
import { InactivitySessionService } from 'src/app/services/InactivitySessionService';
import { SessionService } from 'src/app/services/SessionService';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit{
  usuarios: ListaUsuariosInterface[];
  sessionData: any;
  constructor(
    private api:ApiService, private router: Router, private sessionService: SessionService, 
    private inactivityService: InactivitySessionService
  ){}

  ngOnInit(): void {
    this.api.getAllUsuarios().subscribe(data =>{
      this.usuarios = data; 
    })
    
    const sessionData = this.sessionService.getSession();
    this.sessionData = sessionData;
    console.log(sessionData);
    this.inactivityService.initInactivityTimer();
    if (sessionData == null){
      this.router.navigate(['login']);
    }
  }

  onUserActivity(): void {
    this.inactivityService.resetInactivityTimer();
  }
}
