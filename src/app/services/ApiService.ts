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

    getSingleColaborador(id_Colaborador: number | string | null):Observable<ListaColaboresInterface>
    {
        let urlColaborador: string = 'https://localhost:7091/api/colaborador/' + id_Colaborador;
        return this.http.get<ListaColaboresInterface>(urlColaborador);
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

    postEvaluacion(form:ListaEvaluacionesInterface):Observable<ResponseInit>
    {
        let urlPostEvaluacion: string = 'https://localhost:7091/api/evaluacion'
        console.warn (urlPostEvaluacion);
        return this.http.post<ResponseInit>(urlPostEvaluacion, form);
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

    
}