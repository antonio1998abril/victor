import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenAlt} from '@fortawesome/free-solid-svg-icons';
import { GlobalState } from '../../GlobalState';
const moment = require('moment') 

function Listact({act,index}) {
  const state = useContext(GlobalState)
  const [modalOnEdit,modalsetOnEdit] = state.Paciente.modalOnEdit
  const [Show,setShow] = state.Paciente.show;
  const [idAct,setIdAct] = state.Paciente.idAct
  const [callback,setCallback]=state.Paciente.callback;

  const changeState=()=>{
    modalsetOnEdit(true)
    setShow(true)
    setIdAct(act._id)
    setCallback(!callback)
  }
  let complete = new Date( act.DateToComplete)
  complete = moment(complete).add(1, 'M').toDate();
    return (
      <>
      <div className="paciente card-info card-outline hover-card">
        <div className="card-header-paciente ">
          <h5 className="card-title">{ act.Activityname}</h5><br/>
          <span className="description"> <small>Completar antes de {complete.getUTCDate()}/{complete.getMonth()}/{complete.getFullYear()} a las {act.TimeToComplete} </small></span>
          <div className="card-tools">
            <a href="#" className="btn btn-tool btn-link">#{index+1}</a>&nbsp;
              <FontAwesomeIcon  onClick={changeState} color="orange" icon={faPenAlt} />
          </div>
        </div>
        <div className="card-body">
        {act.Content}
        </div>
      </div>
      </>
    )
}

export default Listact
