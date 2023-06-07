import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaColaboresInterface } from 'src/app/models/colaboradores';
import { ListaModuloEvaluacionInterface } from 'src/app/models/moduloEvaluacion';
import { ListaPreguntasByEvaluacionInterface } from 'src/app/models/preguntasByEvaluacion';
import { ListaUsuariosInterface } from 'src/app/models/usuarios';
import { ApiService } from 'src/app/services/ApiService';



@Component({
  selector: 'app-evaluacion-colaborador',
  templateUrl: './evaluacion-colaborador.component.html',
  styleUrls: ['./evaluacion-colaborador.component.css']
})
export class EvaluacionColaboradorComponent implements OnInit {
  constructor(private activedRoute: ActivatedRoute, private api:ApiService, private router: Router){}

  preguntaCount = 25; //maximo de calificacion segun el numero de preguntas

  calificacionPregunta:any = {
    calificacionFinal: 0,
  };

  colaboradores: ListaColaboresInterface;
  preguntasByEvaluacion: ListaPreguntasByEvaluacionInterface[];
  modulos: ListaModuloEvaluacionInterface;
  usuario: ListaUsuariosInterface;
  
  evaluacionForm = new FormGroup({
    id_Colaborador: new FormControl(),
    nombres: new FormControl(''),
    apellidos: new FormControl('')

  });

  moduloEvaluacionForm = new FormGroup({
    id_Modulo_Evaluacion: new FormControl(),
    nombre_Modulo: new FormControl(''),
    definicion: new FormControl('')

  });

  usuarioForm = new FormGroup({
    id_Usuario: new FormControl(),
    usuario: new FormControl('')

  });

  ngOnInit(): void {
    this.generarCalificacionesPreguntas();
    let colaboradorId = this.activedRoute.snapshot.paramMap.get('id_Colaborador');
    //let moduloId = this.activedRoute.snapshot.paramMap.get('id_Modulo_Evaluacion');
    let moduloId = 3;
    let usuarioId = 1008;


    this.api.getSingleColaborador(colaboradorId).subscribe(data => {
      this.colaboradores = data
      this.evaluacionForm.setValue({
        'id_Colaborador': colaboradorId,
        'nombres': this.colaboradores.nombres,
        'apellidos': this.colaboradores.apellidos

      })
    });


    this.api.getAllPreguntaByEvaluacion().subscribe(data =>{
      console.log(data);
      this.preguntasByEvaluacion = data;
    });


    this.api.getSingleModulo(moduloId).subscribe(data => {
      this.modulos = data
      this.moduloEvaluacionForm.setValue({
        'id_Modulo_Evaluacion': moduloId,
        'nombre_Modulo': this.modulos.nombre_Modulo,
        'definicion': this.modulos.definicion

      })
      console.warn(data);
    });

    this.api.getSingleUsuario(usuarioId).subscribe(data => {
      this.usuario = data
      this.usuarioForm.setValue({
        'id_Usuario': usuarioId,
        'usuario': this.usuario.usuario

      })
      console.warn(data);
    });
  }

  generarCalificacionesPreguntas() {
    for (let i = 1; i <= this.preguntaCount; i++) {
      const key = `clfc_Pregunta${i}`;
      this.calificacionPregunta[key] = 0;
    }
  }

  guardarEvaluacion()
  {
    //const id_Modulo_Evaluacion = this.moduloEvaluacionForm.get('id_Modulo_Evaluacion')?.value;
    const id_Colaborador = this.evaluacionForm.get('id_Colaborador')?.value;
    const id_Usuario = this.usuarioForm.get('id_Usuario')?.value;


    // const moduloData = this.moduloEvaluacionForm.value;
    // const evaluacionData = this.evaluacionForm.value;

    const formData: any = {
      colaborador_id: id_Colaborador,
      usuario_id: id_Usuario,
      calificacionFinal: this.calificacionPregunta.calificacionFinal
    };


    for (let i = 1; i <= this.preguntaCount; i++) {
      const key = `clfc_Pregunta${i}`;
      formData[key] = this.calificacionPregunta[key];
    }

    this.api.postEvaluacion(formData).subscribe(
      next => {
        console.log('Evaluacion registrada exitosamente');
      },
      error => {
        console.error('Error al registrar Evaluacion', error);
      }
      
    );

    console.log(formData);
  }

  // formatNumber(input: HTMLInputElement | null) {
  //   if (input) {
  //     // Eliminar cualquier caracter que no sea un dígito
  //     let number = input.value.replace(/[^0-9]/g, '');
    
  //     // Dividir los dos primeros dígitos por un punto y mantener los dos decimales
  //     let formattedNumber = number.substr(0, 2) + '.' + number.substr(2, 2);
    
  //     // Asignar el número formateado de vuelta al campo de entrada
  //     input.value = formattedNumber;
  //   }
  // }
}
