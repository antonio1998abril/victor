import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClinicMedical,faSearchPlus,faFileMedical,faBookMedical,faIdCardAlt,faCogs, faNotesMedical} from '@fortawesome/free-solid-svg-icons'
/* import 'bootstrap/dist/css/bootstrap.min.css'; */

export const MenuOption = [
    {
        title:'Hogar',
        path:'/',
        pathA:'/',
        icon:<FontAwesomeIcon icon={faClinicMedical}   transform="shrink-3"  /> ,
        cName:'nav-text',
        admin:false
    },{
        title:'Pacientes',
        path:'/Pacientes/info-pacientes',
        icon:<FontAwesomeIcon icon={faIdCardAlt}   transform="shrink-4" />,
        cName:'nav-text',
        admin:false
    },{
        title:'Estatus',
        path:'/Estatus/paciente-estatus',
        icon:<FontAwesomeIcon icon={faNotesMedical}  transform="shrink-3" /> ,
        cName:'nav-text',
        admin:false
    },/*  {
        title:'Actividades',
        path:'/Admin/admin',
        icon:<FontAwesomeIcon icon={faBookMedical}   transform="shrink-3" />,
        cName:'nav-text',
        admin:false
    }, */{
        title:'Perfil',
        path:'/User/Config',
        icon:<FontAwesomeIcon icon={faCogs}  transform="shrink-4" />,
        cName:'nav-text',
        admin:false
    }
    
     
]
