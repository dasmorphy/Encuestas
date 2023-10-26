import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ListaColaboresInterface } from '../models/colaboradores'
import { Observable } from 'rxjs';
import { ListaUsuariosInterface } from '../models/usuarios';
import { environment } from 'src/environments/environment';
import { ListaEvaluacionesInterface } from '../models/evaluacion';
import { ListaModuloEvaluacionInterface } from '../models/moduloEvaluacion';
import { ListaTipoEvaluacionInterface } from '../models/tipoEvaluacion';
import { ListaPreguntasByEvaluacionInterface } from '../models/preguntasByEvaluacion';
import { LoginAuthInterface } from '../models/loginAuth';
import { ListaModuloPreguntasInterface } from '../models/moduloPreguntas';
import { ListaObservacionesInterface } from '../models/observaciones';
import { ListaRolesInterface } from '../models/roles';
import { ListaPreguntaModuloCargo } from '../models/preguntaModuloCargo';
import { ListaCargosInterface } from '../models/cargos';
import { ListaProcesosEvalaucion } from '../models/procesosEvaluacion';
import { ListaPromedios } from '../models/dataPromedios';


@Injectable({
    providedIn: 'root'
})

export class ApiService {
    //coreRoute: string = environment.API_ROUTE;
    //private baseUrl: string = 'https://webappevaluaciones.azurewebsites.net/api/';
    private baseUrl: string = 'http://localhost:9093/api/';
    constructor(private http:HttpClient){}

    getAllColaboradores():Observable<ListaColaboresInterface[]>
    {
        let urlColaboradores: string = `${this.baseUrl}colaborador`;
        return this.http.get<ListaColaboresInterface[]>(urlColaboradores);
    }

    getAllCollaboradorByUsuario(id_Usuario: number | string | null):Observable<ListaColaboresInterface[]>
    {
        let urlColaborador: string = `${this.baseUrl}colaborador/colaboradorByUsuario/` + id_Usuario;
        return this.http.get<ListaColaboresInterface[]>(urlColaborador);
    }

    getSingleColaborador(id_Colaborador: number | string | null):Observable<ListaColaboresInterface>
    {
        let urlColaborador: string = `${this.baseUrl}colaborador/` + id_Colaborador;
        return this.http.get<ListaColaboresInterface>(urlColaborador);
    }

    getColaboradorByIdentificacion(cedula_colaborador: string):Observable<ListaColaboresInterface>
    {
        let urlColaborador: string = `${this.baseUrl}colaborador/colaboradorByIdentificacion/` + cedula_colaborador;
        return this.http.get<ListaColaboresInterface>(urlColaborador);
    }

    updateColaborador(formColaborador: any):Observable<any>
    {
        let urlUpdateUsuario: string = `${this.baseUrl}colaborador/` + formColaborador.id_Colaborador;
        //console.warn (urlUpdateUsuario);
        return this.http.put<any>(urlUpdateUsuario, formColaborador);
    }

    postColaborador(formData: any):Observable<ResponseInit>
    {
        let urlPostColaborador: string = `${this.baseUrl}colaborador/csv`
        //console.warn (urlPostColaborador);
        return this.http.post<ResponseInit>(urlPostColaborador, formData);
    }

    deleteColaborador(id_Colaborador: number):Observable<any>
    {
        let urlDeleteColaborador: string = `${this.baseUrl}colaborador/` + id_Colaborador;
        return this.http.delete<any>(urlDeleteColaborador);

    }

    getExportarColaboradores(estadosSeleccionados: string[]): Observable<any> 
    {
        const urlExportar = `${this.baseUrl}colaborador/exportarColaboradores`;
        
        // Construir los parámetros de la solicitud GET
        const params = new HttpParams().set('estadosSeleccionados', estadosSeleccionados.join(','));
    
        // Realizar la solicitud GET con los parámetros
        return this.http.get<any>(urlExportar, { params });
    }

    getColaboradorByNombre(nombreColaborador: string): Observable<ListaColaboresInterface> 
    {
        const urlColaboradorNombre = `${this.baseUrl}colaborador/colaboradorByNombre/` + nombreColaborador;
        return this.http.get<ListaColaboresInterface>(urlColaboradorNombre);
    }
      
    getAllUsuarios():Observable<ListaUsuariosInterface[]>
    {
        let urlUsuarios: string = `${this.baseUrl}usuarios`;
        return this.http.get<ListaUsuariosInterface[]>(urlUsuarios);
    }

    getSingleUsuario(id_Usuario: number | string | null):Observable<ListaUsuariosInterface>
    {
        let urlSingleUsuario: string = `${this.baseUrl}usuarios/` + id_Usuario;
        //console.warn (urlSingleUsuario);
        return this.http.get<ListaUsuariosInterface>(urlSingleUsuario);
    }

