import { Pipe, PipeTransform } from '@angular/core';
import { ListaUsuariosInterface } from 'src/app/models/usuarios';


@Pipe({
  name: 'filtroUsuarios'
})
export class SearchPipeUsuariosComponent implements PipeTransform {
  transform(usuariosConRol: any[], searchTerm: string): any[] {
    if (!usuariosConRol || !searchTerm) {
      return usuariosConRol;
    }
    
    searchTerm = searchTerm.toLowerCase();

    return usuariosConRol.filter(item => {

      const tipoUsuario = item.rolUsuario.nombre_Rol;

      return (
        item.usuario.usuario.toLowerCase().includes(searchTerm) ||
        item.usuario.identificacion.toLowerCase().includes(searchTerm) ||
        tipoUsuario.toLowerCase().includes(searchTerm)
      );
    });
  }
}
