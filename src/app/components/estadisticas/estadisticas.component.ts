import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/ApiService';
import Chart from 'chart.js/auto';
import { firstValueFrom } from 'rxjs';
import { ListaColaboresInterface } from 'src/app/models/colaboradores';
import  ChartDataLabels  from "chartjs-plugin-datalabels";

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  constructor(private api:ApiService){}
  colaboradores: ListaColaboresInterface[];

  //Variables del grafico
  dataNoEvaluado: number= 0;
  dataEvaluado: number= 0;
  dataBorrador: number= 0;

  async ngOnInit() {
    Chart.register(ChartDataLabels);
    let promedioData = await firstValueFrom(this.api.getPromediosEvaluaciones());
    let colaboradoresData = await firstValueFrom(this.api.getAllColaboradores());
    this.colaboradores = colaboradoresData;

    //Obtener los datos para la grafica
    let colaboradoresEvaluados = colaboradoresData.filter(
      colaborador => colaborador.estado === "Evaluado"
    ).length;

    let colaboradoresNoEvaluados = colaboradoresData.filter(
      colaborador => colaborador.estado === "No Evaluado"
    ).length;

    let colaboradoresBorrador = colaboradoresData.filter(
      colaborador => colaborador.estado === "Borrador"
    ).length;

    this.dataEvaluado = colaboradoresEvaluados;
    this.dataBorrador = colaboradoresBorrador;
    this.dataNoEvaluado = colaboradoresNoEvaluados;

    let dataColaboradores = {
      labels: [
        'No Evaluados',
        'Evaluados',
        'Borrador'
      ],
      datasets: [{
        label: 'Colaboradores',
        data: [this.dataNoEvaluado, this.dataEvaluado, this.dataBorrador],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    };

    const dataPromedios = {
      labels: [
        'Orientación al Servicio',
        'Trabajo en Equipo',
        'Orientación a los Resultados',
        'Diversidad e Inclusión',
        'Pensamiento Creativo',
        'Liderazgo',
        'Planificacion y Seguimiento',
        'Pensamiento Critico',
        'Responsabilidad',
        'PensamientoAnalitico',
        'Organizacion del Trabajo',
        'Instruccion y Entrenamiento',
        'Asesoria y Ventas'

      ],
      datasets: [{
        label: 'Promedios de Competencias',
        data: [
          promedioData.valueCompetencia1, 
          promedioData.valueCompetencia2, 
          promedioData.valueCompetencia3, 
          promedioData.valueCompetencia4, 
          promedioData.valueCompetencia5,
          promedioData.valueCompetencia6,
          promedioData.valueCompetencia7,
          promedioData.valueCompetencia8,
          promedioData.valueCompetencia9,
          promedioData.valueCompetencia10,
          promedioData.valueCompetencia11,
          promedioData.valueCompetencia12,
          promedioData.valueCompetencia13
        ],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(201, 203, 207)',
          'rgb(54, 162, 235)',
          'green',
          'rgb(109, 116, 118)',
          'pink',
          'rgb(181, 0, 184)',
          'rgb(129, 93, 26)',
          'rgb(58, 101, 108)',
          'rgb(197, 120, 120)',
          'rgb(49, 247, 244)'
        ],
      }]
    };
    const etiquetasNumeros = dataPromedios.labels.map(label => parseFloat(label));

    new Chart("colaboradores", {
      type: 'pie',
      data: dataColaboradores,
      options:{
        responsive: false,
        plugins: {
          title: {
            display: true,
            text: 'Colaboradores',
            font: {weight: 'bold'}
          },
          datalabels: {
            anchor: 'end',
            align: 'top',
            formatter: Math.round,
            font: {
                weight: 'bold',
                size: 16
            }
          }
        }
      }
    });

    // new Chart("promedios", {
    //   type: 'polarArea',
    //   data: dataPromedios,
    //   options: {
    //     responsive: false,
    //     plugins: {
    //       legend: {
    //         display: false
    //       },
    //       title: {
    //         display: true,
    //         text: 'Promedios por Competencia',
    //         font: {weight: 'bold'}
    //       },
    //       datalabels: {
    //         display: true,
    //         anchor: 'end',
    //         align: 'top',
    //         formatter: Math.round,
    //         font: {
    //             weight: 'bold',
    //             size: 16
    //         }
    //       }
    //     }
    //   }
    // });


    new Chart("promedios", {
      type: 'bar',
      data: dataPromedios,
      options: {
        responsive: true,
        scales: {
          y: {
            type: 'linear',
            max: 6.0,
            beginAtZero: true,
            ticks: {
              callback: function (value, index, values) {
                // Formatea las etiquetas como números decimales
                return (Math.round(index).toFixed(2))
              }
            }
            
          }
        },
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Promedios por Competencia',
            font: {weight: 'bold'},
            position: "top"
          },
          datalabels: {
            display: true,
            anchor: 'end',
            align: 'top',
            formatter: (value, context) => {
              return (value).toFixed(2);
            },            
            font: {
              weight: 'bold',
              size: 16
            }
          }
        }
      }
    });




  }




}
