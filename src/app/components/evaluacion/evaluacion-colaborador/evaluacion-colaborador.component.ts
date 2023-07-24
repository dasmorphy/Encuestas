import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaColaboresInterface } from 'src/app/models/colaboradores';
import { ListaModuloEvaluacionInterface } from 'src/app/models/moduloEvaluacion';
import { ListaModuloPreguntasInterface } from 'src/app/models/moduloPreguntas';
import { ListaPreguntasByEvaluacionInterface } from 'src/app/models/preguntasByEvaluacion';
import { ListaUsuariosInterface } from 'src/app/models/usuarios';
import { ApiService } from 'src/app/services/ApiService';
import { InactivitySessionService } from 'src/app/services/InactivitySessionService';
import { SessionService } from 'src/app/services/SessionService';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-evaluacion-colaborador',
  templateUrl: './evaluacion-colaborador.component.html',
  styleUrls: ['./evaluacion-colaborador.component.css']
})
export class EvaluacionColaboradorComponent implements OnInit {
  constructor(private activedRoute: ActivatedRoute, private api:ApiService, private router: Router,
    private sessionService: SessionService, 
    private inactivityService: InactivitySessionService  
  ){}

  preguntaCount = 30; //maximo de calificacion segun el numero de preguntas

  calificacionPregunta:any = {};

  colaboradores: ListaColaboresInterface;
  preguntasByEvaluacion: ListaPreguntasByEvaluacionInterface[];
  usuario: ListaUsuariosInterface;
  modulosPreguntas: ListaModuloPreguntasInterface[];

  evaluacionForm = new FormGroup({
    id_Colaborador: new FormControl(),
    nombres: new FormControl('')

  });

  usuarioForm = new FormGroup({
    id_Usuario: new FormControl(),
    usuario: new FormControl('')

  });

  ngOnInit(): void {
    const sessionData = this.sessionService.getSession();
    console.log(sessionData);
    this.inactivityService.initInactivityTimer();
    if (sessionData == null){
      this.router.navigate(['login']);
    }

    this.generarCalificacionesPreguntas();
    let colaboradorId = this.activedRoute.snapshot.paramMap.get('id_Colaborador');
    let usuarioId = sessionData.id_Usuario;

    this.api.getSingleColaborador(colaboradorId).subscribe(data => {
      this.colaboradores = data
      this.evaluacionForm.setValue({
        'id_Colaborador': colaboradorId,
        'nombres': this.colaboradores.nombres
      })
    });


    this.api.getAllPreguntaByEvaluacion().subscribe(data =>{
      console.log(data);
      this.preguntasByEvaluacion = data;
    });

    this.api.getSingleUsuario(usuarioId).subscribe(data => {
      this.usuario = data
      this.usuarioForm.setValue({
        'id_Usuario': usuarioId,
        'usuario': this.usuario.usuario

      })
      console.warn(data);
    });

    this.api.getAllModulosPreguntas(sessionData.tipo_Evaluacion_Id).subscribe(data =>{
      console.log(data);
      //this.modulosPreguntas = data;
      //Se filtra los modulos segun el tipo de evaluacion del login
      this.modulosPreguntas = data.filter
      (
        modulo => modulo.tipo_Evaluacion_Id === sessionData.tipo_Evaluacion_Id
      );
      console.log(this.modulosPreguntas);
      
    });

  }

  generarCalificacionesPreguntas() {
    for (let i = 1; i <= this.preguntaCount; i++) {
      const key = `clfc_Pregunta${i}`;
      this.calificacionPregunta[key] = 0;
    }
  }

  

  async guardarEvaluacion(estado: string)
  {
    const id_Colaborador = this.evaluacionForm.get('id_Colaborador')?.value;
    const id_Usuario = this.usuarioForm.get('id_Usuario')?.value;
    const estadoEvaluacion = estado;
    
    const formData: any = {
      colaborador_id: id_Colaborador,
      usuario_id: id_Usuario,
      estado: estadoEvaluacion
    };

    for (let i = 1; i <= this.preguntaCount; i++) {
      const key = `clfc_Pregunta${i}`;
      formData[key] = this.calificacionPregunta[key];
    }

    if (estado == "Borrador") {

      try {
        const result = await Swal.fire({
          title: '¿Está seguro de guardar la evaluación como borrador?, Podra continuar evaluandola más adelante',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Guardar como borrador',
          denyButtonText: `No guardar`,
        });
  
        if (result.isConfirmed) {
          // Llamada al servicio y registro de datos solo si el usuario confirma
          const next = await firstValueFrom(this.api.postEvaluacion(formData));
          await Swal.fire('Ok', 'Evaluación guardada como borrador', 'success');
          console.log('Evaluacion registrada exitosamente', next);
          this.router.navigate(['evaluacion']);
        } else if (result.isDenied) {
          Swal.fire('Cancelado', '', 'info');
        }
        
      } catch (error) {
        console.error('Error al registrar Evaluacion', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error inesperado, por favor comuníquese con el adminitrador o sistemas',
        });
      }
    }
    else{
      try {
        const result = await Swal.fire({
          title: '¿Está seguro de guardar la evaluación definitavemente?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Guardar evaluación',
          denyButtonText: `No guardar`,
        });
  
        if (result.isConfirmed) {
          // Llamada al servicio y registro de datos solo si el usuario confirma
          const next = await firstValueFrom(this.api.postEvaluacion(formData));
          console.log('Evaluacion registrada exitosamente', next);
          await Swal.fire('Ok', 'Evaluacion guardada correctamente', 'success');   
          this.router.navigate(['evaluacion']);
          
        } else if (result.isDenied) {
          Swal.fire('Cancelado', '', 'info');
        }
        
      } catch (error) {
        console.error('Error al registrar Evaluacion', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error inesperado, por favor comuníquese con el adminitrador o sistemas',
        });
      }
    }

    console.log(formData);
  }

  onUserActivity(): void {
    this.inactivityService.resetInactivityTimer();
  }
}
