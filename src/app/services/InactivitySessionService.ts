import { Injectable } from '@angular/core';
import { SessionService } from './SessionService';

@Injectable({
  providedIn: 'root'
})
export class InactivitySessionService {
  private inactivityTimeout: any;
  private readonly inactivityDuration = 30 * 60 * 1000; // 30 minutos en milisegundos
  
    //   1000 = 10 segundos
  constructor(private sessionService: SessionService) { }

  // Función para reiniciar el temporizador de inactividad
  resetInactivityTimer(): void {
    clearTimeout(this.inactivityTimeout);
    this.initInactivityTimer();
  }

  // Función para inicializar el temporizador de inactividad
  initInactivityTimer(): void {
    this.inactivityTimeout = setTimeout(() => {
      this.sessionService.logout();//Se cierra la sesion
      console.log('Tiempo de inactividad alcanzado');
    }, this.inactivityDuration);
  }
}
