import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mostrarSidenav = true; // Mostrar Sidenav de forma predeterminada
  constructor(private route: ActivatedRoute) {}

  // Método para determinar si se debe mostrar el Sidenav en la página actual
  shouldShowSidenav(): boolean {
    // Verifica la URL actual para determinar si el Sidenav debe mostrarse o no
    return !window.location.href.includes('login');
  }

  title = 'Encuestas';

  isSideNavCollapsed = false;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle): void {
    this.isSideNavCollapsed = data.collapsed;
    this.screenWidth = data.screenWidth;
  }

  // Se excluye al login del componente body
  shouldShowBody(): boolean {
    return !window.location.href.includes('login');
  }
}
