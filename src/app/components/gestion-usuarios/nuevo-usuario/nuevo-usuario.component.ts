import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {  Router } from '@angular/router';
import { ListaRolesInterface } from 'src/app/models/roles';
import { ListaTipoEvaluacionInterface } from 'src/app/models/tipoEvaluacion';
import { ListaUsuariosInterface } from 'src/app/models/usuarios';
import { ApiService } from 'src/app/services/ApiService.service';
//import { InactivitySessionService } from 'src/app/services/InactivitySessionService';
import { SessionService } from 'src/app/services/SessionService';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';
import { ListaCargosInterface } from 'src/app/models/cargos';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent implements OnInit{

  roles: ListaRolesInterface[]; 
  grupos: ListaCargosInterface[];
  tipos: string[] = ["JEFE", "CLIENTE", "EQUIPO"];
  selectedFile: File | null = null;
  fileSelected = false;



  constructor (private router: Router, private api:ApiService,
    private sessionService: SessionService, 
    //private inactivityService: InactivitySessionService
  ){}
  
  datosUsuario: ListaUsuariosInterface;

  registroForm = new FormGroup({
    usuario: new FormControl(''),
    password: new FormControl(''),
    identificacion: new FormControl(''),
    roles: new FormControl('')
  })

  ngOnInit(): void {
    this.api.getAllRoles().subscribe(data =>{
      this.roles = data; 
    })

    this.api.getAllCargo().subscribe(data =>{
      this.grupos = data; 
    })

    
  }

  async submitForm() {
    if (this.registroForm.valid) {
      const usuario = this.registroForm.get('usuario')?.value;
      const password = this.registroForm.get('password')?.value;
      const identificacion = this.registroForm.get('identificacion')?.value;
      const roles = this.registroForm.get('roles')?.value;

      const newUser: any = {
        usuario: usuario,
        password: password,
        identificacion: identificacion,
        rol_Id: roles,
      };

      try
      {
        const result = await Swal.fire({
          title: 'Registro detectado',
          text: "Se guardará al nuevo usuario",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, continuar'
        });
  
        if (result.isConfirmed) {
          this.api.postUser(newUser).subscribe(
            async (response) =>{
              await Swal.fire('Ok', 'Usuario registrado', 'success');
              this.router.navigate(['gestion-usuarios/lista-usuarios']);
            },
            (error) =>{
              if(error.status === 409){
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: `El usuario ${newUser.usuario} ya existe`,
                });
              }
              else{
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'Ha ocurrido un error inesperado, por favor comuníquese con el adminitrador o sistemas',
                });
              }
            }

          );
        }
      }
      catch (error) {
        //console.error('Error al registrar al usuario', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error inesperado, por favor comuníquese con el adminitrador o sistemas',
        });
      }

    }
  }
  
  backListUser(){
    this.router.navigate(['gestion-usuarios/lista-usuarios']);
  }

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
    
    try{

      if (!this.selectedFile) {
        console.error('No se ha seleccionado ningún archivo.');
        return;
      }
  
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
  
      this.api.postUserCsv(formData).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'Ok',
            text: 'Archivo CSV cargado correctamente.',
          });
          // console.log('Archivo CSV enviado correctamente.', formData);
        },
        error => {
          if (error.status === 409){
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: `${error.error}`,
            });
          }
          else{
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ha ocurrido un error inesperado, por favor comuníquese con el adminitrador o sistemas',
            });
          }
        }
      );
    }
    catch{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error inesperado, por favor comuníquese con el adminitrador o sistemas',
      });
    }
    
  }



}
