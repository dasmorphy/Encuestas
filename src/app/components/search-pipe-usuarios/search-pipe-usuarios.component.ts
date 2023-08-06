import { Pipe, PipeTransform } from '@angular/core';
import { ListaUsuariosInterface } from 'src/app/models/usuarios';


@Pipe({
  name: 'filtroUsuarios'
})
export class SearchPipeUsuariosComponent implements PipeTransform {
  transform(usuarios: ListaUsuariosInterface[], searchTerm: string): ListaUsuariosInterface[] {
    if (!usuarios || !searchTerm) {
      return usuarios;
    }
    
    searchTerm = searchTerm.toLowerCase();

    return usuarios.filter(usuarios => {
      return (
        usuarios.usuario.toLowerCase().includes(searchTerm) ||
        usuarios.identificacion.toLowerCase().includes(searchTerm) ||
        usuarios.grupo.toLowerCase().includes(searchTerm) 
      );
    });
  }
}
