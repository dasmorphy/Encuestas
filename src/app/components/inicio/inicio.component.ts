import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListaUsuariosInterface } from 'src/app/models/usuarios';
import { ApiService } from 'src/app/services/ApiService';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit{
  usuarios: ListaUsuariosInterface[];
  constructor(private api:ApiService, private router: Router){}

  ngOnInit(): void {
    this.api.getAllUsuarios().subscribe(data =>{
      this.usuarios = data; 
    })
  }
}
