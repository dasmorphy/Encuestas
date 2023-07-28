import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {  Router } from '@angular/router';
import { ListaRolesInterface } from 'src/app/models/roles';
import { ListaTipoEvaluacionInterface } from 'src/app/models/tipoEvaluacion';
import { ListaUsuariosInterface } from 'src/app/models/usuarios';
import { ApiService } from 'src/app/services/ApiService';
import { InactivitySessionService } from 'src/app/services/InactivitySessionService';
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

  constructor (private router: Router, private api:ApiService,
    private sessionService: SessionService, 
    private inactivityService: InactivitySessionService
  ){}
  
  datosUsuario: ListaUsuariosInterface;

  registroForm = new FormGroup({
    usuario: new FormControl(''),
    password: new FormControl(''),
    identificacion: new FormControl(''),
    roles: new FormControl(''),
    grupos: new FormControl('')
  })

  ngOnInit(): void {
    const sessionData = this.sessionService.getSession();
    this.inactivityService.initInactivityTimer();
    if (sessionData == null){
      this.router.navigate(['login']);
    }

    // this.api.getAllTipoEvaluacion().subscribe(data =>{
    //   console.log(data)
    //   this.tipoEvaluacion = data; 
    // })

    this.api.getAllRoles().subscribe(data =>{
      console.log(data)
      this.roles = data; 
    })

    this.api.getAllCargo().subscribe(data =>{
      console.log(data)
      this.grupos = data; 
    })

    
  }

  async submitForm() {
    if (this.registroForm.valid) {
      const usuario = this.registroForm.get('usuario')?.value;
      const password = this.registroForm.get('password')?.value;
      const identificacion = this.registroForm.get('identificacion')?.value;
      const tipoEvaluacion = this.registroForm.get('tipoEvaluacion')?.value;
      const roles = this.registroForm.get('roles')?.value;
      const grupos = this.registroForm.get('grupos')?.value;


      const newUser: any = {
        usuario: usuario,
        password: password,
        identificacion: identificacion,
        tipo_Evaluacion_Id: tipoEvaluacion,
        rol_Id: roles,
        cargo_Id: grupos
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
          const next = await firstValueFrom(this.api.postUser(newUser));
          await Swal.fire('Ok', 'Usuario registrado', 'success');
          this.router.navigate(['gestion-usuarios/lista-usuarios']);
        }
      }
      catch (error) {
        console.error('Error al registrar al usuario', error);
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

  onUserActivity(): void {
    this.inactivityService.resetInactivityTimer();
  }
}
