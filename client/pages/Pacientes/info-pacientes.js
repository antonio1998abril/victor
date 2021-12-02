import React, { useContext, useEffect, useState } from 'react'
import Add from '../../components/Create/CreatePaciente'
import { GlobalState } from '../../components/GlobalState';
import Router from 'next/router';
import PacienteItem from '../../components/Item/PacienteItem';
import axios from 'axios';

function Info() {
  const state = useContext(GlobalState);
  const [paciente] = state.Paciente.pacientes
  const [loaded,setLoaded] = useState(false)
  const [islogged]= state.User.isLogged
  const [callback,setCallback]=state.Paciente.callback
  const  [token] = state.token

  const deletePaciente=async(id)=>{
    try {        
        swal({
          title:"Seguro?",
          text: "Quieres Eliminar este paciente?",
          icon:"warning",
          buttons:["No","Yes"]
      }).then(async (res)=>{
          if(res){
       const deletePaciente=axios.delete(`/api/deletePaciente/${id}`,{
         headers:{Authorization:token}
       })
       await deletePaciente
          swal({icon:"success",text:"Paciente Eliminado",timer:"2000", buttons: false}).then(function(){
              setCallback(!callback)
          },1000)
        }
      })
    }catch(err){
        swal({
            title:"¡Ups",
            text: err.response.data.msg,
            icon:"error",
            button:"OK"
            })
        }
    }

  
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
      <Add/><br/>
        <div className="paciente card-solid">
          <div className="card-body">
            <div className="row">
              {
                paciente.map(paciente => { 
                  return <PacienteItem key={paciente._id} paciente={paciente} deletePaciente={deletePaciente}/>
                })
              }
            </div>
        </div>
      </div>
      </>
    )
}

export default Info
