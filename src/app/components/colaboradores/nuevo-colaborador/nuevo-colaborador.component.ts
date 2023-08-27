import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService';
// import { InactivitySessionService } from 'src/app/services/InactivitySessionService';
import { SessionService } from 'src/app/services/SessionService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-colaborador',
  templateUrl: './nuevo-colaborador.component.html',
  styleUrls: ['./nuevo-colaborador.component.css']
})
export class NuevoColaboradorComponent implements OnInit{

  selectedFile: File | null = null;
  fileSelected = false;
  
  constructor(private api:ApiService, private router: Router,
    private sessionService: SessionService, 
    //private inactivityService: InactivitySessionService  
  ){}
  
  // onFileSelected(event: any) {
  //   this.selectedFile = event.target.files[0] as File;
  // }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;

    if (files && files.length > 0) {
      const file = files[0];
      // Verificar si el archivo es de tipo CSV
      if (file.type === 'text/csv') {
        this.fileSelected = true;
        this.selectedFile = file;
      } else {
        // Si no es de tipo CSV, deshabilitar el botón y mostrar un mensaje de error
        this.fileSelected = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El archivo debe ser de tipo CSV.',
        });
      }
    } else {
      this.fileSelected = false;
    }
  }

  uploadCsv(): void {
    if (!this.selectedFile) {
      console.error('No se ha seleccionado ningún archivo.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);

    this.api.postColaborador(formData).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Ok',
          text: 'Archivo CSV cargado correctamente.',
        });
        // console.log('Archivo CSV enviado correctamente.', formData);
      },
      error => {
        console.error('Error al enviar el archivo CSV:', error);
      }
    );
  }
  
  ngOnInit(): void {}

}
