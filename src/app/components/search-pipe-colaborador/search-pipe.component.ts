import { Pipe, PipeTransform } from '@angular/core';
import { ListaColaboresInterface } from 'src/app/models/colaboradores';

@Pipe({
  name: 'searchFilter'
})
export class SearchPipeComponent implements PipeTransform {
  transform(colaboradores: ListaColaboresInterface[], searchTerm: string): ListaColaboresInterface[] {
    if (!colaboradores || !searchTerm) {
      return colaboradores;
    }

    searchTerm = searchTerm.toLowerCase();

    return colaboradores.filter(colaborador => {
      return (
        colaborador.nombres.toLowerCase().includes(searchTerm) ||
        colaborador.cedula.toLowerCase().includes(searchTerm) ||
        colaborador.cargo_Colaborador.toLowerCase().includes(searchTerm) ||
        colaborador.localidad.toLowerCase().includes(searchTerm) ||
        colaborador.cc.toLowerCase().includes(searchTerm) ||
        colaborador.zona.toLowerCase().includes(searchTerm) ||
        colaborador.area.toLowerCase().includes(searchTerm) ||
        colaborador.departamento.toLowerCase().includes(searchTerm) ||
        colaborador.cedula_Evaluador.toLowerCase().includes(searchTerm) ||
        colaborador.nombres_Evaluador.toLowerCase().includes(searchTerm) ||
        colaborador.cargo_Evaluador.toLowerCase().includes(searchTerm) ||
        colaborador.estado.toLowerCase().includes(searchTerm)
      );
    });
  }
}
