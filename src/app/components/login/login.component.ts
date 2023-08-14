import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginAuthInterface } from 'src/app/models/loginAuth';
import { ListaProcesosEvalaucion } from 'src/app/models/procesosEvaluacion';
import { ListaRolesInterface } from 'src/app/models/roles';
import { ListaUsuariosInterface } from 'src/app/models/usuarios';
import { ApiService } from 'src/app/services/ApiService';
import { SessionService } from 'src/app/services/SessionService';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor (private router: Router, private api:ApiService, private sessionService: SessionService){}

  ultmProceso: ListaProcesosEvalaucion;
  login: LoginAuthInterface;
  datosUsuario: ListaUsuariosInterface;
  rolUsuario: ListaRolesInterface;

  loginForm = new FormGroup({
    usuario: new FormControl(''),
    password: new FormControl('')
  })

  ngOnInit(): void {
    
    this.api.getUltmProcesoEvaluacion().subscribe(data =>{
      console.log(data);
      this.ultmProceso = data;

      // if(this.ultmProceso.estado === "Activo"){
      //   this.procesoActivo = false;
      //   console.log("ddddddd", this.procesoActivo)
      // }
      // console.log("sss", this.procesoActivo)
    })
    
  }

  async submitForm() {
    if (this.loginForm.valid) {
      const usuario = this.loginForm.get('usuario')?.value;
      const password = this.loginForm.get('password')?.value;

      if (usuario){


        const usuarioString = await firstValueFrom(this.api.getSingleByUsuarioString(usuario));

        this.datosUsuario = usuarioString;


        const rolUsuario = await firstValueFrom(this.api.getSingleRol(this.datosUsuario.rol_Id));
          
        this.rolUsuario = rolUsuario;
        
      
      }

      const loginAuth: any = {
        usuario: usuario,
        password: password,
      };


      console.log("this.datosUsuario",this.datosUsuario)

      console.log("this.rolUsuario",this.rolUsuario)
      
      console.log("ESTADOOOOOOOOOOO",this.ultmProceso)
      if(this.ultmProceso.estado === "Activo" || this.rolUsuario.nombre_Rol == "administrador"){
        this.api.postLoginAuth(loginAuth).subscribe(
          next => {
            console.log('Usuario autenticado', next);
            this.sessionService.saveSession(next);
            this.router.navigate(['inicio']);

          },
          error => {
            console.error('Error verifique los datos', error);

            Swal.fire({
              icon: 'error',
              title: 'Ups!',
              text: 'Verifique los datos ingresados, las credenciales son incorrectas.',
            });

          }
        );
        console.log(loginAuth)
      }
      else{
        console.error('Error verifique los datos');

        Swal.fire({
          icon: 'error',
          title: 'Lo sentimos',
          text: 'El período de evaluación ha terminado',
        });
      }
    }
  }

}
