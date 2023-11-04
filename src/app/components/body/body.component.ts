import { Component, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
/*
  autor: Daniel Males
  since: 11-10-2023
  version: 1.1
  -Se agrega contructor para el cambio del height al body cuando la ruta se encuentra en estadisticas

  autor: Daniel Males
  since: 17-10-2023
  version: 1.2
  -Se agrega la ruta de nuevo usuario para establecer la clase body-sin-height
*/
export class BodyComponent {

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  constructor(private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const bodyElement = document.querySelector('.body');
        if (bodyElement) {
          if (event.url === "/estadisticas" || event.url === "/gestion-usuarios/nuevo-usuario") {
            bodyElement.classList.add("body-sin-height");
          } else {
            // Remueve el estilo si no esta en la ruta '/estadisticas'
            bodyElement.classList.remove('body-sin-height');
          }
        }
      }
    });
  }

  // se agregan las validaciones segun el tamaño de la pantalla
  getBodyClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768)
    {
      styleClass = 'body-trimed';
    }
    else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0)
    {
      styleClass = 'body-md-screen';
    }

    return styleClass;
  }
}
