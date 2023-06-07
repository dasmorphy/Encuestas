import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {

  @Input() collapsed = false;
  @Input() screenWidth = 0;


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
