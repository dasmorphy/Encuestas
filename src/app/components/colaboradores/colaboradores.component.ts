import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/ApiService'
import { Router } from "@angular/router";
import { ListaColaboresInterface } from "../../models/colaboradores";
// import { InactivitySessionService } from 'src/app/services/InactivitySessionService';
import { SessionService } from 'src/app/services/SessionService';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-colaboradores',
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.css']
})
export class ColaboradoresComponent implements OnInit {
  
  colaboradores: ListaColaboresInterface[];
  estados: string[] = ['Evaluado', 'Borrador', 'No Evaluado'];

  estadosSeleccionados: string[] = [];

  searchTerm: string = ''; // Término de búsqueda

  constructor(private api:ApiService, private router: Router,
    private http: HttpClient,
    private sessionService: SessionService, 
    //private inactivityService: InactivitySessionService  
  ){}

  ngOnInit(): void {

    const sessionData = this.sessionService.getSession();
    //this.inactivityService.initInactivityTimer();
    // if (sessionData == null){
    //   this.router.navigate(['login']);
    // }

    this.api.getAllColaboradores().subscribe(data =>{
      //console.log(data);
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

  exportarEstadosSeleccionados(){
    this.api.getExportarColaboradores(this.estadosSeleccionados).subscribe(data =>{
      // console.log("Corecto ",data);
      //this.colaboradores = data;
    })

    
  }

  toggleEstado(index: number): void {
    const estado = this.estados[index];
    if (this.estadosSeleccionados.includes(estado)) {
      this.estadosSeleccionados = this.estadosSeleccionados.filter(e => e !== estado);
    } else {
      this.estadosSeleccionados.push(estado);
    }
  }
  
  descargarArchivo(): void {
    // console.log(this.estadosSeleccionados);

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
      const url = `https://webappevaluaciones.azurewebsites.net/api/colaborador/exportarColaboradores?estadosSeleccionados=${estadosQuery}`;
  
      //const url = 'https://localhost:7091/api/colaborador/exportarColaboradores';
    
      const params = new HttpParams().set('estadosSeleccionados', this.estadosSeleccionados.join(','));
      // console.log(this.estadosSeleccionados);
      // console.log(params)  
      this.http.get(url, {
        responseType: 'blob',
        headers: new HttpHeaders().append('Accept', 'application/octet-stream'),
        params: params // Agregar los parámetros de consulta
      }).subscribe(blobData => {
        const blob = new Blob([blobData], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Colaboradores.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      });
    }
  }
    
  // onUserActivity(): void {
  //   this.inactivityService.resetInactivityTimer();
  // }

  agregarColaboradores(){
    this.router.navigate(['/nuevosColaboradores']);
    
  }
}
