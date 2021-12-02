import React, { useContext, useEffect, useState } from 'react'
import Router from 'next/router';
import { GlobalState } from '../components/GlobalState';
import Noti from '../components/Notifications/notification'
import axios from 'axios';

function Notification() {
  const state = useContext(GlobalState);
  const [loaded,setLoaded] = useState(false)
  const [islogged]= state.User.isLogged
  
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

  const [notifications,setNotifications] = state.Paciente.notifications
  const [callback,setCallback]=state.Paciente.callback
 
  
  const deleteNoti = async(id) => {
    try {        
      swal({
        title:"Seguro?",
        text: "Quieres Eliminar esta notificacion?",
        icon:"warning",
        buttons:["No","si"]
    }).then(async (res)=>{
        if(res){
     const deleteNoti=axios.delete(`/api/deNotification/${id}`)
     await deleteNoti
        swal({icon:"success",text:"Notificacion Eliminado",timer:"2000", buttons: false}).then(function(){
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


    return (
        <div>
{/*           <div className="card">
            <div className="card-body row">
              <div className="col-5 text-center d-flex align-items-center justify-content-center">
                <div className="">
                  <h2>DIABE <strong>TINS</strong></h2>
                  <p className="lead mb-5">Recordatorio<br/>
                  </p>
                </div>
              </div>
              <div className="col-7">
                <div className="form-group">
                  <label htmlFor="inputName">Name</label>
                  <input type="text" id="inputName" className="form-control"/>
                </div>
                <div className="form-group">
                  <label htmlFor="inputEmail">E-Mail</label>
                  <input type="email" id="inputEmail" className="form-control"/>
                </div>
                <div className="form-group">
                  <label htmlFor="inputSubject">Subject</label>
                  <input type="text" id="inputSubject" className="form-control"/>
                </div>
                <div className="form-group">
                  <label htmlFor="inputMessage">Message</label>
                  <textarea id="inputMessage" className="form-control" rows="4"></textarea>
                </div>
                <div className="form-group">
                  <input type="submit" className="btn btn-primary" value="Enviar Mensaje"/>
                </div>
              </div>
            </div>
          </div> */}
      <br/>

      <div className="col-md-12">
            <div className="card card-default">
              <div className="card-header">
                <h3 className="card-title">
                  <i className="fas fa-exclamation-triangle"></i>
                  Alertas
                </h3>
              </div>
       
              <div className="card-body">
                {
                  notifications.map(noti =>{
                    return <Noti key={noti._id} noti={noti} deleteNoti={deleteNoti}/>
                  })
                }

              </div>
        
            </div>
         
          </div>

        </div>
    )
}

export default Notification
