import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaUsuariosInterface } from 'src/app/models/usuarios';
import { ApiService } from 'src/app/services/ApiService';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.css']
})
export class CambiarContrasenaComponent {
  constructor (private activedRoute: ActivatedRoute, private router: Router, private api:ApiService){}

  datosUsuario: ListaUsuariosInterface;
  inputVacio: string = '';
 
  editForm = new FormGroup({
    id_Usuario: new FormControl(''),
    usuario: new FormControl(''),
    password: new FormControl(''),
    identificacion: new FormControl(''),
    rol_id: new FormControl()  
  })

  ngOnInit(): void {
    let usuarioId = this.activedRoute.snapshot.paramMap.get('id_Usuario');
    this.api.getSingleUsuario(usuarioId).subscribe(data => {
      this.datosUsuario = data
      this.editForm.setValue({
        'id_Usuario': usuarioId,
        'usuario': '',
        'password': '',
        'identificacion': '',
        'rol_id': this.datosUsuario.rol_Id
      })
    });

    
    
  }

  async updateUser(editForm: any){
    // console.log(editForm)
    try{
      const result = await Swal.fire({
        title: '¿Está seguro de continuar?',
        text: "Se realizará un cambio de contraseña",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, actualizar contraseña'
      });
      
      if (result.isConfirmed) {
        const next = await firstValueFrom(this.api.updateUser(editForm));
        await Swal.fire('Ok', 'Cambio de contraseña exitoso', 'success');
        this.router.navigate(['inicio']);
      }
    }catch(error){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error inesperado, por favor comuníquese con el adminitrador o sistemas',
      });
    }
    
  }

  backListUser(){
    this.router.navigate(['gestion-usuarios/lista-usuarios']);
  }
}
