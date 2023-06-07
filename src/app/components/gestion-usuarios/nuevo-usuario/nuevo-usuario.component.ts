import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {  Router } from '@angular/router';
import { ListaUsuariosInterface } from 'src/app/models/usuarios';
import { ApiService } from 'src/app/services/ApiService';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent {

  constructor (private router: Router, private api:ApiService){}
  datosUsuario: ListaUsuariosInterface;

  registroForm = new FormGroup({
    usuario: new FormControl(''),
    password: new FormControl(''),
    identificacion: new FormControl('')
  })

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
}
