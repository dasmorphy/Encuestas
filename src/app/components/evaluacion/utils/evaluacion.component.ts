import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/ApiService'
import { Router } from "@angular/router";
import { ListaColaboresInterface } from "../../../models/colaboradores";


@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css']
})
export class EvaluacionComponent implements OnInit {
  
  colaboradores: ListaColaboresInterface[];
  constructor(private api:ApiService, private router: Router){}

  ngOnInit(): void {
    this.api.getAllColaboradores().subscribe(data =>{
      this.colaboradores = data;
    })
  }

  evaluacionColaborador(id: number)
  {
    this.router.navigate(['evaluacion-colaborador', id]);
    console.log(id);
  }
}
