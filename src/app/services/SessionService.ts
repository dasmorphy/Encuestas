import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionData:{
    id_Usuario: number,
    usuario: string,
    tipo_Evaluacion_Id: number
    cargo_Id: number;
  };
  private isLoggedIn = false;
  
  constructor(private router: Router) { }

  saveSession(data: any): void {
    this.sessionData = data;
  }

  getSession(): any {
    return this.sessionData;
  }

  login() {
    // Lógica para iniciar sesión
    this.isLoggedIn = true;
  }

  logout() {
    // Lógica para cerrar sesión
    this.isLoggedIn = false;
    this.router.navigate(['login']);
  }

  isAuthenticated() {
    return this.isLoggedIn;
  }
}
