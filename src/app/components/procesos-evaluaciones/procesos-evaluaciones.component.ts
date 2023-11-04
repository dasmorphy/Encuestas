import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ListaProcesosEvalaucion } from 'src/app/models/procesosEvaluacion';
import { ApiService } from 'src/app/services/ApiService.service';
import { SessionService } from 'src/app/services/SessionService';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-procesos-evaluaciones',
  templateUrl: './procesos-evaluaciones.component.html',
  styleUrls: ['./procesos-evaluaciones.component.css']
})
export class ProcesosEvaluacionesComponent implements OnInit {

  ultmProceso: ListaProcesosEvalaucion;
  estadoProceso: string = '';
  procesoActivo: boolean = true;
  fechaActual = new Date();
  formProceso = new FormGroup({
    fecha_Inicio: new FormControl(''),
    fecha_Fin: new FormControl(''),
    estado: new FormControl('')
  })

  constructor (private router: Router, private api:ApiService){}
  
  ngOnInit(): void {
    
    this.api.getUltmProcesoEvaluacion().subscribe(data =>{
      //console.log(data);
      this.ultmProceso = data;
      this.estadoProceso = data.estado;
      if(this.ultmProceso.estado === "Activo"){
        this.procesoActivo = false;
      }
    })
    
  }

  async abrirPeriodo(){
    
    const fecha_Inicio = this.formProceso.get('fecha_Inicio')?.value;
    const fecha_Fin = this.formProceso.get('fecha_Fin')?.value;
    const estadoProceso = "Activo"


    if (!fecha_Inicio || !fecha_Fin){
      
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor seleccione los dos campos de fecha inicio y fecha fin',
      });
      return;
      
    }


    if (fecha_Inicio != null && fecha_Fin != null){
      if (fecha_Inicio > fecha_Fin){
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La fecha de inicio no puede ser mayor que la fecha fin',
        });
        return;
      }
    }
    
    const newProceso: any = {
      fecha_Inicio: fecha_Inicio,
      fecha_Fin: fecha_Fin,
      estado: estadoProceso,
    };

    try
    {
      const result = await Swal.fire({
        title: 'Registro de período detectado!',
        text: "Se abrirá un nuevo período de evaluación de acuerdo a las fechas indicadas",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, continuar'
      });

      if (result.isConfirmed) {
        const next = await firstValueFrom(this.api.postProcesoEvaluacion(newProceso));
        await Swal.fire('Ok', 'Período de evaluación aperturado', 'success');
        this.router.navigate(['inicio']);
      }
    }
    catch (error) {
      console.error('Error al registrar el período de evaluación', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error inesperado, por favor comuníquese con el adminitrador o sistemas',
      });
    }

  }


  async cerrarPeriodo(id_Proceso:number){
    //console.log(id_Proceso)
    const estadoProceso = "Inactivo";
    const dataProceso = {
      id_Proceso_Evaluacion: id_Proceso,
      estado: estadoProceso
    }

    try
    {
      const result = await Swal.fire({
        title: 'Cierre de proceso detectado!',
        text: "Se cerrará el proceso actual de evaluación",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, continuar'
      });

      if (result.isConfirmed) {
        const next = await firstValueFrom(this.api.updateProcesoEstado(dataProceso));
        await Swal.fire('Ok', 'Proceso de evaluación cerrado', 'success');
        this.router.navigate(['inicio']);
      }
    }
    catch (error) {
      console.error('Error al cerrar el proceso de evaluación', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error inesperado, por favor comuníquese con el adminitrador o sistemas',
      });
    }

    // this.api.updateProcesoEstado(dataProceso).subscribe(data =>{
    //   console.log(data);
    //   //this.ultmProceso = data;
    // })
  }

}
