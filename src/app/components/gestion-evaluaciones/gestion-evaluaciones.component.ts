import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListaEvaluacionesInterface } from 'src/app/models/evaluacion';
import { ListaUsuariosInterface } from 'src/app/models/usuarios';
import { ApiService } from 'src/app/services/ApiService';

@Component({
  selector: 'app-gestion-evaluaciones',
  templateUrl: './gestion-evaluaciones.component.html',
  styleUrls: ['./gestion-evaluaciones.component.css']
})
export class GestionEvaluacionesComponent {
  evaluaciones: ListaEvaluacionesInterface[];
  constructor(private api:ApiService, private router: Router){}

  ngOnInit(): void {
    this.api.getAllEvaluacion().subscribe(data =>{
      console.log(data)
      this.evaluaciones = data; 
    })
  }


}
