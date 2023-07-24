import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {  Router } from '@angular/router';
import { ListaUsuariosInterface } from 'src/app/models/usuarios';
import { ApiService } from 'src/app/services/ApiService';
import { InactivitySessionService } from 'src/app/services/InactivitySessionService';
import { SessionService } from 'src/app/services/SessionService';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent implements OnInit{

  constructor (private router: Router, private api:ApiService,
    private sessionService: SessionService, 
    private inactivityService: InactivitySessionService
  ){}
  
  datosUsuario: ListaUsuariosInterface;

  registroForm = new FormGroup({
    usuario: new FormControl(''),
    password: new FormControl(''),
    identificacion: new FormControl('')
  })

  ngOnInit(): void {
    const sessionData = this.sessionService.getSession();
    this.inactivityService.initInactivityTimer();
    if (sessionData == null){
      this.router.navigate(['login']);
    }
  }

  submitForm() {
    if (this.registroForm.valid) {
      const usuario = this.registroForm.get('usuario')?.value;
      const password = this.registroForm.get('password')?.value;
      const identificacion = this.registroForm.get('identificacion')?.value;

      const newUser: any = {
        usuario: usuario,
        password: password,
        identificacion: identificacion
      };

      this.api.postUser(newUser).subscribe(
        next => {
          console.log('Usuario registrado exitosamente');
        },
        error => {
          console.error('Error al registrar usuario', error);
        }
      );
      console.log(newUser)
    }
  }
  
  backListUser(){
    this.router.navigate(['gestion-usuarios/lista-usuarios']);
  }

  onUserActivity(): void {
    this.inactivityService.resetInactivityTimer();
  }
}
