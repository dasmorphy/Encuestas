import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ListaColaboresInterface } from 'src/app/models/colaboradores';
import { ListaEvaluacionesInterface } from 'src/app/models/evaluacion';
import { ListaUsuariosInterface } from 'src/app/models/usuarios';
import { ApiService } from 'src/app/services/ApiService';
//import { InactivitySessionService } from 'src/app/services/InactivitySessionService';
import { SessionService } from 'src/app/services/SessionService';
import { Columns, Img, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { ListaModuloPreguntasInterface } from 'src/app/models/moduloPreguntas';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';
import { ListaObservacionesInterface } from 'src/app/models/observaciones';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


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
  cargoBDColaborador: number; //CARGO DEL COLABORADOR A NIVEL DE BASES (JEFATURAS, GESTOR, ETC)
  cedulaColaborador: string;
  promediosGeneralesColaborador: any;

  nombreEvaluado: string;
  cargoEvaluado: string;
  evaluacionesConNombres: { evaluacion: ListaEvaluacionesInterface, nombreUsuario: any, nombreColaborador: any }[] = [];
  searchTerm: string = ''; // Término de búsqueda

  estados: string[] = ['Realizada', 'Borrador'];
  rolesEstados: string[] = ['Realizada', 'Borrador'];
  estadosSeleccionados: string[] = [];
  estadosRoles: string[] = [];

  page: number = 1;//pagina inicial para paginacion

  promediosGenerales: any = {};

  constructor(private api:ApiService, private router: Router,
    private http: HttpClient,
    private sessionService: SessionService, 
    //private inactivityService: InactivitySessionService
  ){}

  async ngOnInit(){
    const sessionData = this.sessionService.getSession();
    //this.inactivityService.initInactivityTimer();
    
    // if (sessionData == null){
    //   this.router.navigate(['login']);
    // }


    //Se obtiene los nombres del colaborador y del usuario para que se reflejen en la lista de evaluaciones
    let evalua = await firstValueFrom(this.api.getAllEvaluacion())
    this.evaluacionesData = evalua

    for (const evaluacion of this.evaluacionesData) {
      const nombreUsuario = await firstValueFrom(this.api.getSingleUsuario(evaluacion.usuario_id));
      const nombreColaborador = await firstValueFrom(this.api.getSingleColaborador(evaluacion.colaborador_id));
      this.evaluacionesConNombres.push({ evaluacion, nombreUsuario, nombreColaborador });
    }
  }

  async getNombreUsuario(id_Usuario: number){
    
      const data = await firstValueFrom(this.api.getSingleUsuario(id_Usuario));
      if (data) {
        //console.log("USUARIO", data.usuario);
        return data.usuario;
      } else {
        return 'Usuario no encontrado';
      }
    
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

  toggleEstado(index: number): void {
    const estado = this.estados[index];
    if (this.estadosSeleccionados.includes(estado)) {
      this.estadosSeleccionados = this.estadosSeleccionados.filter(e => e !== estado);
    } else {
      this.estadosSeleccionados.push(estado);
    }
  }

  toggleEstadoRoles(index: number): void {
    const estado = this.rolesEstados[index];
    if (this.estadosRoles.includes(estado)) {
      this.estadosRoles = this.estadosRoles.filter(e => e !== estado);
    } else {
      this.estadosRoles.push(estado);
    }
  }
  
  exportarCalificaciones(): void {
    //console.log(this.estadosSeleccionados);

    if(this.estadosSeleccionados.length === 0)
    {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, seleccione al menos un estado',
      });
    }
    else
    {
      const estadosQuery = this.estadosSeleccionados.join(',');
      const url = `https://localhost:7091/api/evaluacion/exportarEvaluaciones?estadosSeleccionados=${estadosQuery}`;  
      const params = new HttpParams().set('estadosSeleccionados', this.estadosSeleccionados.join(','));
      //console.log(this.estadosSeleccionados);
      //console.log(params)  
      this.http.get(url, {
        responseType: 'blob',
        headers: new HttpHeaders().append('Accept', 'application/octet-stream'),
        params: params // Agregar los parámetros de consulta
      }).subscribe(blobData => {
        const blob = new Blob([blobData], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Evaluaciones.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      });
    }
  }

  calificacionesRoles(): void {
    //console.log(this.estadosRoles);

    if(this.estadosRoles.length === 0)
    {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, seleccione al menos un estado',
      });
    }
    else
    {
      const estadosQuery = this.estadosRoles.join(',');
      const url = `http://localhost:9093/api/evaluacion/detalladoAcumulado?estadosSeleccionados=${estadosQuery}`;  
      const params = new HttpParams().set('estadosSeleccionados', this.estadosRoles.join(','));
      //console.log(this.estadosRoles);
      //console.log(params)  
      this.http.get(url, {
        responseType: 'blob',
        headers: new HttpHeaders().append('Accept', 'application/octet-stream'),
        params: params // Agregar los parámetros de consulta
      }).subscribe(blobData => {
        const blob = new Blob([blobData], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Evaluaciones_Roles.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      });
    }
  }

  BotonDesactivado(colaborador: any): boolean {
    return colaborador.estado === 'Borrador';
  }

  visualizarEvaluacion(id_Colaborador: number, usuarioId: number, id_Evaluacion: number){
    this.api.getSingleEvaluacion(id_Colaborador, usuarioId).subscribe(data => { 
      this.evaluaciones = data;
      //console.log(data);
  
      this.api.getObservacionByEvaluacion(id_Evaluacion).subscribe((dataObservacion: any) => {
        this.observaciones = dataObservacion;
        //console.log("observaciones", this.observaciones);
  
        const datosParaVista = {
          evaluaciones: data,
          rutaListaEvaluacion: true,
          observaciones: this.observaciones
        };
  
        //console.log("datosParaVista", datosParaVista);
  
        // Preparar los extras de navegación con el objeto de datos
        const navigationExtras: NavigationExtras = {
          state: datosParaVista
        };
        
        //console.log("navigationExtras", navigationExtras);
  
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
      //console.log(data);
    })
  }

  async getObservacion(id_Evaluacion:number) {
    this.api.getObservacionByEvaluacion(id_Evaluacion).subscribe((data: any) => {
      // Si data es un objeto JSON, conviértelo en un arreglo de un solo elemento
      const dataArray = Array.isArray(data) ? data : [data];
  
      this.observaciones = dataArray;
      //console.log("Data Observaciones PDF", this.observaciones);
    });
  }

  async getPromediosGenerales(cedulaColaborador:string) {
    this.api.getPromediosEvaluaciones(cedulaColaborador).subscribe((data: any) => {  
      this.promediosGeneralesColaborador = data;
    });
  }
  
  /*
    autor: Daniel Males
    since: 25-06-2023
    version: 1.0 
    -Funcion que realiza la impresion de las evaluaciones en pdf

    autor: Daniel Males
    since: 09-10-2023
    version: 1.1 
    -Se agrega parametros para la funcionalidad de imprimir evaluacion general
    params: cedulaColaborador

  */
  async imprimirPdf(id_Colaborador: number, usuarioId: number, accion?: string){
    PdfMakeWrapper.setFonts(pdfFonts);
    const pdf = new PdfMakeWrapper();
    
    // Leer la imagen como dataURL
    let imagenLogo = '../../../assets/img/logo.png';
    let lineaFirma =  '../../../assets/img/Linea_Firma.png';

    this.api.getSingleColaborador(id_Colaborador).subscribe(data => { 
      this.nombreEvaluado = data.nombres;
      this.cargoEvaluado = data.cargo_Colaborador;
      this.nombreEvaluador = data.nombres_Evaluador;
      this.cargoEvaluador = data.cargo_Evaluador;
      this.cargoBDColaborador = data.cargo_Id;
      
      if (accion){
        this.cedulaColaborador = data.cedula;
      }

    });
    console.log("COLABORADOOOOOOR",this.cedulaColaborador);
    await this.getEvaluacion(id_Colaborador, usuarioId);
    await this.obtenerDatosUsuario(usuarioId);
    await this.getModulosPreguntasByCargo(this.cargoBDColaborador);
    await this.getObservacion(this.evaluaciones[0].id_Evaluacion);
    await this.getPromediosGenerales(this.cedulaColaborador);

    if (accion){
      this.promediosGenerales = {
        valueCompetencia1: 'Orientación al Servicio',
        valueCompetencia2: 'Trabajo en Equipo',
        valueCompetencia3: 'Orientación a los Resultados',
        valueCompetencia4: 'Diversidad e Inclusión',
        valueCompetencia5: 'Pensamiento creativo e innovador',
        valueCompetencia6: 'Liderazgo',
        valueCompetencia7: 'Planificación, seguimiento y control',
        valueCompetencia8: 'Pensamiento crítico para la toma de decisiones',
        valueCompetencia9: 'Responsabilidad',
        valueCompetencia10: 'Pensamiento Analítico',
        valueCompetencia11: 'Organización del trabajo',
        valueCompetencia12: 'Instrucción y Entrenamiento',
        valueCompetencia13: 'Asesoría y Ventas'
      };
    }
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
          new Txt('Escala de calificaciones').alignment('center').color('white').italics().end, // Establece el ancho de la celda a '*'
        ],
      ]).widths(['*']).heights([20]).layout({
        paddingTop: () =>10,
        fillColor: (rowIndex) => (rowIndex === 0 ? '#3f60a8' : '#ffffff')
      }).end,
      new Table([
        [
          new Txt('Por debajo de lo esperado').color('black').fontSize(10).alignment('center').end,
          new Txt('Apenas cumple con lo esperado').color('black').fontSize(10).alignment('center').end,
          new Txt('Cumple dentro de lo esperado').color('black').fontSize(10).alignment('center').end,
          new Txt('Supera las expectativas').color('black').fontSize(10).alignment('center').end,
          new Txt('Excepcional').color('black').fontSize(10).alignment('center').end,
        ],
        [
          new Txt('No alcanza los estándares mínimos esperados del puesto.').color('black').fontSize(10).alignment('center').end,
          new Txt('En algunas ocasiones no alcanza los parámetros establecidos; requiere iniciar un plan de mejoramiento.').color('black').fontSize(10).alignment('center').end,
          new Txt('Cumple dentro de lo esperado con los compromisos y exigencias establecidas para el cargo.').color('black').fontSize(10).alignment('center').end,
          new Txt('Excede de manera parcial o temporal los resultados esperados del cargo.').color('black').fontSize(10).alignment('center').end,
          new Txt('Sobrepasa de manera visible, evidente, y consistente los resultados del puesto.').color('black').fontSize(10).alignment('center').end,
        ],
      ]).widths(['*', '*', '*', '*', '*']).end,

      new Txt('         ').end,
      new Txt('         ').end,

      new Table([
        [
          new Txt('Competencias a Evaluar').color('white').alignment('center').fontSize(15).end,
          new Txt('Valoración').color('white').alignment('center').fontSize(15).end,
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
      pdf.add([
        new Txt('         ').end,
        new Table([
          [new Txt(modulosPreguntas.nombre_Modulo).color('white').end],
        ]).widths(['*', 50, '*']).layout({
          fillColor: (rowIndex) => (rowIndex === 0 ? '#3f60a8' : '#ffffff'), // Color de fondo de la tabla
        }).end,

        new Table([
          [new Txt(modulosPreguntas.definicion).color('white').end],
        ]).widths(['*']).layout({
          fillColor: (rowIndex) => (rowIndex === 0 ? '#c91877' : '#ffffff'), // Color de fondo de la tabla
        }).end
      ]);
      // Crear una matriz para almacenar las preguntas y calificaciones
      const tableContent = [];
      //console.log("OBSERVACIONES PRUEBAS",this.observaciones[0]);
      for (const preguntas of modulosPreguntas.preguntasByEvaluacionModel) {
        const row = [];
    
        // Agregar la pregunta en la primera columna
        row.push(preguntas.pregunta);
        
        let key: any;
        let calificacion: any;
        console.log(this.promediosGeneralesColaborador);
        //Se agrega logica para calificaciones individuales y generales
        if (modulosPreguntas.nombre_Modulo === this.promediosGenerales.valueCompetencia1){
          calificacion = this.promediosGeneralesColaborador.valueCompetencia1;
          console.log("ENTRO CONDICIONAL");
        }
        else if(modulosPreguntas.nombre_Modulo === this.promediosGenerales.valueCompetencia2){
          calificacion = this.promediosGeneralesColaborador.valueCompetencia2;
        }
        else if(modulosPreguntas.nombre_Modulo === this.promediosGenerales.valueCompetencia3){
          calificacion = this.promediosGeneralesColaborador.valueCompetencia3;

        }
        else if(modulosPreguntas.nombre_Modulo === this.promediosGenerales.valueCompetencia4){
          calificacion = this.promediosGeneralesColaborador.valueCompetencia4;

        }
        else if(modulosPreguntas.nombre_Modulo === this.promediosGenerales.valueCompetencia5){
          calificacion = this.promediosGeneralesColaborador.valueCompetencia5;

        }
        else if(modulosPreguntas.nombre_Modulo === this.promediosGenerales.valueCompetencia6){
          calificacion = this.promediosGeneralesColaborador.valueCompetencia6;

        }
        else if(modulosPreguntas.nombre_Modulo === this.promediosGenerales.valueCompetencia7){
          calificacion = this.promediosGeneralesColaborador.valueCompetencia7;

        }
        else if(modulosPreguntas.nombre_Modulo === this.promediosGenerales.valueCompetencia8){
          calificacion = this.promediosGeneralesColaborador.valueCompetencia8;

        }
        else if(modulosPreguntas.nombre_Modulo === this.promediosGenerales.valueCompetencia9){
          calificacion = this.promediosGeneralesColaborador.valueCompetencia9;

        }
        else if(modulosPreguntas.nombre_Modulo === this.promediosGenerales.valueCompetencia10){
          calificacion = this.promediosGeneralesColaborador.valueCompetencia10;

        }
        else if(modulosPreguntas.nombre_Modulo === this.promediosGenerales.valueCompetencia11){
          calificacion = this.promediosGeneralesColaborador.valueCompetencia11;

        }
        else if(modulosPreguntas.nombre_Modulo === this.promediosGenerales.valueCompetencia12){
          calificacion = this.promediosGeneralesColaborador.valueCompetencia12;

        }
        else if(modulosPreguntas.nombre_Modulo === this.promediosGenerales.valueCompetencia13){
          calificacion = this.promediosGeneralesColaborador.valueCompetencia13;

        }
        else{
          // Agregar la calificación en la segunda columna
          key = `clfc_Pregunta${preguntas.numero_Pregunta}`;
          calificacion = this.evaluaciones[0][key as keyof ListaEvaluacionesInterface];

        }
        console.log("KEY",key);
        console.log("calificacion",calificacion);


        //Se muestran la clasificacion de la calificacion en base a la escala del 1 al 5
        if (calificacion == 0){
          calificacion = "";
        }
        else if (calificacion >= 1 && calificacion <= 1.99){
          calificacion = "Por debajo de lo esperado";
        }
        else if (calificacion >= 2 && calificacion <= 2.99)
        {
          calificacion = "Apenas cumple con lo esperado";
        }
        else if (calificacion >= 3 && calificacion <= 3.99)
        {
          calificacion = "Cumple dentro de lo esperado";
        }
        else if (calificacion >= 4 && calificacion <= 4.99)
        {
          calificacion = "Supera las expectativas";
        }
        else if (calificacion == 5)
        {
          calificacion = "Excepcional";
        }

        const keyObservacion: string = `observacion${preguntas.numero_Pregunta}`;
        let observacion:any = "";

        if (!accion){
          observacion = this.observaciones[0][keyObservacion as keyof ListaObservacionesInterface];
        }

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

    let calificacionFinal = this.evaluaciones[0].calificacionFinal;
    let calificacionMax = 5; //calificacion maxima en base a la suma de las tres competencias

    let valoracionFinal: string = "";
    let valoracionJefe: string = "";
    let valoracionCliente: string = "";
    let valoracionEquipo: string = "";

    
    if (calificacionFinal === undefined) {
      calificacionFinal = 0; // Asigna un valor predeterminado si es undefined
    } else if (calificacionFinal >= 1 && calificacionFinal <= 1.99) {
      valoracionFinal = "Por debajo de lo esperado";
    } else if (calificacionFinal >= 2 && calificacionFinal <= 2.99) {
      valoracionFinal = "Apenas cumple con lo esperado";
    } else if (calificacionFinal >= 3 && calificacionFinal <= 3.99) {
      valoracionFinal = "Cumple dentro de lo esperado";
    } else if (calificacionFinal >= 4 && calificacionFinal <= 4.99) {
      valoracionFinal = "Supera las expectativas";
    } else if (calificacionFinal == 5) {
      valoracionFinal = "Excepcional";
    }

    let porcentajeCalificacion = (calificacionFinal / calificacionMax) * 100; 
    let porcentajeRedondeado = Math.floor(porcentajeCalificacion); //se quitan los decimales del porcentaje

    //Asignacion de valoraciones para evaluaciones acumuladas y/o generales
    if (accion){
      porcentajeRedondeado = this.promediosGeneralesColaborador.valueFinal;
      let clfcJefe = this.promediosGeneralesColaborador.valueJefe
      let clfcCliente = this.promediosGeneralesColaborador.valueCliente
      let clfcEquipo =this.promediosGeneralesColaborador.valueEquipo

      if (porcentajeRedondeado || clfcJefe || clfcCliente || clfcEquipo === undefined) { // Asigna un valor predeterminado si es undefined
        porcentajeRedondeado = 0;
        clfcJefe = 0;
        clfcCliente = 0; 
        clfcEquipo = 0; 
      } else if (porcentajeRedondeado || clfcJefe || clfcCliente || clfcEquipo >= 20 && porcentajeRedondeado || clfcJefe || clfcCliente || clfcEquipo <= 39.99) {
        valoracionFinal = "Por debajo de lo esperado";
        valoracionJefe = "Por debajo de lo esperado";
        valoracionCliente = "Por debajo de lo esperado";
        valoracionEquipo = "Por debajo de lo esperado";

      } else if (porcentajeRedondeado || clfcJefe || clfcCliente || clfcEquipo >= 40 && porcentajeRedondeado || clfcJefe || clfcCliente || clfcEquipo <= 59.99) {
        valoracionFinal = "Apenas cumple con lo esperado";
        valoracionJefe = "Apenas cumple con lo esperado";
        valoracionCliente = "Apenas cumple con lo esperado";
        valoracionEquipo = "Apenas cumple con lo esperado";
      } else if (porcentajeRedondeado || clfcJefe || clfcCliente || clfcEquipo >= 60 && porcentajeRedondeado || clfcJefe || clfcCliente || clfcEquipo <= 79.99) {
        valoracionFinal = "Cumple dentro de lo esperado";
        valoracionJefe = "Cumple dentro de lo esperado";
        valoracionCliente = "Cumple dentro de lo esperado";
        valoracionEquipo = "Cumple dentro de lo esperado";
      } else if (porcentajeRedondeado || clfcJefe || clfcCliente || clfcEquipo >= 80 && porcentajeRedondeado || clfcJefe || clfcCliente || clfcEquipo <= 99.99) {
        valoracionFinal = "Supera las expectativas";
        valoracionJefe = "Supera las expectativas";
        valoracionCliente = "Supera las expectativas";
        valoracionEquipo = "Supera las expectativas";
      } else if (porcentajeRedondeado || clfcJefe || clfcCliente || clfcEquipo == 100) {
        valoracionFinal = "Excepcional";
        valoracionJefe = "Excepcional";
        valoracionCliente = "Excepcional";
        valoracionEquipo = "Excepcional";
      }


      pdf.add([

        new Txt('         ').end,
        new Txt('         ').end,

        new Table([
          [
            new Txt('Valoración Jefe: ').bold().color('black').fontSize(10).end,
            new Txt(`${clfcJefe}%`).color('black').fontSize(10).end,
            new Txt(valoracionJefe).color('black').fontSize(10).end,
          ]
        ]).widths([220, 100, '*']).end,

        new Table([
          [
            new Txt('Valoración Cliente: ').bold().color('black').fontSize(10).end,
            new Txt(`${clfcCliente}%`).color('black').fontSize(10).end,
            new Txt(valoracionCliente).color('black').fontSize(10).end,
          ]
        ]).widths([220, 100, '*']).end,

        new Table([
          [
            new Txt('Valoración Equipo: ').bold().color('black').fontSize(10).end,
            new Txt(`${clfcEquipo}%`).color('black').fontSize(10).end,
            new Txt(valoracionEquipo).color('black').fontSize(10).end,
          ]
        ]).widths([220, 100, '*']).end,

        new Table([
          [
            new Txt('Valoración Final: ').bold().color('black').fontSize(10).end,
            new Txt(`${porcentajeRedondeado}%`).color('black').fontSize(10).end,
            new Txt(valoracionFinal).color('black').fontSize(10).end,
          ]
        ]).widths([220, 100, '*']).end
      ]);

    }else{
      pdf.add([

        new Txt('         ').end,
        new Txt('         ').end,
  
        new Table([
          [
            new Txt('Valoración Final: ').bold().color('black').fontSize(10).end,
            new Txt(`${porcentajeRedondeado}%`).color('black').fontSize(10).end,
            new Txt(valoracionFinal).color('black').fontSize(10).end,
          ]
        ]).widths([220, 100, '*']).end
      ]);
    }

    pdf.add([
      new Txt('         ').end,
      new Txt('         ').end,
      new Txt('         ').end,
      await new Img(lineaFirma).width(170).height(40).build(),
      new Txt(this.nombreEvaluado).color('black').fontSize(10).end,
      new Txt("Evaluado").bold().color('black').fontSize(10).end,

      new Txt('         ').end,
      new Txt('         ').end,

      await new Img(lineaFirma).width(170).height(40).build(),
      new Txt(this.nombreEvaluador).color('black').fontSize(10).end,
      new Txt("Evaluador").bold().color('black').fontSize(10).end
      
    ]);

    pdf.create().download(`Evaluacion ${this.nombreEvaluado}`);
  }

  // onUserActivity(): void {
  //   this.inactivityService.resetInactivityTimer();
  // }

}
