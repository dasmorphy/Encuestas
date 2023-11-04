import { Pipe, PipeTransform } from '@angular/core';
import { ListaColaboresInterface } from 'src/app/models/colaboradores';

@Pipe({
  name: 'searchFilter'
})
export class SearchPipeComponent implements PipeTransform {
  transform(colaboradoresConCargo: any[], searchTerm: string): any[] {
    if (!colaboradoresConCargo || !searchTerm) {
      return colaboradoresConCargo;
    }

    searchTerm = searchTerm.toLowerCase();

    return colaboradoresConCargo.filter(item => {
      const nombreCargo = item.nombreCargo.nombre_Cargo

      return (
        item.colaborador.nombres.toLowerCase().includes(searchTerm) ||
        item.colaborador.cedula.toLowerCase().includes(searchTerm) ||
        item.colaborador.cargo_Colaborador.toLowerCase().includes(searchTerm) ||
        item.colaborador.localidad.toLowerCase().includes(searchTerm) ||
        item.colaborador.cc.toLowerCase().includes(searchTerm) ||
        item.colaborador.zona.toLowerCase().includes(searchTerm) ||
        item.colaborador.area.toLowerCase().includes(searchTerm) ||
        item.colaborador.departamento.toLowerCase().includes(searchTerm) ||
        item.colaborador.cedula_Evaluador.toLowerCase().includes(searchTerm) ||
        item.colaborador.nombres_Evaluador.toLowerCase().includes(searchTerm) ||
        item.colaborador.cargo_Evaluador.toLowerCase().includes(searchTerm) ||
        item.colaborador.estado.toLowerCase().includes(searchTerm) ||
        item.colaborador.grupo.toLowerCase().includes(searchTerm) ||

        nombreCargo?.toLowerCase().includes(searchTerm)
      );
    });
  }
}
