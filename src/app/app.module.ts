import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BodyComponent } from './components/body/body.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ColaboradoresComponent } from './components/colaboradores/colaboradores.component';
import { SublevelMenuComponent } from './components/sidenav/sublevel-menu.component';
import { LoginComponent } from './components/login/login.component';
import { GestionUsuariosModule } from './components/gestion-usuarios/gestion-usuarios.module';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EvaluacionModule } from './components/evaluacion/evaluacion.module';
import { EvaluacionComponent } from './components/evaluacion/utils/evaluacion.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    SidenavComponent,
    BodyComponent,
    InicioComponent,
    ColaboradoresComponent,
    SublevelMenuComponent,
    LoginComponent,
    NotFoundComponent,
    //EvaluacionComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    EvaluacionModule,
    CommonModule,
    GestionUsuariosModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
