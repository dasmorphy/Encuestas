import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaColaboresInterface } from 'src/app/models/colaboradores';
import { ListaEvaluacionesInterface } from 'src/app/models/evaluacion';
import { ListaModuloPreguntasInterface } from 'src/app/models/moduloPreguntas';
import { ListaPreguntasByEvaluacionInterface } from 'src/app/models/preguntasByEvaluacion';
import { ListaUsuariosInterface } from 'src/app/models/usuarios';
import { ApiService } from 'src/app/services/ApiService';
import { InactivitySessionService } from 'src/app/services/InactivitySessionService';
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
    private inactivityService: InactivitySessionService  
  ){}

  datosEvaluacion: any;
  preguntaCount = 30; //maximo de calificacion segun el numero de preguntas
  datosDesdeEvaluacion: any;
  calificacionPregunta:any = {};
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

  });


  ngOnInit(): void {
    this.datosEvaluacion = history.state.datos;
    let accesoListaEvaluacion = this.datosEvaluacion.state.rutaListaEvaluacion;
  
    console.log("Datos de la Evaluacion",this.datosEvaluacion);
    const sessionData = this.sessionService.getSession();
    console.log(sessionData);
    this.inactivityService.initInactivityTimer();
    if (sessionData == null){
      this.router.navigate(['login']);
    }

    if(accesoListaEvaluacion){
      this.rutaListaEvaluacion = true;
    }

    this.generarCalificacionesPreguntas();
    let colaboradorId = this.activedRoute.snapshot.paramMap.get('id_Colaborador');
    let usuarioId = this.activedRoute.snapshot.paramMap.get('id_Usuario');

    this.api.getSingleColaborador(colaboradorId).subscribe(data => {
      this.colaboradores = data
      this.evaluacionForm.setValue({
        'id_Colaborador': colaboradorId,
        'nombres': this.colaboradores.nombres
      })
    }); 
    console.log("Datos de la Evaluacion",this.datosEvaluacion);
    this.evaluacionSingle.setValue(this.datosEvaluacion.state.evaluaciones[0]);

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

  async guardarEvaluacion()
  {
    const id_Colaborador = this.evaluacionForm.get('id_Colaborador')?.value;
    const id_Usuario = this.usuarioForm.get('id_Usuario')?.value;
    const estado = "Realizada";
    
    const formData: any = {
      colaborador_id: id_Colaborador,
      usuario_id: id_Usuario,
      estado: estado
    };

    for (let i = 1; i <= this.preguntaCount; i++) {
      const key = `clfc_Pregunta${i}`;
      formData[key] = this.calificacionPregunta[key];
    }

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

    console.log(formData);
  }

  async actualizarEvaluacion(){
    let estadoEvaluacion = "Borrador";
    let id_Evaluacion = this.datosEvaluacion.state.evaluaciones[0].id_Evaluacion;
    let usuarioId = this.datosEvaluacion.state.evaluaciones[0].usuario_id;
    let colaborador_id = this.datosEvaluacion.state.evaluaciones[0].colaborador_id;

    console.log("id_Evaluacion", id_Evaluacion);
    console.log("usuarioId", usuarioId);

    // Obtener los valores del formulario reactivo evaluacionSingle
    const dataEvaluacion = this.evaluacionSingle.value;

    // Agregar los campos adicionales necesarios
    dataEvaluacion.estado = estadoEvaluacion;
    dataEvaluacion.id_Evaluacion = id_Evaluacion;
    dataEvaluacion.usuario_id = usuarioId;
    dataEvaluacion.colaborador_id = colaborador_id;

    // this.api.updateEvaluacion(dataEvaluacion).subscribe(
    //   next => {
    //     console.log('Evaluacion registrada exitosamente', next);
    //   },
    //   error => {
    //     console.error('Error al registrar Evaluacion', error);
    //   }
      
    // );



    try {
      const result = await Swal.fire({
        title: '¿Está seguro de guardar la evaluación como borrador? Podrá continuar evaluandola más adelante',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Guardar como borrador',
        denyButtonText: `No guardar`,
      });

      if (result.isConfirmed) {
        // Llamada al servicio y registro de datos solo si el usuario confirma
        const next = await firstValueFrom(this.api.updateEvaluacion(dataEvaluacion));
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
  regresar(listaEvaluacion: boolean){
    if(listaEvaluacion){
      this.router.navigate(['gestion-evaluaciones/lista-evaluaciones']);
    }
    else{
      this.router.navigate(['evaluacion']);
    }
  }
  onUserActivity(): void {
    this.inactivityService.resetInactivityTimer();
  }
}
