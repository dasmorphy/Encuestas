import { INavbarData } from "./option";

export const navbarData: INavbarData[] = 
[
    {
        routeLink: 'inicio',
        icon: 'fa-solid fa-house',
        label: 'Inicio',
        rol: null
    },
    {
        routeLink: 'gestion-evaluaciones',
        icon: 'fa-solid fa-wrench',
        label: 'Gestión de Evaluaciones',
        rol: null,
        items:
        [
            {
                routeLink: 'gestion-evaluaciones/lista-evaluaciones',
                label: 'Lista de Evaluaciones',
                rol: null
            }
            // {
            //     routeLink: 'gestion-evaluaciones/nueva-evaluacion',
            //     label: 'Nuevo formato de evaluación',
            //     rol: 1
            // },
            // {
            //     routeLink: 'gestion-evaluaciones/editar-evaluacion',
            //     label: 'Editar formato de evaluación',
            //     rol: 1
            // }
        ]
    },
    {
        routeLink: 'evaluacion',
        icon: 'fa-solid fa-list-check',
        label: 'Evaluar',
        rol: null
    },
    {
        routeLink: 'colaboradores',
        icon: 'fa-solid fa-users-line',
        label: 'Colaboradores',
        rol: null
    },
    {
        routeLink: 'gestion-usuarios',
        icon: 'fa-solid fa-user-group',
        label: 'Gestión de Usuarios',
        rol: null,
        items:
        [
            {
                routeLink: 'gestion-usuarios/lista-usuarios',
                label: 'Lista de Usuarios',
                rol: 1,
            },
            {
                routeLink: 'gestion-usuarios/nuevo-usuario',
                label: 'Nuevo Usuario',
                rol: 1,
            }
        ]
    },
    {
        routeLink: '',
        icon: 'fa-solid fa-key',
        label: 'Cambiar contraseña',
        rol: null
    },
];