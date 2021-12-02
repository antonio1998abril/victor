import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle,faTrashAlt, faSignOutAlt, faPencilAlt} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';
import axios from 'axios';
import {Form,Col,Button,Modal, NavDropdown} from 'react-bootstrap'; 
import { useRouter } from 'next/router'
import { GlobalState } from '../../components/GlobalState';
import swal from 'sweetalert'
import ListAct from '../../components/Item/ListAct/Listact'
import Router from 'next/router';
import Doneact from '../../components/Item/ListAct/Doneact';

function Actividad() {
  const router = useRouter()
  const initialState = {
    Activityname:'',
    Content:'',
    DateToComplete:'',
    TimeToComplete:'',
    Status: '',
    paciente_id:router.query.actividad
  }
  
  const state = useContext(GlobalState)
  const [token] = state.token
  const [callback,setCallback]=state.Paciente.callback;
  const [newAct,setNewAct] = useState(initialState)
  const [show, setShow] = state.Paciente.show;
  const [modalOnEdit,modalsetOnEdit] = state.Paciente.modalOnEdit;
  const [idAct,setIdAct] = state.Paciente.idAct
  /* Verify login */
  const [islogged]= state.User.isLogged;
  const [loaded,setLoaded] = useState(false);
  const handleShow =()=>setShow(true);
  /* const [ListPacienteAct, setListPacienteAct] = state.Paciente.listPacienteAct */
  const [ListPacienteAct, setListPacienteAct] = useState([]);
  const [ListDone,setListAct]  = useState([]);
  
  const handleClose = () => {
    modalsetOnEdit(false)
    setShow(false);
    setNewAct(initialState);
    setIdAct('');
  }
  const handleChangeInput=e=>{
    const {name,value}=e.target
    setNewAct({...newAct,[name]:value})
  }
  
  useEffect(()=>{    
    if(!islogged) {
      let timerFunc = setTimeout(() => {
        Router.push('/login')
      }, 100);

      return () => clearTimeout(timerFunc);
    }else{ 
      setLoaded(true) 
    }
     if(idAct){
      modalsetOnEdit(true)
        ListPacienteAct.forEach(listAct=>{
          if(listAct._id ===idAct) {
            setNewAct(listAct)
            setShow(true);
          }
        })
    }else{
      modalsetOnEdit(false)
      setNewAct(initialState)
    }


    /* ANOTHER FUNCTION */
    /* let timeFunc = setTimeout(async() => {
        const list = await axios.get(`/api/getAct/${router.query.actividad}`,{
          headers:{Authorization:token}
        }) 
      setListPacienteAct(list.data.activities)      
    },1500);
    return () => clearTimeout(timeFunc); */

},[ idAct,!islogged])
useEffect(()=>{
  if (token){
    let timeFunc = setTimeout(async() => {
      const list = await axios.get(`/api/getAct/${router.query.actividad}`,{
        headers:{Authorization:token}
      }) 
    setListAct(list.data.doneAct)
    setListPacienteAct(list.data.activities)      
  },500);
  return () => clearTimeout(timeFunc);
  }
},[token,callback])

  const TaskSubmit = async e => {
    e.preventDefault()
    try{
      if(modalOnEdit){
         await axios.put(`/api/upAct/${idAct}`,{...newAct},{
          headers:{Authorization:token}
        })
        swal({icon:"success",text:`Activiad Actualizada correctamente`,timer:"2000",buttons: false}); 
      }else {
        await axios.post('/api/postACT',{...newAct},{
          headers:{Authorization:token}
        }) 
       swal({icon:"success",text:`Activiad ${newAct.Activityname} agregada correctamente`,timer:"2000",buttons: false}); 
      }
        modalsetOnEdit(false)
        setShow(false);
        setNewAct(initialState);
        setCallback(!callback);
        setIdAct('')
    }catch(err){
      swal({
        title:"¡Ups",
        text:err.response.data.msg,
        icon:"error",
        button:"OK"
      })  
    }
  }

  const deleteAct = async(id)=>{
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
            setNewAct(initialState);
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

    const doneAct = async(id)=> {
      try{
        swal({
          title:"Seguro?",
          text: "Quieres Mover a terminados esta Actividad?",
          icon:"warning",
          buttons:["No","Yes"]
        }).then(async(res)=> {
          if(res) {
            const moveAct=axios.put(`/api/doneAct/${id}`)
            await moveAct
            swal({icon:"success",text:"Actividad Ralizada",timer:"2000", buttons: false}).then(function(){
                setCallback(!callback)
            },1000)
            setShow(false);
            setNewAct(initialState);
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


  const actUp = () =>{
    return (
      <>
        <div className="d-grid gap-2">
            <Button variant="warning" size="sm" type="submit">
                Actualizar    <FontAwesomeIcon  icon={faPencilAlt} />    
              </Button>&nbsp;&nbsp;
              <Button variant="primary" size="sm" onClick={()=>doneAct(newAct._id)}>
                Mover a Terminados  <FontAwesomeIcon  icon={faSignOutAlt} />    
              </Button>&nbsp;&nbsp;
              <Button variant="danger" size="sm" onClick={()=>deleteAct(newAct._id)} >
                Eliminar Tarea     <FontAwesomeIcon  icon={faTrashAlt}  />         
              </Button>
            </div>
      </>
    )
  }



  if (!loaded) { return <div></div> } 
    return (
        <div>
{/*         <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="paciente ">
              <div className="card-header">
                <h3 className="card-title">Estatus de actividades</h3>
              </div>
         
              <div className="card-body">
                <div className="row ">

                <div className="col-sm-4">
                    <div className="position-relative p-3 bg-gray citas" >
                      <div className="ribbon-wrapper">
                        <div className="ribbon bg-success">
                        HECHO
                        </div>
                      </div>
                     cita: <br/>
                      <small>hora:</small>
                    </div>
                  </div>
                  <br/>

                  <div className="col-sm-4">
                    <div className="position-relative p-3 bg-gray citas"  >
                      <div className="ribbon-wrapper ribbon-xl">
                        <div className="ribbon bg-warning text-lg">
                          Proxima
                        </div>
                      </div>
                     cita: <br/> ejemplo <br/>
                      <small>hora:</small>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="position-relative p-3 bg-gray citas" >
                      <div className="ribbon-wrapper ribbon-xl">
                        <div className="ribbon bg-danger text-xl">
                          Pronto
                        </div>
                      </div>
                     cita: <br/> ejemplo <br/>
                      <small>hora:</small>
                    </div>
                  </div>
                </div>
              </div> 
             </div>
          </div>
        </div>
      </div> */} 
  <div className="kanban" /* style="min-height: 1191px;" */>
    <section className="content-header">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">
            <h1 className="ubuntu"> Actividades del Paciente </h1>
          </div>
          <div className="col-sm-6 d-none d-sm-block">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item active">Actividades</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <section className="content pb-4">
      <div className="container-fluid h-100">
        <div className="paciente card-row card-secondary">
          <div className="card-header-kaban line">
            <h3 className="card-title up-text">
              Actividades 
            </h3>
            <FontAwesomeIcon onClick={handleShow} className="addACT" icon={faPlusCircle} />
          </div>
          <div className="card-body">
            {
            ListPacienteAct.map((act,index) => {
              return <ListAct key={act._id} act={act} index={index}/>
            })
          }  
          </div>
        </div>
        <div className="paciente card-row card-primary">
          <div className="card-header-kaban">
            <h3 className="card-title">
              Actividades Terminadas
            </h3>
          </div>

           {
            ListDone.map((act,index) => {
              return <Doneact key={act._id} act={act} index={index}/>
            })
          } 
        </div>
      </div>
    </section>
  </div>

  <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title>{modalOnEdit ? `Actualizar actividad` : "Crea una nueva actividad"}</Modal.Title>
          </Modal.Header>
            <Modal.Body>
            <Form onSubmit={TaskSubmit}>
                <Form.Row>
                    <Form.Group as={Col} >
                    <Form.Label>Nombre de la Actividad</Form.Label>
                    <Form.Control name="Activityname" type="text" placeholder=" Actividad"
                         value={newAct.Activityname} onChange={handleChangeInput}
                    />
                    </Form.Group>

                    <Form.Group  className="mb-4">
                    <Form.Label>Descripcion de la Actividad</Form.Label>
                    <Form.Control  as="textarea" name="Content" type="text" className="form-control font-weight-bold" placeholder="Realizar" 
                         value={newAct.Content} onChange={handleChangeInput}
                    />
                    </Form.Group>
                </Form.Row>
                <Form.Group >
                    <Form.Label>Completar antes de la Fecha</Form.Label>
                    <Form.Control name="DateToComplete"  type='date'   min="2017-01-01" max="2050-12-31"
                     value={newAct.DateToComplete} onChange={handleChangeInput}
                    />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Completar antes de la Hora</Form.Label>
                    <Form.Control name="TimeToComplete"  type='time'  
                     value={newAct.TimeToComplete} onChange={handleChangeInput}
                    />
                </Form.Group>
            
            {
              modalOnEdit ? actUp() : 
                <Button variant="primary" type="submit" >Crear</Button>
            }
            </Form>
            </Modal.Body>

          <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Cancelar
              </Button>
          </Modal.Footer>
        </Modal>
        </div>
    )
}

export default Actividad
