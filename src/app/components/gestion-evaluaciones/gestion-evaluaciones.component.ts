import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ListaColaboresInterface } from 'src/app/models/colaboradores';
import { ListaEvaluacionesInterface } from 'src/app/models/evaluacion';
import { ListaUsuariosInterface } from 'src/app/models/usuarios';
import { ApiService } from 'src/app/services/ApiService';
import { InactivitySessionService } from 'src/app/services/InactivitySessionService';
import { SessionService } from 'src/app/services/SessionService';
import { Columns, Img, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { ListaModuloPreguntasInterface } from 'src/app/models/moduloPreguntas';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';
import { ListaObservacionesInterface } from 'src/app/models/observaciones';


@Component({
  selector: 'app-gestion-evaluaciones',
  templateUrl: './gestion-evaluaciones.component.html',
  styleUrls: ['./gestion-evaluaciones.component.css']
})
export class GestionEvaluacionesComponent implements OnInit{
  datosUsuario: ListaUsuariosInterface;
  modulosPreguntas: ListaModuloPreguntasInterface[];
  evaluacionesData: ListaEvaluacionesInterface[];
  colaborador: ListaColaboresInterface;
  evaluaciones: ListaEvaluacionesInterface[];
  observaciones: ListaObservacionesInterface[];
  nombreEvaluador: string;
  cargoEvaluador: string;
  nombreEvaluado: string;
  cargoEvaluado: string;

  constructor(private api:ApiService, private router: Router,
    private sessionService: SessionService, 
    private inactivityService: InactivitySessionService
  ){}

  ngOnInit(): void {
    const sessionData = this.sessionService.getSession();
    this.inactivityService.initInactivityTimer();
    
    // if (sessionData == null){
    //   this.router.navigate(['login']);
    // }

    this.api.getAllEvaluacionByUsuario(sessionData.id_Usuario).subscribe(data =>{
      console.log(data)
      this.evaluacionesData = data; 
    })
  }

  async reversarEvaluacion(id_Colaborador: number, id_Evaluacion: number) {
    let estadoColaborador = "Borrador";
    let estadoEvaluacion = "Borrador";
    const dataColaborador = {
      id_Colaborador: id_Colaborador,
      estado: estadoColaborador
    };

    const dataEvaluacion = {
      id_Evaluacion: id_Evaluacion,
      estado: estadoEvaluacion
    }

    const result = await Swal.fire({
      title: '¿Está seguro de continuar?',
      text: "Se reversará la evaluación",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, reversar'
    });
    
    if (result.isConfirmed) {
      const colaborador = await firstValueFrom(this.api.updateColaborador(dataColaborador));
      const evaluacion = await firstValueFrom(this.api.updateEvaluacionEstado(dataEvaluacion));
      await Swal.fire('Reversada', 'Evaluación reversada', 'success');
    }
  }

  BotonDesactivado(colaborador: any): boolean {
    return colaborador.estado === 'Borrador';
  }

  visualizarEvaluacion(id_Colaborador: number, usuarioId: number, id_Evaluacion: number){
    this.api.getSingleEvaluacion(id_Colaborador, usuarioId).subscribe(data => { 
      this.evaluaciones = data;
      console.log(data);
  
      this.api.getObservacionByEvaluacion(id_Evaluacion).subscribe((dataObservacion: any) => {
        this.observaciones = dataObservacion;
        console.log("observaciones", this.observaciones);
  
        const datosParaVista = {
          evaluaciones: data,
          rutaListaEvaluacion: true,
          observaciones: this.observaciones
        };
  
        console.log("datosParaVista", datosParaVista);
  
        // Preparar los extras de navegación con el objeto de datos
        const navigationExtras: NavigationExtras = {
          state: datosParaVista
        };
        
        console.log("navigationExtras", navigationExtras);
  
        this.router.navigate(['vistaEvaluacion', id_Colaborador, usuarioId], {state: {datos: navigationExtras}});
      });
    });
  }
  

  async eliminarEvaluacion(id_Evaluacion: number){
    const result = await Swal.fire({
      title: '¿Está seguro de continuar?',
      text: "Se eliminará la evaluación definitivamente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    });
    
    if (result.isConfirmed) {
      const next = await firstValueFrom(this.api.deleteEvaluacion(id_Evaluacion));
      await Swal.fire('Eliminada', 'Evaluación eliminada', 'success');
    }
  }

  async obtenerDatosUsuario(usuarioId: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.api.getSingleUsuario(usuarioId).subscribe(data => { 
        this.datosUsuario = data;
        resolve(); // Resuelve la promesa cuando se reciben los datos
      }, error => {
        reject(error); // Rechaza la promesa en caso de error
      });
    });
  }

  async getModulosPreguntasByCargo(cargo_Id: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.api.getPreguntaModuloCargo(cargo_Id).subscribe(data =>{
        this.modulosPreguntas = data;

        // this.modulosPreguntas = data.filter
        // (
        //   modulo => modulo.tipo_Evaluacion_Id === tipo_Evaluacion_Id
        // );
        resolve(); // Resuelve la promesa cuando se reciben los datos
      }, error => {
        reject(error); // Rechaza la promesa en caso de error
      });
    });
  }

  async getEvaluacion(id_Colaborador: number, usuarioId: number){
    this.api.getSingleEvaluacion(id_Colaborador, usuarioId).subscribe(data =>{ 
      this.evaluaciones = data;
      console.log(data);
    })
  }

  async getObservacion(id_Evaluacion:number) {
    this.api.getObservacionByEvaluacion(id_Evaluacion).subscribe((data: any) => {
      // Si data es un objeto JSON, conviértelo en un arreglo de un solo elemento
      const dataArray = Array.isArray(data) ? data : [data];
  
      this.observaciones = dataArray;
      console.log("Data Observaciones PDF", this.observaciones);
    });
  }
  
  
  async imprimirPdf(id_Colaborador: number, usuarioId: number){
    PdfMakeWrapper.setFonts(pdfFonts);
    const pdf = new PdfMakeWrapper();
    
    // Leer la imagen como dataURL
    let imagenLogo = '../../../assets/img/logo.png'; 

    this.api.getSingleColaborador(id_Colaborador).subscribe(data => { 
      this.nombreEvaluado = data.nombres;
      this.cargoEvaluado = data.cargo_Colaborador;
      this.nombreEvaluador = data.nombres_Jefe;
      this.cargoEvaluador = data.cargo_Jefe;
    });
    
    await this.getEvaluacion(id_Colaborador, usuarioId);
    await this.obtenerDatosUsuario(usuarioId);
    await this.getModulosPreguntasByCargo(this.datosUsuario.cargo_Id);
    await this.getObservacion(this.evaluaciones[0].id_Evaluacion);
    console.log("this.evaluaciones", this.evaluaciones); 
    console.log("this.datosUsuario", this.datosUsuario); 
    console.log("this.modulosPreguntas", this.modulosPreguntas); 

    // Agrega contenido al PDF
    // Dividir el texto del evaluador y el cargo en dos columnas usando Columns
    pdf.add([
      await new Img(imagenLogo).width(50).height(40).build(),
      new Txt('Evaluación de Desempeño').bold().color('black').fontSize(20).alignment('center').end,
      new Txt('         ').end,
      new Txt('         ').end,
      new Table([
        [
          new Txt('Datos del Evaluador').alignment('center').italics().color('white').end, // Establece el ancho de la celda a '*'
        ],
      ]).widths(['*']).heights([20]).layout({
        paddingTop: () =>10,
        fillColor: (rowIndex) => (rowIndex === 0 ? '#3f60a8' : '#ffffff')
      }).end,

      new Table([
        [
          new Txt('Evaluador: ').bold().color('black').fontSize(10).end,
          new Txt(this.nombreEvaluador).color('black').fontSize(10).end,
        ],
        [
          new Txt('Cargo: ').bold().fontSize(10).end,
          new Txt(this.cargoEvaluador).color('black').fontSize(10).end,
        ],
      ]).widths(['*', '*']).end,

      new Txt('         ').end,
      new Txt('         ').end,

      new Table([
        [
          new Txt('Datos del Evaluado').alignment('center').color('white').italics().end, // Establece el ancho de la celda a '*'
        ],
      ]).widths(['*']).heights([20]).layout({
        paddingTop: () =>10,
        fillColor: (rowIndex) => (rowIndex === 0 ? '#3f60a8' : '#ffffff')
      }).end,

      new Table([
        [
          new Txt('Evaluado: ').bold().color('black').fontSize(10).end,
          new Txt(this.nombreEvaluado).color('black').fontSize(10).end,
        ],
        [
          new Txt('Cargo: ').bold().fontSize(10).end,
          new Txt(this.cargoEvaluado).color('black').fontSize(10).end,
        ],
      ]).widths(['*', '*']).end,

      new Txt('         ').end,

      new Table([
        [
          new Txt('Competencias a Evaluar').color('white').alignment('center').fontSize(15).end,
          new Txt('Calificacion').color('white').alignment('center').fontSize(15).end,
          new Txt('Observaciones').color('white').alignment('center').fontSize(15).end,
  
        ],
        
      ]).heights([40]).widths([220,100,'*']).layout({
        paddingTop: () => 20,
        fillColor: (rowIndex) => (rowIndex === 0 ? '#3f60a8' : '#ffffff'), // Color de fondo de la tabla
        paddingBottom: () => 0,
      }).end,

    ]);
    
    pdf.add(new Txt('         ').end);
    
    for (const modulosPreguntas of this.modulosPreguntas) {
      pdf.add(
        new Table([
          [new Txt(modulosPreguntas.nombre_Modulo).color('white').end],
        ]).widths(['*', 50, '*']).layout({
          fillColor: (rowIndex) => (rowIndex === 0 ? '#3f60a8' : '#ffffff'), // Color de fondo de la tabla
        }).end
      );
      // Crear una matriz para almacenar las preguntas y calificaciones
      const tableContent = [];
      console.log("OBSERVACIONES PRUEBAS",this.observaciones[0]);
      for (const preguntas of modulosPreguntas.preguntasByEvaluacionModel) {
        const row = [];
    
        // Agregar la pregunta en la primera columna
        row.push(preguntas.pregunta);
    
        // Agregar la calificación en la segunda columna
        const key = `clfc_Pregunta${preguntas.numero_Pregunta}`;
        const calificacion = this.evaluaciones[0][key as keyof ListaEvaluacionesInterface];

        // const keyObservacion:string = `observacion${preguntas.numero_Pregunta}`;
        // const observacion = this.observaciones[0];

        const keyObservacion: string = `observacion${preguntas.numero_Pregunta}`;
        const observacion = this.observaciones[0][keyObservacion as keyof ListaObservacionesInterface];


        row.push(calificacion);
        row.push(observacion);//CAMPO OBSERVACIONES

    
        // Agregar la fila completa con pregunta y calificación a la matriz
        tableContent.push(row);
      }
    
      // Agregar la tabla con todas las preguntas y calificaciones (sin el encabezado "Calificación")
      pdf.add(
        new Table([
          ...tableContent, // Contenido de la tabla con todas las preguntas y calificaciones
        ]).widths([220, 100, '*']).layout({
          fillColor: (rowIndex) => (rowIndex === 0 ? '' : '#ffffff'),
        }).end
      );
      
    }
    pdf.create().download(`Evaluacion ${this.nombreEvaluado}`);
  }

  onUserActivity(): void {
    this.inactivityService.resetInactivityTimer();
  }

}
