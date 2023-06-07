import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/ApiService'
import { Router } from "@angular/router";
import { ListaColaboresInterface } from "../../models/colaboradores";


@Component({
  selector: 'app-colaboradores',
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.css']
})
export class ColaboradoresComponent implements OnInit {
  
  colaboradores: ListaColaboresInterface[];
  constructor(private api:ApiService, private router: Router){}

  ngOnInit(): void {
    this.api.getAllColaboradores().subscribe(data =>{
      console.log(data);
      this.colaboradores = data;
    })
  }
}
