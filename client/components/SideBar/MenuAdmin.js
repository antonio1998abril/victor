import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiagnoses,faSearchPlus} from '@fortawesome/free-solid-svg-icons'
/* import 'bootstrap/dist/css/bootstrap.min.css'; */

export const MenuAdmin= [
   /*  {
        titleAdmin:'Salud',
        path:'/Pacientes/salud',
        iconAdmin:<FontAwesomeIcon icon={faDiagnoses}   transform="shrink-3" />,
        cName:'nav-text',
        admin:true
    }, */
    {
        title:'Buscar',
        path:'/Result',
        pathA:'/Result',
        icon:<FontAwesomeIcon icon={faSearchPlus}   transform="shrink-3"  /> ,
        cName:'nav-text',
        admin:false
    }
     
]
