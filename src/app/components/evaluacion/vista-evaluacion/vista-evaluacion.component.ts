import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaColaboresInterface } from 'src/app/models/colaboradores';
import { ListaEvaluacionesInterface } from 'src/app/models/evaluacion';
import { ListaModuloPreguntasInterface } from 'src/app/models/moduloPreguntas';
import { ListaPreguntasByEvaluacionInterface } from 'src/app/models/preguntasByEvaluacion';
import { ListaUsuariosInterface } from 'src/app/models/usuarios';
import { ApiService } from 'src/app/services/ApiService.service';
// import { InactivitySessionService } from 'src/app/services/InactivitySessionService';
import { SessionService } from 'src/app/services/SessionService';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-vista-evaluacion',
  templateUrl: './vista-evaluacion.component.html',
  styleUrls: ['./vista-evaluacion.component.css']
})
export class VistaEvaluacionComponent implements OnInit{
  
  constructor(private activedRoute: ActivatedRoute, private api:ApiService, private router: Router,
    private sessionService: SessionService, 
    //private inactivityService: InactivitySessionService  
  ){}

  datosEvaluacion: any;
  preguntaCount = 52; //maximo de calificacion segun el numero de preguntas
  datosDesdeEvaluacion: any;
  calificacionPregunta:any = {};
  observacionPregunta:any={};
  rutaListaEvaluacion: Boolean = false;
    
  colaboradores: ListaColaboresInterface;
  preguntasByEvaluacion: ListaPreguntasByEvaluacionInterface[];
  usuario: ListaUsuariosInterface;
  modulosPreguntas: ListaModuloPreguntasInterface[];
  evaluacion: ListaEvaluacionesInterface;


  evaluacionForm = new FormGroup({
    id_Colaborador: new FormControl(),
    nombres: new FormControl('')

  });

  usuarioForm = new FormGroup({
    id_Usuario: new FormControl(),
    usuario: new FormControl('')

  });

  evaluacionSingle = new FormGroup({
    id_Evaluacion: new FormControl(),
    usuario_id: new FormControl(),
    colaborador_id: new FormControl(),
    estado: new FormControl(),
    fecha_Creacion: new FormControl(),
    calificacionFinal: new FormControl(),
    usuariosModel: new FormControl(),
    colaboradorModel: new FormControl(),
    clfc_Pregunta1: new FormControl(),
    clfc_Pregunta2: new FormControl(),
    clfc_Pregunta3: new FormControl(),
    clfc_Pregunta4: new FormControl(),
    clfc_Pregunta5: new FormControl(),
    clfc_Pregunta6: new FormControl(),
    clfc_Pregunta7: new FormControl(),
    clfc_Pregunta8: new FormControl(),
    clfc_Pregunta9: new FormControl(),
    clfc_Pregunta10: new FormControl(),
    clfc_Pregunta11: new FormControl(),
    clfc_Pregunta12: new FormControl(),
    clfc_Pregunta13: new FormControl(),
    clfc_Pregunta14: new FormControl(),
    clfc_Pregunta15: new FormControl(),
    clfc_Pregunta16: new FormControl(),
    clfc_Pregunta17: new FormControl(),
    clfc_Pregunta18: new FormControl(),
    clfc_Pregunta19: new FormControl(),
    clfc_Pregunta20: new FormControl(),
    clfc_Pregunta21: new FormControl(),
    clfc_Pregunta22: new FormControl(),
    clfc_Pregunta23: new FormControl(),
    clfc_Pregunta24: new FormControl(),
    clfc_Pregunta25: new FormControl(),
    clfc_Pregunta26: new FormControl(),
    clfc_Pregunta27: new FormControl(),
    clfc_Pregunta28: new FormControl(),
    clfc_Pregunta29: new FormControl(),
    clfc_Pregunta30: new FormControl(),
    clfc_Pregunta31: new FormControl(),
    clfc_Pregunta32: new FormControl(),
    clfc_Pregunta33: new FormControl(),
    clfc_Pregunta34: new FormControl(),
    clfc_Pregunta35: new FormControl(),
    clfc_Pregunta36: new FormControl(),
    clfc_Pregunta37: new FormControl(),
    clfc_Pregunta38: new FormControl(),
    clfc_Pregunta39: new FormControl(),
    clfc_Pregunta40: new FormControl(),
    clfc_Pregunta41: new FormControl(),
    clfc_Pregunta42: new FormControl(),
    clfc_Pregunta43: new FormControl(),
    clfc_Pregunta44: new FormControl(),
    clfc_Pregunta45: new FormControl(),
    clfc_Pregunta46: new FormControl(),
    clfc_Pregunta47: new FormControl(),
    clfc_Pregunta48: new FormControl(),
    clfc_Pregunta49: new FormControl(),
    clfc_Pregunta50: new FormControl(),
    clfc_Pregunta51: new FormControl(),
    clfc_Pregunta52: new FormControl(),
    observacion_id: new FormControl(),
    observacionModel: new FormControl(),
  });

