import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroEvaluaciones'
})
export class SearchPipeListaEvaluacionesComponent implements PipeTransform {
  transform(evaluacionesConNombres: any[], searchTerm: string): any[] {
    if (!evaluacionesConNombres || !searchTerm) {
      return evaluacionesConNombres;
    }
    
    const searchTermLower = searchTerm.toLowerCase();

    return evaluacionesConNombres.filter(item => {
      //const evaluacion = item.evaluacion;
      const nombreUsuario = item.nombreUsuario.usuario;
      const nombreColaborador = item.nombreColaborador.nombres;
      const estadoEvaluacion = item.evaluacion.estado;
      return (
        // evaluacion.calificacionFinal?.toString().includes(searchTermLower) ||
        nombreUsuario?.toLowerCase().includes(searchTermLower) ||
        nombreColaborador?.toLowerCase().includes(searchTermLower) ||
        estadoEvaluacion.toLowerCase().includes(searchTermLower)
      );
    });
  }
}
