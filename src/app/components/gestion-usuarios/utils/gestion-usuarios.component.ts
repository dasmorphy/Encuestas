import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListaUsuariosInterface } from 'src/app/models/usuarios';
import { ApiService } from 'src/app/services/ApiService';


@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements OnInit{

  usuarios: ListaUsuariosInterface[];
  constructor(private api:ApiService, private router: Router){}

  ngOnInit(): void {
    this.router.navigate(['gestion-usuarios/lista-usuarios']);
    this.api.getAllUsuarios().subscribe(data =>{
      this.usuarios = data; 
    })
  }

  editarUsuario(id_usuario: number){
    this.router.navigate(['gestion-usuarios/editar-usuario', id_usuario]);
  }
}
