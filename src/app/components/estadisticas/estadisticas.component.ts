import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/ApiService.service';
import Chart from 'chart.js/auto';
import { firstValueFrom } from 'rxjs';
import { ListaColaboresInterface } from 'src/app/models/colaboradores';
import  ChartDataLabels  from "chartjs-plugin-datalabels";
import * as Aos from 'aos';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  chart: Chart;
  chartCalificacionesRol: Chart;

  colaboradores: ListaColaboresInterface[];

  //Variables del grafico
  dataNoEvaluado: number= 0;
  dataEvaluado: number= 0;
  dataBorrador: number= 0;

  //Data total de las calificaciones generales
  dataClfcGenerales: any[];
  //Data que se recibira por pagina
  dataPorPagina: any[];
  labelsPorPagina:any[];

  itemsPorPagina = 4; // Cantidad de elementos por página
  paginaActual = 1; // Página actual
  totalPaginas: number;
  paginas: number[] = []; //paginas a mostrar

  promediosGeneralesData: any;
  labelsPromediosGenerales: any;

  showModal = false;

  dataColaborador: ListaColaboresInterface;

  calificacionPorRol: any;
  showChartCalificacionesRol: boolean = false;

  showLabel:boolean = false;

  calificacionJefe: number;
  calificacionCliente: number;
  calificacionEquipo: number;

  constructor(private api:ApiService){}

  async ngOnInit() {
    Aos.init();
    Chart.register(ChartDataLabels);
    let promedioData = await firstValueFrom(this.api.getPromediosEvaluaciones());
    let colaboradoresData = await firstValueFrom(this.api.getAllColaboradores());
    this.promediosGeneralesData = await firstValueFrom(this.api.getPromediosGenerales());

    this.labelsPromediosGenerales = Object.keys(this.promediosGeneralesData);
    this.dataClfcGenerales = Object.values(this.promediosGeneralesData);

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
          },
          
        },
      }
    });

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

    this.updateChartData();
    this.calcularPaginas();

  }

  

  updateChartData() {
    // Actualiza pagedData con los elementos de la página actual
    const startIndex = (this.paginaActual - 1) * this.itemsPorPagina;
    this.dataPorPagina = this.dataClfcGenerales.slice(startIndex, startIndex + this.itemsPorPagina);
    
    this.labelsPorPagina = this.labelsPromediosGenerales.slice(startIndex, startIndex + this.itemsPorPagina);
    
    // Elimina el gráfico anterior si existe
    if (this.chart) {
      this.chart.destroy();
    }


    this.setupChart(this.dataPorPagina,this.labelsPorPagina);
  }

  setupChart(datos:any[], labels: any[]){
    const data = {
      labels: labels,
      datasets: [{
        axis: 'y',
        label: 'Calificación General',
        data: datos,
        fill: false,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    };


    this.chart = new Chart("calificacionesGenerales", {
      type: 'bar',
      data,
      options: {
        indexAxis: 'y',
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Calificaciones Generales',
            font: {weight: 'bold'},
            position: "top"
          },
        }
      }
    });


  }

  calcularPaginas() {
    const totalElementos = Object.keys(this.promediosGeneralesData).length;
    this.totalPaginas = Math.ceil(totalElementos / this.itemsPorPagina);
    this.paginas = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  onPageChange(pagina: number) {
    this.paginaActual = pagina;
    this.updateChartData();

    //Se aplica la clase btn-primary al boton cuando se cambia de pagina en el paginador
    const paginadorElement = document.querySelectorAll('.botonPag');
    if (paginadorElement) {
      paginadorElement.forEach((element, index) => {
        const buttonText = element.textContent?.trim(); // Usar el operador ?. para evitar null
        if (buttonText === String(pagina)) {
          element.classList.remove('btn-outline-primary');
          element.classList.add('btn-primary');
        } else {
          element.classList.remove('btn-primary');
          element.classList.add('btn-outline-primary');

        }
      });
    }
  }
  
  // Función para avanzar de página
  goToNextPage() {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
      this.updateChartData();
      this.onPageChange(this.paginaActual);
    }
  }

  // Función para retroceder a la página anterior
  goToPreviousPage() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.updateChartData();
      this.onPageChange(this.paginaActual);

    }
  }

  openModal() {
    this.showModal = true;
    document.querySelector('.ventana')?.classList.remove('ventana-close');
  }

  closeModal() {
    this.showModal = false;
    document.querySelector('.ventana')?.classList.add('ventana-close');
  }

  async chartGeneral(event: MouseEvent){
    
    const labels = document.querySelectorAll('.labels')
    let labelsCalificacion: any[];
    let dataCalificacion: any[];

    try{

      const click = this.chart.getElementsAtEventForMode(event, 'nearest', {
        intersect: true
      }, true)

      if (click[0]){
        const dataSet = click[0].datasetIndex;
        const dataPoint = click[0].index;

        this.showModal = true;
  
        this.dataColaborador = await firstValueFrom(this.api.getColaboradorByNombre(this.labelsPorPagina[dataPoint]));
        this.calificacionPorRol = await firstValueFrom(this.api.getPromediosGenerales(this.dataColaborador.cedula));
        let rolColaborador = await firstValueFrom(this.api.getSingleCargo(this.dataColaborador.cargo_Id));

        labelsCalificacion = Object.keys(this.calificacionPorRol);
        dataCalificacion = Object.values(this.calificacionPorRol);
        
        this.calificacionJefe = 0;
        this.calificacionCliente = 0;
        this.calificacionEquipo = 0;

        if (!this.showLabel){
          if (rolColaborador.nombre_Cargo === "Jefaturas"){
            this.calificacionJefe = 40;
            this.calificacionCliente = 40;
            this.calificacionEquipo = 20;
          }
          else if (rolColaborador.nombre_Cargo === "Supervisores"){
            this.calificacionJefe = 50;
            this.calificacionCliente = 25;
            this.calificacionEquipo = 25;
          }
          else if (rolColaborador.nombre_Cargo === "Coordinador"){
            this.calificacionJefe = 60;
            this.calificacionCliente = 40;
          }
          else if (rolColaborador.nombre_Cargo === "Gestor"){
            this.calificacionJefe = 60;
            this.calificacionCliente = 40;
          }
          else if (rolColaborador.nombre_Cargo === "Analista" || rolColaborador.nombre_Cargo === "Vendedor" ||
          rolColaborador.nombre_Cargo === "Auxiliar")
          {
            this.calificacionJefe = 100;
          }
          else if (rolColaborador.nombre_Cargo === "Administrador"){
            this.calificacionJefe = 50;
            this.calificacionEquipo = 50;
          }
        }
          

        if (labelsCalificacion != null && dataCalificacion != null){

          // Elimina el gráfico anterior si existe
          if (this.chartCalificacionesRol) {
            this.chartCalificacionesRol.destroy();
          }

          let data = {
            labels: labelsCalificacion,
            datasets: [{
              label: 'Calificaciones por Rol',
              data: dataCalificacion,
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
              ],
              hoverOffset: 4
            }]
          };
  
          this.chartCalificacionesRol = new Chart("calificacionesColaborador", {
            type: 'bar',
            data,
            options:{
              responsive: true,
              scales: {
                y: {
                  type: 'linear',
                  max: 110,
                }
              },
              plugins: {
                legend: {
                  display: false
                },
                datalabels: {
                  anchor: 'end',
                  align: 'top',
                  font: {
                      weight: 'bold',
                      size: 16
                  },
                  formatter: (value, context) => {
                    return (value).toFixed(2);
                  }, 
                },
                title: {
                  display: true,
                  text: `Calificaciones por Rol: ${this.labelsPorPagina[dataPoint]}`,
                  font: {weight: 'bold'},
                  position: "top"
                },
                
              },
            }
          });
        }
  
      }
    }catch{
      //Se escribe sobre la clase label del html el texto a mostrar
      this.showLabel = true;
      labels.forEach(label => {
        label.innerHTML = 'No se encontraron registros';
      })
    }
  }
    
}
