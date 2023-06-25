import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ListaUsuariosInterface } from '../../../models/usuarios';
import { ApiService } from '../../../services/ApiService';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})

export class EditarUsuarioComponent implements OnInit {

  constructor (private activedRoute: ActivatedRoute, private router: Router, private api:ApiService){}

  datosUsuario: ListaUsuariosInterface;
 
  editForm = new FormGroup({
    id_Usuario: new FormControl(''),
    usuario: new FormControl(''),
    password: new FormControl(''),
    identificacion: new FormControl(''),

  })

  ngOnInit(): void {
    let usuarioId = this.activedRoute.snapshot.paramMap.get('id_Usuario');
    this.api.getSingleUsuario(usuarioId).subscribe(data => {
      this.datosUsuario = data
      this.editForm.setValue({
        'id_Usuario': usuarioId,
        'usuario': this.datosUsuario.usuario,
        'password': this.datosUsuario.password,
        'identificacion': this.datosUsuario.identificacion
      })
    });
  }

  updateUser(editForm: any){
    // console.log(editForm)

    this.api.updateUser(editForm).subscribe(data => {  })
  }

  backListUser(){
    this.router.navigate(['gestion-usuarios/lista-usuarios']);
  }

}
