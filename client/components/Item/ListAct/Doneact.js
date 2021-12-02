import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply,faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import { GlobalState } from '../../GlobalState'
import axios from 'axios';
const moment = require('moment') 

function Doneact({act,index}) {
    const state = useContext(GlobalState)
    const [modalOnEdit,modalsetOnEdit] = state.Paciente.modalOnEdit
    const [Show,setShow] = state.Paciente.show;
    const [idAct,setIdAct] = state.Paciente.idAct
    const [callback,setCallback]=state.Paciente.callback;
  
    const changeState=()=>{
      modalsetOnEdit(true)
       setShow(true) 
      setIdAct(act._id)
    }
    
    const backoff = async(id) => {
        try{
        modalsetOnEdit(true)
        setShow(false) 
        setIdAct('')
            swal({
                title:"Seguro?",
                text: "Quieres Regresar esta actividad a pendientes?",
                icon:"warning",
                buttons:["No","Yes"]
              }).then(async(res)=> {
                if(res) {
                  const moveAct=axios.put(`/api/backOff/${id}`)
                  await moveAct
                  swal({icon:"success",text:"Actividad Agregada a lista de Pendientes",timer:"2000", buttons: false}).then(function(){
                      setCallback(!callback)
                  },1500)
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
    const deleteActdone = async(id)=>{
        try{
            swal({
              title:"Seguro?",
              text: "Quieres Eliminar esta Actividad?",
              icon:"warning",
              buttons:["No","Yes"]
            }).then(async(res)=> {
              if(res) {
                const deleteAct=axios.delete(`/api/deleteAct/${id}`)
                await deleteAct
                swal({icon:"success",text:"Actividad Eliminada",timer:"2000", buttons: false}).then(function(){
                    setCallback(!callback)
                },1000)
                setShow(false);
                
                modalsetOnEdit(false);
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

    //let complete = new Date( act.DateToComplete)
    let complete = moment(new Date(act.DateToComplete)).add(1, 'M').toDate();
      return (
        <>
        <div className="card-body">
            <div className="paciente card-danger card-outline hover-card">
              <div className="card-header-paciente">
                <h5 className="card-title">{act.Activityname}</h5>
                
                <div className="card-tools">
                <span className="description"> <small>Tarea completada antes de {complete.getUTCDate()}/{complete.getMonth()}/{complete.getFullYear()} a las {act.TimeToComplete} </small></span>
                <a href="#" className="btn btn-tool btn-link">#{index+1}</a>&nbsp;
                <FontAwesomeIcon  onClick={()=>backoff(act._id)} color="orange" icon={faReply} />&nbsp;
                <FontAwesomeIcon  onClick={()=>deleteActdone(act._id)} color="red" icon={faTrashAlt} />
                </div>
              </div>
            </div>
          </div>

        </>
      )
  }

export default Doneact