  observacionSingle = new FormGroup({
    id_Observacion: new FormControl(),
    evaluacion_id: new FormControl(),
    observacion1: new FormControl(),
    observacion2: new FormControl(),
    observacion3: new FormControl(),
    observacion4: new FormControl(),
    observacion5: new FormControl(),
    observacion6: new FormControl(),
    observacion7: new FormControl(),
    observacion8: new FormControl(),
    observacion9: new FormControl(),
    observacion10: new FormControl(),
    observacion11: new FormControl(),
    observacion12: new FormControl(),
    observacion13: new FormControl(),
    observacion14: new FormControl(),
    observacion15: new FormControl(),
    observacion16: new FormControl(),
    observacion17: new FormControl(),
    observacion18: new FormControl(),
    observacion19: new FormControl(),
    observacion20: new FormControl(),
    observacion21: new FormControl(),
    observacion22: new FormControl(),
    observacion23: new FormControl(),
    observacion24: new FormControl(),
    observacion25: new FormControl(),
    observacion26: new FormControl(),
    observacion27: new FormControl(),
    observacion28: new FormControl(),
    observacion29: new FormControl(),
    observacion30: new FormControl(),
    observacion31: new FormControl(),
    observacion32: new FormControl(),
    observacion33: new FormControl(),
    observacion34: new FormControl(),
    observacion35: new FormControl(),
    observacion36: new FormControl(),
    observacion37: new FormControl(),
    observacion38: new FormControl(),
    observacion39: new FormControl(),
    observacion40: new FormControl(),
    observacion41: new FormControl(),
    observacion42: new FormControl(),
    observacion43: new FormControl(),
    observacion44: new FormControl(),
    observacion45: new FormControl(),
    observacion46: new FormControl(),
    observacion47: new FormControl(),
    observacion48: new FormControl(),
    observacion49: new FormControl(),
    observacion50: new FormControl(),
    observacion51: new FormControl(),
    observacion52: new FormControl(),
    fecha_Creacion: new FormControl(),
    evaluacionModel: new FormControl()
  });

  async ngOnInit() {
    this.datosEvaluacion = history.state.datos;
    let accesoListaEvaluacion = this.datosEvaluacion.state.rutaListaEvaluacion;
  
    //console.log("Datos de la Evaluacion",this.datosEvaluacion);
    const sessionData = this.sessionService.getSession();
    //console.log(sessionData);
    // this.inactivityService.initInactivityTimer();
    // if (sessionData == null){
    //   this.router.navigate(['login']);
    // }

    if(accesoListaEvaluacion){
      this.rutaListaEvaluacion = true;
    }

    this.generarCalificacionesPreguntas();
    let colaboradorId = this.activedRoute.snapshot.paramMap.get('id_Colaborador');
    let usuarioId = this.activedRoute.snapshot.paramMap.get('id_Usuario');

    const next = await firstValueFrom(this.api.getSingleColaborador(colaboradorId));
    this.colaboradores = next;
    
    this.evaluacionForm.setValue({
      'id_Colaborador': colaboradorId,
      'nombres': this.colaboradores.nombres
    })

    //console.log("Datos de la Evaluacion",this.datosEvaluacion);
    this.evaluacionSingle.setValue(this.datosEvaluacion.state.evaluaciones[0]);
    this.observacionSingle.setValue(this.datosEvaluacion.state.observaciones);

    //console.log("OBSERVACOPNES", this.observacionSingle);

    this.api.getAllPreguntaByEvaluacion().subscribe(data =>{
      //console.log(data);
      this.preguntasByEvaluacion = data;
    });

    this.api.getSingleUsuario(usuarioId).subscribe(data => {
      this.usuario = data
      this.usuarioForm.setValue({
        'id_Usuario': usuarioId,
        'usuario': this.usuario.usuario

      })
      //console.warn(data);
      //console.warn(this.usuario);
      //CAMBIO SOLICITADO
      this.api.getPreguntaModuloCargo(this.colaboradores.cargo_Id).subscribe(data => {
        this.modulosPreguntas = data
        //console.log("AAAA",this.modulosPreguntas)
        //console.log("ssss",sessionData.cargo_Id)
      });


    });
    
    

  }
  
  
  generarCalificacionesPreguntas() {
    for (let i = 1; i <= this.preguntaCount; i++) {
      const key = `clfc_Pregunta${i}`;
      this.calificacionPregunta[key] = 0;
    }
  }

  generarObservacionesPreguntas() {
    for (let i = 1; i <= this.preguntaCount; i++) {
      const key = `Observacion${i}`;
      this.observacionPregunta[key] = 0;
    }
  }

