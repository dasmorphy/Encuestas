import { INavbarData } from "./option";

export const navbarData: INavbarData[] = 
[
    {
        routeLink: 'inicio',
        icon: 'fa-solid fa-house',
        label: 'Inicio'
    },
    {
        routeLink: 'gestion-evaluaciones',
        icon: 'fa-solid fa-wrench',
        label: 'Gestión de Evaluaciones',
        items:
        [
            {
                routeLink: 'gestion-evaluaciones/lista-evaluaciones',
                label: 'Lista de Evaluaciones'
            },
            {
                routeLink: 'gestion-evaluaciones/nueva-evaluacion',
                label: 'Nuevo formato de evaluación'
            },
            {
                routeLink: 'gestion-evaluaciones/editar-evaluacion',
                label: 'Editar formato de evaluación'
            }
        ]
    },
    {
        routeLink: 'evaluacion',
        icon: 'fa-solid fa-list-check',
        label: 'Evaluar'
    },
    {
        routeLink: 'colaboradores',
        icon: 'fa-solid fa-users-line',
        label: 'Colaboradores'
    },
    {
        routeLink: 'gestion-usuarios',
        icon: 'fa-solid fa-user-group',
        label: 'Gestión de Usuarios',
        items:
        [
            {
                routeLink: 'gestion-usuarios/lista-usuarios',
                label: 'Lista de Usuarios'
            },
            {
                routeLink: 'gestion-usuarios/nuevo-usuario',
                label: 'Nuevo Usuario'
            }
        ]
    },
    

];