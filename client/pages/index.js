import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeartbeat, faClipboardCheck, faWalking, faAppleAlt} from '@fortawesome/free-solid-svg-icons'
import { GlobalState } from '../components/GlobalState';
import { useContext, useEffect, useState } from 'react';
import swal from 'sweetalert'

import Router from 'next/router';
import axios from 'axios';
import Link from 'next/link'

export default function Home() {
    const state = useContext(GlobalState);
    const [islogged]= state.User.isLogged;
    const [loaded,setLoaded] = useState(false);
    const [singInData]= state.User.perfilInfo;
    
    useEffect(() => {
      if(!islogged) {
        let timerFunc = setTimeout(() => {
          Router.push('/login')
        }, 100);
  
        return () => clearTimeout(timerFunc);
    }else{ 
        setLoaded(true) 
      }
  }, [!islogged]);

  if (!loaded) { return <div></div> } 

  return (
  
  <>
    <div className="card-body col-12">
      <div className="callout callout-info">
          <h6><i className="fas fa-info"></i> Bienvenido:</h6>
          <h4>Con esta aplicacion puedes gestionar la salud de tus pacientes con diabetes</h4>
      </div>
    </div>

    <div className="gridIndex">
   {/*    <Link href="/Admin/Citas"> */}
      <div className="card cardheart">
      <div className="titleIndex"><b>Observa la Evolucion de tus pacientes.</b></div>
      <div> <FontAwesomeIcon icon={faHeartbeat}  className="IconIndex"/></div>
      </div>
    {/*   </Link> */}
       {/* <Link href="/Admin/Citas"> */}
      <div className="card dates ">
      <div className="titleIndex"><b>Gestiona los Expedientes de cada paciente.</b></div>
      <div> <FontAwesomeIcon icon={faClipboardCheck}   className="IconIndex"/></div>
     
      </div>
    {/*   </Link>  */}
     {/*  <Link href="/Admin/Citas"> */}
      <div className="card activities ">
      <div className="titleIndex"><b> Asigna Actividades a tus pacientes.</b></div>
      <div> <FontAwesomeIcon icon={faWalking}  className="IconIndex"/></div>
     
      </div>
      {/* </Link> */}
     {/*  <Link href="/Admin/Citas"> */}
    
      <div className="card nutrition ">
      <div className="titleIndex"><b>Evita Complicaciones.  </b></div>
      <div> <FontAwesomeIcon icon={faAppleAlt}  className="IconIndex"/></div>     
      </div>
     {/*  </Link> */}
    </div>
 </>
 
  )
}
