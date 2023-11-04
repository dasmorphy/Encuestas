import { Component, EventEmitter, Output, HostListener, OnInit } from '@angular/core';
import { navbarData } from './nav-data';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { INavbarData, fadeInOut } from './option';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/SessionService';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  animations: 
  [
    fadeInOut
  ]
})
export class SidenavComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;
  multiple: boolean = false;
  opcionesRoles: any;
  currentRole: any = 0;
  loginAuth: any;


  @HostListener('window:resize', ['$event'])
  onResize(event: any){
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768)
    {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})

    }
  }
  linkSesion: string = '';
  sessionData: any;
  constructor (public router: Router, private sessionService: SessionService){}

  //vista se adapate al desplegar el sidebar 
  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    const sessionData = this.sessionService.getSession();
    this.sessionData = sessionData;
    //console.log(sessionData);

    // if (sessionData == null) {
    //   this.router.navigate(['login']);
    // } else {
    //   this.linkSesion = `gestion-usuarios/cambiarPassword/${sessionData.id_Usuario}`
    //   this.currentRole = sessionData.rol_Id; // Asigna el valor de sessionData.rol_Id a currentRole
    //   //console.log("rol2",this.currentRole);
    //   this.navData = this.getMenuOptionsForRole(this.currentRole);
    // }

    const loginAuthString = localStorage.getItem('loginAuth');
    if (loginAuthString) {
      this.loginAuth = JSON.parse(loginAuthString);

      this.linkSesion = `gestion-usuarios/cambiarPassword/${this.loginAuth.id_Usuario}`
      this.currentRole = this.loginAuth.rol_Id; // Asigna el valor de sessionData.rol_Id a currentRole
      //console.log("rol2",this.currentRole);
      this.navData = this.getMenuOptionsForRole(this.currentRole);
    }
    else{
      this.router.navigate(['login']);

    }



  }

  // shouldShowOption(data: INavbarData): any {
  //   console.log(this.currentRole)
  //   return data.rol === this.currentRole || (data.items && data.items.some(subItem => subItem.rol === this.currentRole));
  // }
  

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
  }

  closeSideNav() :void {
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})

  }

  handClick(item: INavbarData): void {
    if(!this.multiple){
      for(let modelItem of this.navData){
        if (item !== modelItem && modelItem.expanded){
          modelItem.expanded = false;
        }
      }
    }
    item.expanded = !item.expanded
  }

  
  getMenuOptionsForRole(roleId: number) {
    //console.log("rol",this.currentRole)
    //console.log("data",this.navData);
    if (roleId === 1) {
      //console.log("data2",this.navData);
      return this.navData;
    } else {
      //console.log("data3",this.navData);
      return this.navData.filter(
        option => 
          option.label === 'Inicio' || option.label === 'Evaluar' || 
          option.label === 'Cambiar contraseña'
      );
    }
  }
  

  getActiveClass(data: INavbarData): string{
    return this.router.url.includes(data.routeLink) ? 'active' : '';
  }

}
