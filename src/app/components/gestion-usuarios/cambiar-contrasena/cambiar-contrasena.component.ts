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
 
  editForm = new FormGroup({
    id_Usuario: new FormControl(''),
    usuario: new FormControl(''),
    password: new FormControl(''),
    identificacion: new FormControl('')

  })

  ngOnInit(): void {
    let usuarioId = this.activedRoute.snapshot.paramMap.get('id_Usuario');
    this.api.getSingleUsuario(usuarioId).subscribe(data => {
      this.datosUsuario = data
      this.editForm.setValue({
        'id_Usuario': usuarioId,
        'usuario': this.datosUsuario.usuario,
        'password': this.datosUsuario.password,
        'identificacion': this.datosUsuario.identificacion,
      })
    });

    
    
  }

  async updateUser(editForm: any){
    // console.log(editForm)
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
      await Swal.fire('Ok', 'Cambio de contraña exitoso', 'success');
      this.router.navigate(['gestion-usuarios/lista-usuarios']);
    }
  }

  backListUser(){
    this.router.navigate(['gestion-usuarios/lista-usuarios']);
  }
}