    getSingleByUsuarioString(usuario: string ):Observable<ListaUsuariosInterface>
    {
        let urlUsuario: string = `${this.baseUrl}usuarios/usuario/` + usuario;
        //console.warn (urlUsuario);
        return this.http.get<ListaUsuariosInterface>(urlUsuario);
    }

    postUser(form:ListaUsuariosInterface):Observable<ResponseInit>
    {
        let urlPostUsuario: string = `${this.baseUrl}usuarios/`
        //console.warn (urlPostUsuario);
        return this.http.post<ResponseInit>(urlPostUsuario, form);
    }

    postUserCsv(formData: any):Observable<ResponseInit>
    {
        let urlPostUsuario: string = `${this.baseUrl}usuarios/csv`
        //console.warn (urlPostUsuario);
        return this.http.post<ResponseInit>(urlPostUsuario, formData);
    }

    updateUser(form:ListaUsuariosInterface):Observable<ResponseInit>
    {
        let urlUpdateUsuario: string = `${this.baseUrl}usuarios/` + form.id_Usuario;
        //console.warn (urlUpdateUsuario);
        return this.http.put<ResponseInit>(urlUpdateUsuario, form);
    }

    deleteUser(id_Usuario: number):Observable<any>
    {
        let urlDeleteUsuario: string = `${this.baseUrl}usuarios/` + id_Usuario;
        return this.http.delete<any>(urlDeleteUsuario);

    }

    getAllEvaluacion():Observable<ListaEvaluacionesInterface[]>
    {
        let urlEvaluacion: string = `${this.baseUrl}evaluacion`;
        return this.http.get<ListaEvaluacionesInterface[]>(urlEvaluacion);
    }

    getAllEvaluacionByUsuario(id_Usuario: number):Observable<ListaEvaluacionesInterface[]>{
        let urlEvaluacionUser: string = `${this.baseUrl}evaluacion/evaluacionByUsuario/` + id_Usuario;
        return this.http.get<ListaEvaluacionesInterface[]>(urlEvaluacionUser);

    }

    getSingleEvaluacion(id_Colaborador: number, id_Usuario: number):Observable<ListaEvaluacionesInterface[]>
    {
        let urlSingleEvaluacion: string = `${this.baseUrl}evaluacion/search/` + id_Colaborador + '/' + id_Usuario;
        //console.warn (urlSingleEvaluacion);
        return this.http.get<ListaEvaluacionesInterface[]>(urlSingleEvaluacion);
    }

    getPromediosEvaluaciones(cedulaColaborador?: string):Observable<ListaPromedios>
    {
        let urlPromedio: string = `${this.baseUrl}evaluacion/promediosCompetencia`;

        if (cedulaColaborador != null){
            urlPromedio = `${this.baseUrl}evaluacion/promediosCompetencia?cedulaColaborador=${cedulaColaborador}`;
        }
        //console.warn (urlSingleEvaluacion);
        return this.http.get<ListaPromedios>(urlPromedio);
    }

    getPromediosGenerales(cedulaColaborador?: string):Observable<any>
    {
        let urlPromedioGeneral: string = `${this.baseUrl}evaluacion/promediosGenerales`;
        if (cedulaColaborador != null){
            urlPromedioGeneral = `${this.baseUrl}evaluacion/promediosGenerales?cedulaColaborador=${cedulaColaborador}`;
        }

        return this.http.get<any>(urlPromedioGeneral);

    }

    postEvaluacion(form:any):Observable<ResponseInit>
    {
        let urlPostEvaluacion: string = `${this.baseUrl}evaluacion`
        //console.warn (urlPostEvaluacion);
        return this.http.post<ResponseInit>(urlPostEvaluacion, form);
    }

    updateEvaluacion(dataFinal:any):Observable<any>
    {
        let urlUpdateEvaluacion: string = `${this.baseUrl}evaluacion/` + dataFinal.evaluacionDtoPut.id_Evaluacion;
        //console.warn (urlUpdateEvaluacion);
        return this.http.put<any>(urlUpdateEvaluacion, dataFinal);
    }

    updateEvaluacionEstado(dataEvaluacion:any):Observable<any>
    {
        let urlUpdateEvaluacionEstado: string = `${this.baseUrl}evaluacion/evaluacionEstado/` + dataEvaluacion.id_Evaluacion;
        //console.warn (urlUpdateEvaluacionEstado);
        return this.http.put<any>(urlUpdateEvaluacionEstado, dataEvaluacion);
    }

    deleteEvaluacion(id_Evaluacion: number):Observable<any>
    {
        let urlDeleteEvaluacion: string = `${this.baseUrl}evaluacion/` + id_Evaluacion;
        return this.http.delete<any>(urlDeleteEvaluacion);

    }

