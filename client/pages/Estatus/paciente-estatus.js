import React, { useContext, useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import Router from 'next/router';
import { GlobalState } from '../../components/GlobalState';
import ActividadItem from '../../components/Item/ActividadItem';

function Pacienteestatus() {
    const state = useContext(GlobalState);
    const [loaded,setLoaded] = useState(false)
    const [islogged]= state.User.isLogged
    const [paciente] = state.Paciente.pacientes
    const [callback,setCallback]=state.Paciente.callback
    
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
    <div className="paciente ">
        <div className="card-status">
            <h3 className="card-title">Estatus de mis Pacientes</h3>
        </div>
        <div className="card-body p-0">
        <Table className="text-center table-inverse  table-borderless shadow-lg  rounded projects" variant="light"   hover  size="sm" responsive="sm">
            <thead >
                <tr>
                    <th style={{width: "10%"}} >Actividades</th>
                    <th style={{width: "20%"}} >Paciente</th>
                    <th style={{width: "20%"}}>Progresos</th>
                    <th style={{width: "20%"}} className="text-center">Estatus</th>
                   {/*  <th style={{width: "30%"}} className="text-center">Opciones</th> */}
                </tr>
            </thead>
            <tbody className="table-hover">
            {
                paciente.map(actividad => { 
                  return <ActividadItem key={actividad._id} actividad={actividad} />
                })
            }
            </tbody>
        </Table>
        </div>
    </div>
    )
}


export default Pacienteestatus
