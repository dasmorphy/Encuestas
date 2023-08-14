import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaColaboresInterface } from 'src/app/models/colaboradores';
import { ListaModuloEvaluacionInterface } from 'src/app/models/moduloEvaluacion';
import { ListaModuloPreguntasInterface } from 'src/app/models/moduloPreguntas';
import { ListaPreguntasByEvaluacionInterface } from 'src/app/models/preguntasByEvaluacion';
import { ListaUsuariosInterface } from 'src/app/models/usuarios';
import { ApiService } from 'src/app/services/ApiService';
// import { InactivitySessionService } from 'src/app/services/InactivitySessionService';
import { SessionService } from 'src/app/services/SessionService';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';
import { ListaPreguntaModuloCargo } from 'src/app/models/preguntaModuloCargo';

@Component({
  selector: 'app-evaluacion-colaborador',
  templateUrl: './evaluacion-colaborador.component.html',
  styleUrls: ['./evaluacion-colaborador.component.css']
})
export class EvaluacionColaboradorComponent implements OnInit {
  constructor(private activedRoute: ActivatedRoute, private api:ApiService, private router: Router,
    private sessionService: SessionService, 
    //private inactivityService: InactivitySessionService  
  ){}

  preguntaCount = 52; //maximo de calificacion segun el numero de preguntas
  preguntasAMostrar: any[] = [];
  calificacionPregunta:any = {};
  observacionPregunta:any={};

  colaboradores: ListaColaboresInterface;
  preguntasByEvaluacion: ListaPreguntasByEvaluacionInterface[];
  usuario: ListaUsuariosInterface;
  modulosPreguntas: ListaModuloPreguntasInterface[];
  calificacionInvalida: { [preguntaNumero: number]: boolean } = {};

  evaluacionForm = new FormGroup({
    id_Colaborador: new FormControl(),
    nombres: new FormControl('')

  });

  usuarioForm = new FormGroup({
    id_Usuario: new FormControl(),
    usuario: new FormControl('')

  });

  async ngOnInit() {
    const sessionData = this.sessionService.getSession();
    console.log(sessionData);
    //this.inactivityService.initInactivityTimer();
    if (sessionData == null){
      this.router.navigate(['login']);
    }

    this.generarCalificacionesPreguntas();
    let colaboradorId = this.activedRoute.snapshot.paramMap.get('id_Colaborador');
    let usuarioId = sessionData.id_Usuario;

    const next = await firstValueFrom(this.api.getSingleColaborador(colaboradorId));
    this.colaboradores = next;
    
    this.evaluacionForm.setValue({
      'id_Colaborador': colaboradorId,
      'nombres': this.colaboradores.nombres
    })

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

    //Obtiene todas las preguntas a mostrar en la evaluacion
    // this.api.getPreguntaModuloCargo(this.colaboradores.cargo_Id).subscribe(data => {
    //   this.modulosPreguntas = data;
    //   console.log(this.modulosPreguntas);
    // });

    //Obtiene todas las preguntas a mostrar en la evaluacion
    const nextModuloCargo = await firstValueFrom(this.api.getPreguntaModuloCargo(this.colaboradores.cargo_Id));
    this.modulosPreguntas = nextModuloCargo;


    // this.api.getAllModulosPreguntas(sessionData.tipo_Evaluacion_Id).subscribe(data =>{
    //   console.log(data);
    //   //this.modulosPreguntas = data;
    //   //Se filtra los modulos segun el tipo de evaluacion del login
    //   this.modulosPreguntas = data
    //   // this.modulosPreguntas = data.filter
    //   // (
    //   //   modulo => modulo.tipo_Evaluacion_Id === sessionData.tipo_Evaluacion_Id
    //   // );
    //   console.log(this.modulosPreguntas);
      
    // });

  }

  
  // validarCalificacion(event: any, preguntaNumero: number) {
  //   const inputValue = event.target.value;
  //   const validValue = parseFloat(inputValue);
    
  //   if (isNaN(validValue) || validValue < 0 || validValue > 5) {
  //     this.calificacionInvalida[preguntaNumero] = true;
  //   } else {
  //     this.calificacionInvalida[preguntaNumero] = false;
  //     const key = `clfc_Pregunta${preguntaNumero}`;
  //     this.calificacionPregunta[key] = validValue.toString();
  //   }
  // }
  generarCalificacionesPreguntas() {
    for (let i = 1; i <= this.preguntaCount; i++) {
      const key = `clfc_Pregunta${i}`;
      this.calificacionPregunta[key] = 0;


       
      
    }
  }

  actualizarCalificacion(preguntaKey: string, nuevaCalificacion: number) {
    this.calificacionPregunta[preguntaKey] = nuevaCalificacion;
  }

  generarObservacionesPreguntas() {
    for (let i = 1; i <= this.preguntaCount; i++) {
      const key = `Observacion${i}`;
      this.observacionPregunta[key] = 0;
    }
  }

  

  async guardarEvaluacion(estado: string)
  {

    //Se asignan nos numeros de las calificaciones para validacion de que no se envie ninguna respuesta u opcion en el formulario igual a 0
    this.preguntasAMostrar = this.modulosPreguntas.flatMap(moduloPregunta => 
      moduloPregunta.preguntasByEvaluacionModel.map(pregunta => pregunta.numero_Pregunta)
    );    

    const id_Colaborador = this.evaluacionForm.get('id_Colaborador')?.value;
    const id_Usuario = this.usuarioForm.get('id_Usuario')?.value;
    const estadoEvaluacion = estado;

    const evaluacionDto: any = {
      colaborador_id: id_Colaborador,
      usuario_id: id_Usuario,
      estado: estadoEvaluacion
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

    //Se busca las propiedades clfc_Pregunta mediante los registros de preguntasAMostrar 
    const values = this.preguntasAMostrar.map(numeroPregunta => {
      const key = `clfc_Pregunta${numeroPregunta}`;
      return this.calificacionPregunta[key];
    });

    // Verificar si alguno de los valores en calificacionPregunta es 0
    const hasEmptyValues = values.some(value => value === 0);

    if (hasEmptyValues) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Verifique bien sus respuestas, por favor seleccione al menos una opción de calificación',
      });
      return;
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
          await Swal.fire('Gracias', '¡Negfar, agradece tu dedicación en completar la evaluación de desempeño! Valoramos tu tiempo y esfuerzo al proporcionar una evaluación honesta y constructiva.'+
          'Tus observaciones y comentarios son esenciales para el desarrollo profesional de nuestros colaboradores, así mismo tu perspectiva objetiva contribuye al crecimiento continuo de nuestro equipo.', 'success');   
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

  cancelar(){
    this.router.navigate(['evaluacion']);
  }

  // onUserActivity(): void {
  //   this.inactivityService.resetInactivityTimer();
  // }
}