    getAllModulos():Observable<ListaModuloEvaluacionInterface[]>
    {
        let urlModulo: string = `${this.baseUrl}modulo`;
        return this.http.get<ListaModuloEvaluacionInterface[]>(urlModulo);
    }

    getSingleModulo(id_Modulo_Evaluacion: number | string | null):Observable<ListaModuloEvaluacionInterface>
    {
        let urlSingleModulo: string = `${this.baseUrl}modulo/` + id_Modulo_Evaluacion;
        //console.warn (urlSingleModulo);
        return this.http.get<ListaModuloEvaluacionInterface>(urlSingleModulo);
    }

    getAllTipoEvaluacion():Observable<ListaTipoEvaluacionInterface[]>
    {
        let urlTipoEvaluacion: string = `${this.baseUrl}tipoEvaluacion`;
        return this.http.get<ListaTipoEvaluacionInterface[]>(urlTipoEvaluacion);
    }

    getAllPreguntaByEvaluacion():Observable<ListaPreguntasByEvaluacionInterface[]>
    {
        let urlPreguntaByEvaluacion: string = `${this.baseUrl}preguntasEvaluacion`;
        return this.http.get<ListaPreguntasByEvaluacionInterface[]>(urlPreguntaByEvaluacion);
    }

    postLoginAuth(form:LoginAuthInterface):Observable<ResponseInit>
    {
        let urlLoginAuth: string = `${this.baseUrl}usuarios/authenticate`
        //console.warn (urlLoginAuth);
        return this.http.post<ResponseInit>(urlLoginAuth, form);
    }

    getAllModulosPreguntas(id_tipo_evaluacion_session: number | string | null):Observable<ListaModuloPreguntasInterface[]>
    {
        let urlModulosPreguntas: string = `${this.baseUrl}modulo/preguntasModulo/`+ id_tipo_evaluacion_session;
        return this.http.get<ListaModuloPreguntasInterface[]>(urlModulosPreguntas);
    }

    getAllObservaciones():Observable<ListaObservacionesInterface[]>
    {
        let urlObservacion: string = `${this.baseUrl}observacion`;
        return this.http.get<ListaObservacionesInterface[]>(urlObservacion); 
    }

    getObservacionByEvaluacion(id_Evaluacion: number):Observable<ListaObservacionesInterface[]>
    {
        let urlObservacionByEvaluacion: string = `${this.baseUrl}observacion/` + id_Evaluacion;
        return this.http.get<ListaObservacionesInterface[]>(urlObservacionByEvaluacion);
    }

    getAllRoles():Observable<ListaRolesInterface[]>
    {
        let urlRoles: string = `${this.baseUrl}rol`;
        return this.http.get<ListaRolesInterface[]>(urlRoles); 
    }

    getSingleRol(id_rol: number):Observable<ListaRolesInterface>
    {
        let urlSingleRol: string = `${this.baseUrl}rol/` + id_rol;
        return this.http.get<ListaRolesInterface>(urlSingleRol); 
    }

    getPreguntaModuloCargo(id_Cargo:number):Observable<any[]>
    {
        let urlPreguntaModuloCargo: string = `${this.baseUrl}preguntaModuloCargo/` +  id_Cargo
        return this.http.get<any[]>(urlPreguntaModuloCargo);
    }

    getAllCargo():Observable<ListaCargosInterface[]>
    {
        let urlCargo: string = `${this.baseUrl}cargos`;
        return this.http.get<ListaCargosInterface[]>(urlCargo); 
    }

    getSingleCargo(id_Cargo:number):Observable<ListaCargosInterface>
    {
        let urlSingleCargo: string = `${this.baseUrl}cargos/` + id_Cargo;
        return this.http.get<ListaCargosInterface>(urlSingleCargo); 
    }

    getUltmProcesoEvaluacion():Observable<ListaProcesosEvalaucion>
    {
        let urlProceso: string = `${this.baseUrl}procesosEvaluacion/ultimoRegistro`;
        return this.http.get<ListaProcesosEvalaucion>(urlProceso); 
    }
    
    postProcesoEvaluacion(form:any):Observable<ResponseInit>
    {
        let urlProcesos: string = `${this.baseUrl}procesosEvaluacion`
        //console.warn (urlProcesos);
        return this.http.post<ResponseInit>(urlProcesos, form);
    }


    updateProcesoEstado(procesoEvaluacion:any):Observable<any>
    {
        let urlUpdateProcesoEstado: string = `${this.baseUrl}procesosEvaluacion/` + procesoEvaluacion.id_Proceso_Evaluacion;
        //console.warn (urlUpdateProcesoEstado);
        return this.http.put<any>(urlUpdateProcesoEstado, procesoEvaluacion);
    }
    
}