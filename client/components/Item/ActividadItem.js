import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare,faProcedures,faFolderPlus,faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';
import Image from 'next/image'

import profilePic from '../../public/testuser.png'
import { Modal ,Container,Col,Row,Button,Form} from 'react-bootstrap'
import axios from 'axios';
import swal from 'sweetalert';
import { GlobalState } from '../GlobalState';
import  GlucosaList  from './ListStatus/GlucosaList';
import  PresionList  from './ListStatus/PresionList';
import  DiaList  from './ListStatus/DialisisList';
import DateGif from '../../public/date3.gif'

const moment = require('moment')


function ActividadItem({actividad}) {
  const initialStateGlucosa = {
    Glucosa:'',
    PacienteId:actividad._id
  }
  const initialStatePresion = {
    Presion:'',
    PacienteId:actividad._id
  }
  const initialStateDialisis = {
    Dialisis:'',
    PacienteId:actividad._id
  }
  const [modalShow, setModalShow] = useState(false);
  const [modalPresion,setModalPresion] = useState(false);
  const [modalDialis,setModalDialisis] = useState(false);
  const [modalGlucosaShow,setModalGlucosaShow] = useState(false);
  const [modalPresionShow,setModalPresionShow] = useState(false);
  const [modalDialisisShow,setModalDialisisShow] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const state = useContext(GlobalState);
  const [token] = state.token

  const [glucosa,setGlucosa] = useState(initialStateGlucosa);
  const [presion,setPresion] = useState(initialStatePresion);
  const [dialisis,setDialisis] = useState(initialStateDialisis);

  const [callback,setCallback]=state.Paciente.callback;

  const [labelEnable,setlabelEnable] = useState(false);
  const [id,setID] =useState('')
  const [modalOnEdit,modalsetOnEdit]=state.Paciente.modalOnEdit

  const [GlucosaHistorial,setGlucosaHistorial] = useState([]);
  const [PresionHistorial,setPresionHistorial] = useState([]);
  const [dialisisHistorial,setDialisisHistorial] = useState([]);

  const [hecho,setHecho] = useState('');

  const [completo,setCompleto] = useState(false);
  const [proeceso,setProceso] = useState(false);
  const [sinAct,setSinact] = useState(false);
  useEffect(()=>{
    const getHistorialGlucosa = async () =>{
      const resG= await axios.get(`/api/getGlucosa/${actividad._id}`,{
        headers: {Authorization: token}
     })
     setGlucosaHistorial(resG.data)

     const resP= await axios.get(`/api/getPresion/${actividad._id}`,{
      headers: {Authorization: token}
     })
     setPresionHistorial(resP.data)

     const resD= await axios.get(`/api/getDia/${actividad._id}`,{
      headers: {Authorization: token}
     })
     setDialisisHistorial(resD.data)

     const list = await axios.get(`/api/getAct/${actividad._id}`,{
      headers:{Authorization:token}
    }) 

    if (list.data.porcentDone == null) {
      setHecho(0)
    }else {
      setHecho(list.data.porcentDone)
      if( list.data.porcentDone == "100"){
        setCompleto(true)
      }else if (list.data.porcentDone >= 50 && list.data.porcentDone <= 99){
        setProceso(true)
      } else if (list.data.porcentDone >= 1 && list.data.porcentDone <= 49){
        setSinact(true)
      }
    }
    



    }
    getHistorialGlucosa()
  },[callback])
  
  /* SET GLUCOSA, PRESION, DIALISIS  */
  const handleChangeInput= e =>{
    const {name,value} = e.target
    setGlucosa({...glucosa,[name]:value})
  }

  const handleChangePresion= e =>{
    const {name,value} = e.target
    setPresion({...presion,[name]:value})
  }

  const handleChangeDialisis= e =>{
    const {name,value} = e.target
    setDialisis({...dialisis,[name]:value})
  }


  const handleClose=()=>{
    setModalAdd(false);
    setGlucosa(initialStateGlucosa)
    setPresion(initialStatePresion)
    setDialisis(initialStateDialisis)
    modalsetOnEdit(false)
  } 
  /* SET GLUCOSA, PRESION, DIALIISIS */

  /* UPDATE */
  const editDialisis =  async (id,name) => {
    setID(id)
    setDialisis(name)
   modalsetOnEdit(true)
   setlabelEnable(true);
  }



/* END UPDATE */

/* CARD STATUS */


/* CARD STATUS */

/* CREATE */
  const handleSubmit = async  e => {
    e.preventDefault()
    try {
       const result= await axios.post('/api/postGlucosa',{...glucosa},{
         headers:{Authorization:token}
       })
       swal({icon:"success",title:result.data.msg, text:`Nuevo Registro para:  ${actividad.name}`,timer:"2000",buttons: false});
       setCallback(!callback);
       setModalAdd(false);
       setModalShow(false);
       setModalGlucosaShow(false);
    }catch(err){
      swal({
        title:"ERROR",
        text: err.response.data.msg,
        icon:"error",
        button:"OK"
    })
    }
  }

  const handleSubmitPresion = async  e => {
    e.preventDefault()
    try {
       const result= await axios.post('/api/postPresion',{...presion},{
         headers:{Authorization:token}
       })
       swal({icon:"success",title:result.data.msg, text:`Nuevo  Registro para:  ${actividad.name}`,timer:"2000",buttons: false});
       setCallback(!callback);
       setModalAdd(false);
       setModalPresion(false)
       setModalPresionShow(false);
    }catch(err){
      swal({
        title:"ERROR",
        text: err.response.data.msg,
        icon:"error",
        button:"OK"
    })
    }
  }
  

  const handleSubmitDialisis = async  e => {
    e.preventDefault()
    try {
       const result= await axios.post('/api/postDia',{...dialisis},{
         headers:{Authorization:token}
       })
       swal({icon:"success",title:result.data.msg, text:`Nuevo  Registro para:  ${actividad.name}`,timer:"2000",buttons: false});
       setCallback(!callback);
       setModalAdd(false);
       setModalDialisis(false)
       setModalDialisisShow(false);
    }catch(err){
      swal({
        title:"ERROR",
        text: err.response.data.msg,
        icon:"error",
        button:"OK"
    })
    }
  }


  /* DELETE */
  const deleteRegisterGlucosa = async (id) => {
    try {
      swal({
        title:"Seguro?",
          text: "Deseas eliminar este registro de glucosa?",
          icon:"warning",
          buttons:["No","si"]
      }).then(async (res) => {
      if(res) {
          let deleteRegister = axios.delete(`/api/deleteGlucosa/${id}`,{
            headers:{Authorization:token}
          })
          await deleteRegister 
          setCallback(!callback)
          swal({icon:"success",text:"Registro Eliminado",timer:"2000", buttons: false}).then(function(){},1500)
        }
      })
    }catch(err) {
      swal({
        title:"¡Ups",
        text: err.response.data.msg,
        icon:"error",
        button:"OK"
        })
    }
  }


 


  const deleteRegisterPresion = async (id) => {
    try {
      swal({
        title:"Seguro?",
          text: "Deseas eliminar este registro de presion?",
          icon:"warning",
          buttons:["No","si"]
      }).then(async (res) => {
      if(res) {
          let deleteRegister = axios.delete(`/api/deletePresion/${id}`,{
            headers:{Authorization:token}
          })
          await deleteRegister 
          setCallback(!callback)
          swal({icon:"success",text:"Registro Eliminado",timer:"2000", buttons: false}).then(function(){},1500)
        }
      })
    }catch(err) {
      swal({
        title:"¡Ups",
        text: err.response.data.msg,
        icon:"error",
        button:"OK"
        })
    }
  }


  const updateRegisterPresion = async (id,name) => {

    try {    
        await axios.put(`/api/upPresion/${id}`,{name},{
            headers:{Authorization:token}
          })
          setCallback(!callback);
          setModalPresion(false)
          modalsetOnEdit(false)

          swal({icon:"success",text:`Registro Actualizado`,timer:"3000",buttons: false}); 
          
        }catch(err) {
        swal({
            title:"ERROR",
            text: err.response.data.msg,
            icon:"error",
            button:"OK"
        })
    }
}

  const deleteRegisterDialisis = async (id) => {
    try {
      swal({
        title:"Seguro?",
          text: "Deseas eliminar este registro de Dialisis?",
          icon:"warning",
          buttons:["No","si"]
      }).then(async (res) => {
      if(res) {
          let deleteRegister = axios.delete(`/api/deleteDia/${id}`,{
            headers:{Authorization:token}
          })
          await deleteRegister 
          setCallback(!callback)
          swal({icon:"success",text:"Registro Eliminado",timer:"2000", buttons: false}).then(function(){},1500)
        }
      })
    }catch(err) {
      swal({
        title:"¡Ups",
        text: err.response.data.msg,
        icon:"error",
        button:"OK"
        })
    }
  }
 
    return (
        <>
          <tr>
            <td>
              <Link href="/Estatus/[actividad]" as={`/Estatus/${actividad._id}`}>
                <a className="btn  btn-sm" >
                   {/*  <FontAwesomeIcon className="circlePaciente" icon={faProcedures} /> */}
                    <Image src={DateGif} alt="log-Activities" />
                </a></Link>  
            </td>
            <td>
              <ul className="list-inline">
                <li className="list-inline-item">
                    <Image alt="Avatar" className="table-avatar"  width="120" height="120"  src={actividad.images.url}/>
                </li>
              </ul>
            </td>

            <td className="project_progress">
              <div className="progress progress-sm">
                {/* <div className="progress-bar bg-info" role="progressbar" aria-valuenow="57" aria-valuemin="0" aria-valuemax="100" style={{width:`${hecho}%`}}></div> */}
                {
                  completo ? <div className="progress-bar bg-success" role="progressbar" aria-valuenow="57" aria-valuemin="0" aria-valuemax="100" style={{width:`${hecho}%`}}></div> : proeceso ? <div className="progress-bar bg-warning" role="progressbar" aria-valuenow="57" aria-valuemin="0" aria-valuemax="100" style={{width:`${hecho}%`}}></div> : <div className="progress-bar bg-danger" role="progressbar" aria-valuenow="57" aria-valuemin="0" aria-valuemax="100" style={{width:`${hecho}%`}}></div>
                }

              </div>
                <small>
                   {actividad.name} {hecho}% Completado
                </small>
            </td> 
            <td className="project-state">
                {
                  completo ? <span className="badge badge-success">Actividades Completadas</span> : proeceso ? <span className="badge badge-warning">Actividades en proceso</span> : <span className="badge badge-danger">Revision </span>
                }
            </td>
{/*             <td className="project-actions text-right">
        
            <button className="btn btn-dark btn-sm" onClick={() => setModalDialisis(true)}>
                <FontAwesomeIcon icon={faFolderPlus} />&nbsp;
               Dias en que se realizo dialisis
            </button>&nbsp;

            <button className="btn btn-dark btn-sm" onClick={() => setModalPresion(true)}>
                <FontAwesomeIcon icon={faFolderPlus} />&nbsp;
                Niveles de Presion
            </button>&nbsp;
           
            <button className="btn btn-dark btn-sm" onClick={() => setModalShow(true)}>
                <FontAwesomeIcon icon={faFolderPlus} />&nbsp;
                Niveles de Glucosa
            </button>&nbsp; */}
{/*               <a className="btn btn-dark btn-sm" onClick={() => setModalShow(true)}>
                <FontAwesomeIcon icon={faExclamationTriangle} />&nbsp;
               Niveles de Glucosa moment('2019-10-17T02:00:00.000Z').format('YYYY-MM-DD');
              </a> */}

{/*           
              <button className="btn  btn-sm">
                <FontAwesomeIcon className="commonButton" color="orange" icon={faPlusSquare} size="3x"  onClick={() => setModalAdd(true)} />
              </button>
            </td> */}
          </tr>

          <MydModalWithGrid show={modalShow}  onHide={() => setModalShow(false)} />
          <PresionModalWithGrid show={modalPresion} onHide={() =>  setModalPresion(false)}/>
          <DialisoisModalWithGrid show={modalDialis} onHide = { () => setModalDialisis(false)}/> 
          

          <Modal show={modalAdd} onHide={handleClose} >
          <Modal.Header closeButton>
          <Modal.Title>Agregar Nuevos registros para {actividad.name}:</Modal.Title>
        </Modal.Header>
            <Modal.Body>
              <div className="ButtonGlucosa ">
                <FontAwesomeIcon  className="setup noBackGroundIcon"  icon={faPlusCircle} size="3x"  onClick={() => setModalDialisisShow(true)} />
                <div className = "text-Satus-Icon" ><b> Agregar Dialisis</b> </div> 
              </div>
                  <br/>
              <div className="ButtonGlucosa ">
                <FontAwesomeIcon  className=" setup noBackGroundIcon" icon={faPlusCircle} size="3x"  onClick={() => setModalGlucosaShow(true)} />
                <div className = "text-Satus-Icon" ><b> Agregar Glucosa</b> </div> 
              </div>
                  <br/>
              <div className="ButtonGlucosa ">
                <FontAwesomeIcon className="setup noBackGroundIcon" icon={faPlusCircle} size="3x"  onClick={() => setModalPresionShow(true)} />
                <div className = "text-Satus-Icon" ><b> Agregar Presion</b> </div> 
              </div>

            </Modal.Body>
            <br/>
            
          <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Cancelar
              </Button>
          </Modal.Footer>
        </Modal>  


        {/* MODAL PRESION */}
        <Modal show={modalPresionShow} onHide={() => setModalPresionShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Presion</Modal.Title>
        </Modal.Header>
          <Modal.Body>
          <Form onSubmit={handleSubmitPresion}> 
              <Form.Row>
                <Form.Group as={Col} >
                    <Form.Label>Nuevo registro de Presion para {actividad.name}: </Form.Label>
                      <Form.Control name="Presion" type="number" placeholder="Nivel de Presion" step="00.01"onChange={handleChangePresion}/>
                </Form.Group>
              </Form.Row>
                <Button variant="primary" type="submit" >
                  Crear
                </Button>
            </Form>

          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalPresionShow(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      {/* GLUCOSA */}

      <Modal show={modalGlucosaShow} onHide={() => setModalGlucosaShow(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Glucosa</Modal.Title>
        </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}> 
              <Form.Row>
                <Form.Group as={Col} >
                    <Form.Label>Nuevo registro de Glucosa para {actividad.name}: </Form.Label>
                      <Form.Control name="Glucosa" type="number" placeholder="Nivel de Glucosa" step="00.01"onChange={handleChangeInput}/>
                </Form.Group>
              </Form.Row>
                <Button variant="primary" type="submit" >
                  Crear
                </Button>
            </Form> 
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalGlucosaShow(false)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

      {/*   DIALISIS*/}

      <Modal show={modalDialisisShow}  onHide={() => setModalDialisisShow(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Dialisis</Modal.Title>
        </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmitDialisis}> 
              <Form.Row>
                <Form.Group as={Col} >
                    <Form.Label>Nuevo registro de Dialisis para {actividad.name}: </Form.Label>
                      <Form.Control name="Dialisis" type="date"   onChange={handleChangeDialisis} min="1900-01-01" max="2021-12-31"/>
                </Form.Group>
              </Form.Row>
                <Button variant="primary" type="submit" >
                  Crear
                </Button>
            </Form> 
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() =>setModalDialisisShow(false)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
     </>
    )

    function MydModalWithGrid(props) {
      return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Historial de pruebas
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="show-grid">
            <Container>
               {
              GlucosaHistorial.map(historial => { 
                  return <GlucosaList key={historial._id} historial={historial} deleteRegisterGlucosa={deleteRegisterGlucosa}/>
                })
              }  
     
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Cerrar</Button>
          </Modal.Footer>
        </Modal>    
      );
    }

    function PresionModalWithGrid(props) {
      return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Historial de tomas de Presion
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="show-grid">
            <Container>
               {
                PresionHistorial.map(historial => { 
                 return <PresionList key={historial._id} historial={historial} deleteRegisterPresion = {deleteRegisterPresion} updateRegisterPresion = {updateRegisterPresion} />
               })
              }  
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Cerrar</Button>
          </Modal.Footer>
        </Modal>    
      );
    }

    function DialisoisModalWithGrid(props) {
      return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Historial de Dialisis
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="show-grid">
            <Container>
             {
              dialisisHistorial.map(historial => { 
                 return <DiaList key={historial._id} historial={historial} deleteRegisterDialisis = {deleteRegisterDialisis} />
                })
              } 
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Cerrar</Button>
          </Modal.Footer>
        </Modal>    
      );
    }
  }


  
export default ActividadItem