  async guardarEvaluacion()
  {
    const id_Colaborador = this.evaluacionForm.get('id_Colaborador')?.value;
    const id_Usuario = this.usuarioForm.get('id_Usuario')?.value;
    const estado = "Realizada";
    
    const evaluacionDto: any = {
      colaborador_id: id_Colaborador,
      usuario_id: id_Usuario,
      estado: estado
    }

    const observacionDto: any = {};

    for (let i = 1; i <= this.preguntaCount; i++) {
      const key = `clfc_Pregunta${i}`;
      evaluacionDto[key] = this.calificacionPregunta[key];
    }
    
    for (let i = 1; i <= this.preguntaCount; i++) {
      const key = `observacion${i}`;
      observacionDto[key] = this.observacionPregunta[key];
    }

    const formData: any = {
      evaluacionDto,
      observacionDto
      
    };

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
        //console.log('Evaluacion registrada exitosamente', next);
        await Swal.fire('Ok', 'Evaluación guardada correctamente', 'success');   
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

    //console.log(formData);
  }

  async actualizarEvaluacion(estadoActualizacion: string){

    try 
    {
      let estadoEvaluacion = estadoActualizacion;
      let id_Evaluacion = this.datosEvaluacion.state.evaluaciones[0].id_Evaluacion;
      let usuarioId = this.datosEvaluacion.state.evaluaciones[0].usuario_id;
      let colaborador_id = this.datosEvaluacion.state.evaluaciones[0].colaborador_id;

      //console.log("id_Evaluacion", id_Evaluacion);
      //console.log("usuarioId", usuarioId);

      // Obtener los valores del formulario reactivo evaluacionSingle
      const dataEvaluacion = this.evaluacionSingle.value;
      const dataObservacion = this.observacionSingle.value;
      //console.log("dataEvaluacion",dataEvaluacion);
      //console.log("dataObservacion",dataObservacion);


      // Agregar los campos adicionales necesarios
      dataEvaluacion.estado = estadoEvaluacion;
      dataEvaluacion.id_Evaluacion = id_Evaluacion;
      dataEvaluacion.usuario_id = usuarioId;
      dataEvaluacion.colaborador_id = colaborador_id;

      const dataFinal: any = 
      {
        evaluacionDtoPut: dataEvaluacion,
        observacionDtoPut: dataObservacion

      } 
      
      //console.log("IDDDDD", dataFinal.evaluacionDtoPut.id_Evaluacion);
      //console.log("dataFinal", dataFinal);

    
      if (estadoEvaluacion == "Borrador") {
       
        const result = await Swal.fire({
          title: '¿Está seguro de guardar la evaluación como borrador?, Podra continuar evaluandola más adelante',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Guardar como borrador',
          denyButtonText: `No guardar`,
        });
  
        if (result.isConfirmed) {
          // Llamada al servicio y registro de datos solo si el usuario confirma
          const next = await firstValueFrom(this.api.updateEvaluacion(dataFinal));
          await Swal.fire('Ok', 'Evaluación guardada como borrador', 'success');
          //console.log('Evaluacion registrada exitosamente', next);
          this.router.navigate(['evaluacion']);
        } else if (result.isDenied) {
          Swal.fire('Cancelado', '', 'info');
        }
        
      }
      else{
        const result = await Swal.fire({
          title: '¿Está seguro de guardar la evaluación definitavemente?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Guardar evaluación',
          denyButtonText: `No guardar`,
        });
  
        if (result.isConfirmed) {
          // Llamada al servicio y registro de datos solo si el usuario confirma
          const next = await firstValueFrom(this.api.updateEvaluacion(dataFinal));
          //console.log('Evaluacion registrada exitosamente', next);
          await Swal.fire('Gracias', '¡Negfar, agradece tu dedicación en completar la evaluación de desempeño! Valoramos tu tiempo y esfuerzo al proporcionar una evaluación honesta y constructiva.'+
          'Tus observaciones y comentarios son esenciales para el desarrollo profesional de nuestros colaboradores, así mismo tu perspectiva objetiva contribuye al crecimiento continuo de nuestro equipo.', 'success');   
          this.router.navigate(['evaluacion']);
          
        } else if (result.isDenied) {
          Swal.fire('Cancelado', '', 'info');
        }
          
      }
      
    } catch (error) {
      console.error('Error al actualizar la Evaluacion', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error inesperado, por favor comuníquese con el adminitrador o sistemas',
      });
    }
  }
  regresar(listaEvaluacion: boolean){
    if(listaEvaluacion){
      this.router.navigate(['gestion-evaluaciones/lista-evaluaciones']);
    }
    else{
      this.router.navigate(['evaluacion']);
    }
  }
  // onUserActivity(): void {
  //   this.inactivityService.resetInactivityTimer();
  // }
}
