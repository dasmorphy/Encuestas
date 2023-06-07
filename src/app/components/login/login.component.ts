import { Component} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginAuthInterface } from 'src/app/models/loginAuth';
import { ApiService } from 'src/app/services/ApiService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor (private router: Router, private api:ApiService){}

  login: LoginAuthInterface;

  loginForm = new FormGroup({
    usuario: new FormControl(''),
    password: new FormControl('')
  })

  submitForm() {
    if (this.loginForm.valid) {
      const usuario = this.loginForm.get('usuario')?.value;
      const password = this.loginForm.get('password')?.value;

      const loginAuth: any = {
        usuario: usuario,
        password: password,
      };

      this.api.postLoginAuth(loginAuth).subscribe(
        next => {
          console.log('Usuario autenticado', next);
          this.router.navigate(['inicio']);

        },
        error => {
          console.error('Error verifique los datos', error);
        }
      );
      console.log(loginAuth)
    }
  }

}
