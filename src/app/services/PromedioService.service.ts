import { Injectable } from '@angular/core';
import { ListaPromedios } from '../models/dataPromedios';

@Injectable({
    providedIn: 'root',
})
/*
    autor: Daniel Males
    since: 10-10-2023
    version: 1.0 
    -Servicio que definira la valoracion de jefe, cliente, equipo y calificacion final de las
    -evaluaciones acumuladas
  */
export class PromedioService {

    constructor() { }

    getValoracionPromedio(promediosGeneralesColaborador: ListaPromedios) {

        let valoracionFinal: string = "";
        let valoracionJefe: string = "";
        let valoracionCliente: string = "";
        let valoracionEquipo: string = "";
        let porcentajeRedondeado = promediosGeneralesColaborador.valueFinal;
        let clfcJefe = promediosGeneralesColaborador.valueJefe;
        let clfcCliente = promediosGeneralesColaborador.valueCliente;
        let clfcEquipo = promediosGeneralesColaborador.valueEquipo;
        let valueCargo = promediosGeneralesColaborador.valueCargo;

        console.log("clfcJefe", clfcJefe)
        console.log("clfcCliente", clfcCliente)
        console.log("clfcEquipo", clfcEquipo)
        console.log("porcentajeRedondeado", porcentajeRedondeado)


        if (porcentajeRedondeado === undefined) {
            porcentajeRedondeado = 0;
        } else if (porcentajeRedondeado >= 0 && porcentajeRedondeado <= 39.99) {
            valoracionFinal = "Por debajo de lo esperado";
        }
        else if (porcentajeRedondeado >= 40 && porcentajeRedondeado <= 59.99) {
            valoracionFinal = "Apenas cumple con lo esperado";
        } else if (porcentajeRedondeado >= 60 && porcentajeRedondeado <= 79.99) {
            valoracionFinal = "Cumple dentro de lo esperado";
        } else if (porcentajeRedondeado >= 80 && porcentajeRedondeado <= 99.99) {
            valoracionFinal = "Supera las expectativas";
        } else if (porcentajeRedondeado == 100) {
            valoracionFinal = "Excepcional";
        }


        if (valueCargo === "Jefaturas") {

            //Jefe
            if (clfcJefe >= 0 && clfcJefe <= 9.99) {
                valoracionJefe = "Por debajo de lo esperado";

            }
            else if (clfcJefe >= 10 && clfcJefe <= 19.99) {
                valoracionJefe = "Apenas cumple con lo esperado";

            }
            else if (clfcJefe >= 20 && clfcJefe <= 29.99) {
                valoracionJefe = "Cumple dentro de lo esperado";

            }
            else if (clfcJefe >= 30 && clfcJefe <= 39.99) {
                valoracionJefe = "Supera las expectativas";

            }
            else if (clfcJefe == 40) {
                valoracionJefe = "Excepcional";

            }

            //Cliente
            if (clfcCliente >= 0 && clfcCliente <= 9.99) {
                valoracionCliente = "Por debajo de lo esperado";

            }
            else if (clfcCliente >= 10 && clfcCliente <= 19.99) {
                valoracionCliente = "Apenas cumple con lo esperado";

            }
            else if (clfcCliente >= 20 && clfcCliente <= 29.99) {
                valoracionCliente = "Cumple dentro de lo esperado";

            }
            else if (clfcCliente >= 30 && clfcCliente <= 39.99) {
                valoracionCliente = "Supera las expectativas";

            }
            else if (clfcCliente == 40) {
                valoracionCliente = "Excepcional";

            }

            //Equipo
            if (clfcEquipo >= 0 && clfcEquipo <= 4.99) {
                valoracionEquipo = "Por debajo de lo esperado";

            }
            else if (clfcEquipo >= 5 && clfcEquipo <= 9.99) {
                valoracionEquipo = "Apenas cumple con lo esperado";

            }
            else if (clfcEquipo >= 10 && clfcEquipo <= 14.99) {
                valoracionEquipo = "Cumple dentro de lo esperado";

            }
            else if (clfcEquipo >= 15 && clfcEquipo <= 19.99) {
                valoracionEquipo = "Supera las expectativas";

            }
            else if (clfcEquipo == 20) {
                valoracionEquipo = "Excepcional";

            }


        }

        if (valueCargo === "Supervisores") {

            //Jefe
            if (clfcJefe >= 0 && clfcJefe <= 12.50) {
                valoracionJefe = "Por debajo de lo esperado";

            }
            else if (clfcJefe >= 12.51 && clfcJefe <= 24.99) {
                valoracionJefe = "Apenas cumple con lo esperado";

            }
            else if (clfcJefe >= 25 && clfcJefe <= 37.50) {
                valoracionJefe = "Cumple dentro de lo esperado";

            }
            else if (clfcJefe >= 37.51 && clfcJefe <= 49.99) {
                valoracionJefe = "Supera las expectativas";

            }
            else if (clfcJefe == 50) {
                valoracionJefe = "Excepcional";

            }

            //Cliente
            if (clfcCliente >= 0 && clfcCliente <= 6.23) {
                valoracionCliente = "Por debajo de lo esperado";

            }
            else if (clfcCliente >= 6.24 && clfcCliente <= 12.48) {
                valoracionCliente = "Apenas cumple con lo esperado";

            }
            else if (clfcCliente >= 12.49 && clfcCliente <= 17.73) {
                valoracionCliente = "Cumple dentro de lo esperado";

            }
            else if (clfcCliente >= 18.74 && clfcCliente <= 24.99) {
                valoracionCliente = "Supera las expectativas";

            }
            else if (clfcCliente == 25) {
                valoracionCliente = "Excepcional";

            }

            //Equipo
            if (clfcEquipo >= 0 && clfcEquipo <= 6.23) {
                valoracionEquipo = "Por debajo de lo esperado";

            }
            else if (clfcEquipo >= 6.24 && clfcEquipo <= 12.48) {
                valoracionEquipo = "Apenas cumple con lo esperado";

            }
            else if (clfcEquipo >= 12.49 && clfcEquipo <= 17.73) {
                valoracionEquipo = "Cumple dentro de lo esperado";

            }
            else if (clfcEquipo >= 18.74 && clfcEquipo <= 24.99) {
                valoracionEquipo = "Supera las expectativas";

            }
            else if (clfcEquipo == 25) {
                valoracionEquipo = "Excepcional";

            }


        }

        if (valueCargo === "Gestor") {

            //Jefe
            if (clfcJefe >= 0 && clfcJefe <= 14.99) {
                valoracionJefe = "Por debajo de lo esperado";

            }
            else if (clfcJefe >= 15 && clfcJefe <= 29.99) {
                valoracionJefe = "Apenas cumple con lo esperado";

            }
            else if (clfcJefe >= 30 && clfcJefe <= 44.99) {
                valoracionJefe = "Cumple dentro de lo esperado";

            }
            else if (clfcJefe >= 45 && clfcJefe <= 59.99) {
                valoracionJefe = "Supera las expectativas";

            }
            else if (clfcJefe == 60) {
                valoracionJefe = "Excepcional";

            }

            //Equipo
            if (clfcEquipo >= 0 && clfcEquipo <= 9.99) {
                valoracionEquipo = "Por debajo de lo esperado";

            }
            else if (clfcEquipo >= 10 && clfcEquipo <= 19.99) {
                valoracionEquipo = "Apenas cumple con lo esperado";

            }
            else if (clfcEquipo >= 20 && clfcEquipo <= 29.99) {
                valoracionEquipo = "Cumple dentro de lo esperado";

            }
            else if (clfcEquipo >= 30 && clfcEquipo <= 39.99) {
                valoracionEquipo = "Supera las expectativas";

            }
            else if (clfcEquipo == 40) {
                valoracionEquipo = "Excepcional";

            }


        }

        if (valueCargo === "Coordinador") {

            //Jefe
            if (clfcJefe >= 0 && clfcJefe <= 14.99) {
                valoracionJefe = "Por debajo de lo esperado";

            }
            else if (clfcJefe >= 15 && clfcJefe <= 29.99) {
                valoracionJefe = "Apenas cumple con lo esperado";

            }
            else if (clfcJefe >= 30 && clfcJefe <= 44.99) {
                valoracionJefe = "Cumple dentro de lo esperado";

            }
            else if (clfcJefe >= 45 && clfcJefe <= 59.99) {
                valoracionJefe = "Supera las expectativas";

            }
            else if (clfcJefe == 60) {
                valoracionJefe = "Excepcional";

            }

            //Cliente
            if (clfcCliente >= 0 && clfcCliente <= 9.99) {
                valoracionCliente = "Por debajo de lo esperado";

            }
            else if (clfcCliente >= 10 && clfcCliente <= 19.99) {
                valoracionCliente = "Apenas cumple con lo esperado";

            }
            else if (clfcCliente >= 20 && clfcCliente <= 29.99) {
                valoracionCliente = "Cumple dentro de lo esperado";

            }
            else if (clfcCliente >= 30 && clfcCliente <= 39.99) {
                valoracionCliente = "Supera las expectativas";

            }
            else if (clfcCliente == 40) {
                valoracionCliente = "Excepcional";

            }


        }

        if (valueCargo === "Analista" || valueCargo === "Vendedor" || valueCargo === "Auxiliar") {

            //Jefe
            if (clfcJefe >= 0 && clfcJefe <= 39.99) {
                valoracionJefe = "Por debajo de lo esperado";

            }
            else if (clfcJefe >= 40 && clfcJefe <= 59.99) {
                valoracionJefe = "Apenas cumple con lo esperado";

            }
            else if (clfcJefe >= 60 && clfcJefe <= 79.99) {
                valoracionJefe = "Cumple dentro de lo esperado";

            }
            else if (clfcJefe >= 80 && clfcJefe <= 99.99) {
                valoracionJefe = "Supera las expectativas";

            }
            else if (clfcJefe == 100) {
                valoracionJefe = "Excepcional";

            }
        }

        if (valueCargo === "Administrador") {

            //Jefe
            if (clfcJefe >= 0 && clfcJefe <= 12.50) {
                valoracionJefe = "Por debajo de lo esperado";

            }
            else if (clfcJefe >= 12.51 && clfcJefe <= 24.99) {
                valoracionJefe = "Apenas cumple con lo esperado";

            }
            else if (clfcJefe >= 25 && clfcJefe <= 37.50) {
                valoracionJefe = "Cumple dentro de lo esperado";

            }
            else if (clfcJefe >= 37.51 && clfcJefe <= 49.99) {
                valoracionJefe = "Supera las expectativas";

            }
            else if (clfcJefe == 50) {
                valoracionJefe = "Excepcional";

            }


            //Equipo
            if (clfcEquipo >= 0 && clfcEquipo <= 12.50) {
                valoracionEquipo = "Por debajo de lo esperado";

            }
            else if (clfcEquipo >= 12.51 && clfcEquipo <= 24.99) {
                valoracionEquipo = "Apenas cumple con lo esperado";

            }
            else if (clfcEquipo >= 25 && clfcEquipo <= 37.50) {
                valoracionEquipo = "Cumple dentro de lo esperado";

            }
            else if (clfcEquipo >= 37.51 && clfcEquipo <= 49.99) {
                valoracionEquipo = "Supera las expectativas";

            }
            else if (clfcEquipo == 50) {
                valoracionEquipo = "Excepcional";

            }
        }

        const valoraciones: any = {
            valoracionJefe: valoracionJefe,
            valoracionCliente: valoracionCliente,
            valoracionEquipo: valoracionEquipo,
            valoracionFinal: valoracionFinal
        }

        return valoraciones;
    }

}