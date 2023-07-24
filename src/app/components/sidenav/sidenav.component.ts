import { Component, EventEmitter, Output, HostListener, OnInit } from '@angular/core';
import { navbarData } from './nav-data';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { INavbarData, fadeInOut } from './option';
import { Router } from '@angular/router';

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
  currentRole: any = null;

  @HostListener('window:resize', ['$event'])
  onResize(event: any){
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768)
    {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})

    }
  }

  constructor (public router: Router){}

  //vista se adapate al desplegar el sidebar 
  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    // this.navData = this.getMenuOptionsForRole(3);
    this.navData = this.getMenuOptionsForRole(this.currentRole);
  }

  shouldShowOption(data: INavbarData): any {
    return data.rol === this.currentRole || (data.items && data.items.some(subItem => subItem.rol === this.currentRole));
  }
  

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

  getMenuOptionsForRole(role: number): INavbarData[] {
    return this.navData.filter((item) => item.rol === role || (item.items && item.items.some(subItem => subItem.rol === role)));
  }
  

  getActiveClass(data: INavbarData): string{
    return this.router.url.includes(data.routeLink) ? 'active' : '';
  }

}
