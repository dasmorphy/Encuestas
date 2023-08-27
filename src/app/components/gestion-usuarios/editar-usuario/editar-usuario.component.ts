import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ListaUsuariosInterface } from '../../../models/usuarios';
import { ApiService } from '../../../services/ApiService';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ListaCargosInterface } from 'src/app/models/cargos';
import { ListaRolesInterface } from 'src/app/models/roles';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})

export class EditarUsuarioComponent implements OnInit {

  constructor (private activedRoute: ActivatedRoute, private router: Router, private api:ApiService){}

  datosUsuario: ListaUsuariosInterface;
  roles: ListaRolesInterface[]; 
  grupos: ListaCargosInterface[];
  tipos: string[] = ["JEFE", "CLIENTE", "EQUIPO"];


  editForm = new FormGroup({
    id_Usuario: new FormControl(''),
    usuario: new FormControl(''),
    password: new FormControl(''),
    identificacion: new FormControl(''),
    rol_Id: new FormControl(),
    //cargo_Id: new FormControl(),
    //grupo: new FormControl('')
  })

  ngOnInit(): void {

    this.api.getAllRoles().subscribe(data =>{
      //console.log(data)
      this.roles = data; 
    })

    this.api.getAllCargo().subscribe(data =>{
      //console.log(data)
      this.grupos = data; 
    })

    let usuarioId = this.activedRoute.snapshot.paramMap.get('id_Usuario');
    this.api.getSingleUsuario(usuarioId).subscribe(data => {
      this.datosUsuario = data
      this.editForm.setValue({
        'id_Usuario': usuarioId,
        'usuario': this.datosUsuario.usuario,
        'password': '',
        'identificacion': this.datosUsuario.identificacion,
        'rol_Id': this.datosUsuario.rol_Id,
        //'cargo_Id': this.datosUsuario.cargo_Id,
        //'grupo': this.datosUsuario.grupo
      })
    });
  }

  async updateUser(editForm: any){
    // console.log(editForm)
    try
      {
        const result = await Swal.fire({
          title: 'Cambio detectado',
          text: "Se actualizará los datos del usuario",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, continuar'
        });
  
        if (result.isConfirmed) {
          const next = await firstValueFrom(this.api.updateUser(editForm));
          await Swal.fire('Ok', 'Usuario actualizado', 'success');
          this.router.navigate(['gestion-usuarios/lista-usuarios']);
        }
      }
      catch (error) {
        //console.error('Error al actualizar al usuario', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error inesperado, por favor comuníquese con el adminitrador o sistemas',
        });
      }
    // this.api.updateUser(editForm).subscribe(data => {  })
  }

  backListUser(){
    this.router.navigate(['gestion-usuarios/lista-usuarios']);
  }

}
