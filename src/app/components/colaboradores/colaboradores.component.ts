import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/ApiService'
import { Router } from "@angular/router";
import { ListaColaboresInterface } from "../../models/colaboradores";
import { InactivitySessionService } from 'src/app/services/InactivitySessionService';
import { SessionService } from 'src/app/services/SessionService';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';

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

  async eliminarColaborador(id_Colaborador: number){
    const result = await Swal.fire({
      title: '¿Está seguro de continuar?',
      text: "Se eliminará el colaborador definitivamente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    });
    
    if (result.isConfirmed) {
      const next = await firstValueFrom(this.api.deleteColaborador(id_Colaborador));
      await Swal.fire('Eliminado', 'Colaborador eliminado', 'success');
    }
  }

  onUserActivity(): void {
    this.inactivityService.resetInactivityTimer();
  }

  agregarColaboradores(){
    this.router.navigate(['/nuevosColaboradores']);
    
  }
}
