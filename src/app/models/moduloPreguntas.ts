import { ListaPreguntasByEvaluacionInterface } from "./preguntasByEvaluacion";

export interface ListaModuloPreguntasInterface
{
    id_ModuloPregunta: number;
    nombre_Modulo: string;
    definicion: string;
    preguntasByEvaluacionModel: ListaPreguntasByEvaluacionInterface[];
    tipo_Evaluacion_Id: number;
}