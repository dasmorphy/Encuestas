import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/ApiService'
import { NavigationExtras, Router } from "@angular/router";
import { ListaColaboresInterface } from "../../../models/colaboradores";
import { InactivitySessionService } from 'src/app/services/InactivitySessionService';
import { SessionService } from 'src/app/services/SessionService';
import { ListaEvaluacionesInterface } from 'src/app/models/evaluacion';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css']
})
export class EvaluacionComponent implements OnInit {
  preguntaCount = 30; //maximo de calificacion segun el numero de preguntas
  sessionData = this.sessionService.getSession();
  colaboradores: ListaColaboresInterface[];
  evaluaciones: ListaEvaluacionesInterface[];
  desactivarBoton: boolean = false;
  constructor(private api:ApiService, private router: Router,
    private sessionService: SessionService, 
    private inactivityService: InactivitySessionService
  ){}

  ngOnInit(): void {
    this.inactivityService.initInactivityTimer();
    if (this.sessionData == null){
      this.router.navigate(['login']);
    }
    this.api.getAllCollaboradorByUsuario(this.sessionData.id_Usuario).subscribe(data =>{
      console.log(data);
      this.colaboradores = data;
    })
  }

  evaluacionColaborador(id_colaborador: number)
  {
    this.router.navigate(['evaluacion-colaborador', id_colaborador]);
    console.log(id_colaborador);
  }

  continuarEvaluacion(id_Colaborador: number){
    const usuarioId = this.sessionData.id_Usuario;
    if (usuarioId == null){
      console.log("VACIO",this.sessionData.id_Usuario);
    }
    this.api.getSingleEvaluacion(id_Colaborador, usuarioId).subscribe(
      data => {
        this.evaluaciones = data;
        console.log(data);

        const datosParaVista = {
          evaluaciones: data
          // Agrega otros datos si lo necesitas
        };
        console.log("datosParaVista", datosParaVista)
        // Preparar los extras de navegación con el objeto de datos
        const navigationExtras: NavigationExtras = {
          state: datosParaVista
        };
        console.log("navigationExtras", navigationExtras)
        this.router.navigate(['vistaEvaluacion', id_Colaborador, usuarioId], {state: {datos: navigationExtras}});


      },
      error => {
        console.error('Evaluacion no encontrada', error);

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se han encontrado las evaluaciones del colaborador, por favor comuniquese con el administrador o sistemas',
        });

      }
    );

    // this.router.navigate(['vistaEvaluacion', id_Colaborador, usuarioId]);
  }

  BotonDesactivado(colaborador: any): boolean {
    return colaborador.estado === 'Evaluado';
  }

  onUserActivity(): void {
    this.inactivityService.resetInactivityTimer();
  }

  
}
