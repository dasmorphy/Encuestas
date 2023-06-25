import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/ApiService'
import { Router } from "@angular/router";
import { ListaColaboresInterface } from "../../models/colaboradores";
import { InactivitySessionService } from 'src/app/services/InactivitySessionService';
import { SessionService } from 'src/app/services/SessionService';


@Component({
  selector: 'app-colaboradores',
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.css']
})
export class ColaboradoresComponent implements OnInit {
  
  colaboradores: ListaColaboresInterface[];
  constructor(private api:ApiService, private router: Router,
    private sessionService: SessionService, 
    private inactivityService: InactivitySessionService  
  ){}

  ngOnInit(): void {

    const sessionData = this.sessionService.getSession();
    this.inactivityService.initInactivityTimer();
    if (sessionData == null){
      this.router.navigate(['login']);
    }

    this.api.getAllCollaboradorByUsuario(sessionData.id_Usuario).subscribe(data =>{
      console.log(data);
      this.colaboradores = data;
    })
  }

  onUserActivity(): void {
    this.inactivityService.resetInactivityTimer();
  }

  agregarColaboradores(){
    this.router.navigate(['/nuevosColaboradores']);
    
  }
}
