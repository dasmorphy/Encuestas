import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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


@Injectable({
    providedIn: 'root'
})

export class ApiService {
    //coreRoute: string = environment.API_ROUTE;
    constructor(private http:HttpClient){}

    getAllColaboradores():Observable<ListaColaboresInterface[]>
    {
        let urlColaboradores: string = 'https://localhost:7091/api/colaborador';
        return this.http.get<ListaColaboresInterface[]>(urlColaboradores);
    }

    getAllCollaboradorByUsuario(id_Usuario: number | string | null):Observable<ListaColaboresInterface[]>
    {
        let urlColaborador: string = 'https://localhost:7091/api/colaborador/colaboradorByUsuario/' + id_Usuario;
        return this.http.get<ListaColaboresInterface[]>(urlColaborador);
    }

    getSingleColaborador(id_Colaborador: number | string | null):Observable<ListaColaboresInterface>
    {
        let urlColaborador: string = 'https://localhost:7091/api/colaborador/' + id_Colaborador;
        return this.http.get<ListaColaboresInterface>(urlColaborador);
    }

    updateColaborador(formColaborador: any):Observable<any>
    {
        let urlUpdateUsuario: string = 'https://localhost:7091/api/colaborador/' + formColaborador.id_Colaborador;
        console.warn (urlUpdateUsuario);
        return this.http.put<any>(urlUpdateUsuario, formColaborador);
    }

    postColaborador(formData: any):Observable<ResponseInit>
    {
        let urlPostColaborador: string = 'https://localhost:7091/api/colaborador/csv'
        console.warn (urlPostColaborador);
        return this.http.post<ResponseInit>(urlPostColaborador, formData);
    }
      
    getAllUsuarios():Observable<ListaUsuariosInterface[]>
    {
        let urlUsuarios: string = 'https://localhost:7091/api/usuarios';
        return this.http.get<ListaUsuariosInterface[]>(urlUsuarios);
    }

    getSingleUsuario(id_Usuario: number | string | null):Observable<ListaUsuariosInterface>
    {
        let urlSingleUsuario: string = 'https://localhost:7091/api/usuarios/' + id_Usuario;
        console.warn (urlSingleUsuario);
        return this.http.get<ListaUsuariosInterface>(urlSingleUsuario);
    }

    postUser(form:ListaUsuariosInterface):Observable<ResponseInit>
    {
        let urlPostUsuario: string = 'https://localhost:7091/api/usuarios/'
        console.warn (urlPostUsuario);
        return this.http.post<ResponseInit>(urlPostUsuario, form);
    }

    updateUser(form:ListaUsuariosInterface):Observable<ResponseInit>
    {
        let urlUpdateUsuario: string = 'https://localhost:7091/api/usuarios/' + form.id_Usuario;
        console.warn (urlUpdateUsuario);
        return this.http.put<ResponseInit>(urlUpdateUsuario, form);
    }

    getAllEvaluacion():Observable<ListaEvaluacionesInterface[]>
    {
        let urlEvaluacion: string = 'https://localhost:7091/api/evaluacion';
        return this.http.get<ListaEvaluacionesInterface[]>(urlEvaluacion);
    }

    getAllEvaluacionByUsuario(id_Usuario: number):Observable<ListaEvaluacionesInterface[]>{
        let urlEvaluacionUser: string = 'https://localhost:7091/api/evaluacion/evaluacionByUsuario/' + id_Usuario;
        return this.http.get<ListaEvaluacionesInterface[]>(urlEvaluacionUser);

    }

    getSingleEvaluacion(id_Colaborador: number, id_Usuario: number):Observable<ListaEvaluacionesInterface[]>
    {
        let urlSingleEvaluacion: string = 'https://localhost:7091/api/evaluacion/search/' + id_Colaborador + '/' + id_Usuario;
        console.warn (urlSingleEvaluacion);
        return this.http.get<ListaEvaluacionesInterface[]>(urlSingleEvaluacion);
    }

    postEvaluacion(form:ListaEvaluacionesInterface):Observable<ResponseInit>
    {
        let urlPostEvaluacion: string = 'https://localhost:7091/api/evaluacion'
        console.warn (urlPostEvaluacion);
        return this.http.post<ResponseInit>(urlPostEvaluacion, form);
    }

    updateEvaluacion(formEvaluacion:any):Observable<any>
    {
        let urlUpdateEvaluacion: string = 'https://localhost:7091/api/evaluacion/' + formEvaluacion.id_Evaluacion;
        console.warn (urlUpdateEvaluacion);
        return this.http.put<any>(urlUpdateEvaluacion, formEvaluacion);
    }

    deleteEvaluacion(id_Evaluacion: number):Observable<any>
    {
        let urlDeleteEvaluacion: string = 'https://localhost:7091/api/evaluacion/' + id_Evaluacion;
        return this.http.delete<any>(urlDeleteEvaluacion);

    }

    getAllModulos():Observable<ListaModuloEvaluacionInterface[]>
    {
        let urlModulo: string = 'https://localhost:7091/api/modulo';
        return this.http.get<ListaModuloEvaluacionInterface[]>(urlModulo);
    }

    getSingleModulo(id_Modulo_Evaluacion: number | string | null):Observable<ListaModuloEvaluacionInterface>
    {
        let urlSingleModulo: string = 'https://localhost:7091/api/modulo/' + id_Modulo_Evaluacion;
        console.warn (urlSingleModulo);
        return this.http.get<ListaModuloEvaluacionInterface>(urlSingleModulo);
    }

    getAllTipoEvaluacion():Observable<ListaTipoEvaluacionInterface[]>
    {
        let urlTipoEvaluacion: string = 'https://localhost:7091/api/tipoEvaluacion';
        return this.http.get<ListaTipoEvaluacionInterface[]>(urlTipoEvaluacion);
    }

    getAllPreguntaByEvaluacion():Observable<ListaPreguntasByEvaluacionInterface[]>
    {
        let urlPreguntaByEvaluacion: string = 'https://localhost:7091/api/preguntasEvaluacion';
        return this.http.get<ListaPreguntasByEvaluacionInterface[]>(urlPreguntaByEvaluacion);
    }

    postLoginAuth(form:LoginAuthInterface):Observable<ResponseInit>
    {
        let urlLoginAuth: string = 'https://localhost:7091/api/usuarios/authenticate'
        console.warn (urlLoginAuth);
        return this.http.post<ResponseInit>(urlLoginAuth, form);
    }

    getAllModulosPreguntas(id_tipo_evaluacion_session: number | string | null):Observable<ListaModuloPreguntasInterface[]>
    {
        let urlModulosPreguntas: string = 'https://localhost:7091/api/modulo/preguntasModulo/'+ id_tipo_evaluacion_session;
        return this.http.get<ListaModuloPreguntasInterface[]>(urlModulosPreguntas);
    }
    
}