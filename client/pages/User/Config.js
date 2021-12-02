import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../components/GlobalState';
import Router from 'next/router';
import {Modal,Button,Table,Form} from 'react-bootstrap';
import Image from 'next/image'
import profilePic from '../../public/vigilant.png';
import axios from 'axios';
import ListSuper from '../../components/Item/ListAdminControl/UserStatus'

function Config() {
  const initialState = {
    role:'',   
}
    const state = useContext(GlobalState);
    const [islogged]= state.User.isLogged
    const [loaded,setLoaded] = useState(false)
    const [singInData]= state.User.perfilInfo
    const [isAdmin]= state.User.isAdmin
    const [token] = state.token
    const [numPatient] = state.User.numPatient
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
  /* ROLE */
    const [iSuperAdmin]= state.User.super
    const [AllData] = state.Paciente.AllSuperData;
    const [idUserS,setIdUserS] = state.Paciente.idUserS
    const [ShowRole,setShowRole] = useState(false);
    const [modalOnEdit,modalsetOnEdit] = state.Paciente.modalOnEdit
    const [nameRole,setNameRole] = useState('')
    const [userRole,setUserRole] = useState('')

    const [roleChange,setRoleChange] = useState(initialState)
    const [callback,setCallback]=state.Paciente.callback

    
    const handleClose = () => {
      setShow(false);
      modalsetOnEdit(false);
      setIdUserS('')
      setNameRole('')
    }
    
    const handleChangeInput=e=>{
      const {name,value}=e.target
      setRoleChange({...roleChange,[name]:value})
  }

    useEffect(() => {
      if(idUserS){
        modalsetOnEdit(true)
          AllData.forEach(p => {
              if(p._id === idUserS){
                  /* setPaciente(paciente) */
                  setShowRole(true);
                  setNameRole(p.name)
                  setUserRole(p.role)
                 
              }
          })
      }else {
         /*  setPaciente(initialState) */
         modalsetOnEdit(false)
      }
  },[idUserS,AllData])
/*   source: '/api/deleteUser/:id',
  destination: 'http://localhost:5000/api/deleteUser/:id' */
    
    const deleteallS=async(id)=>{
  
    try{
      swal({
        title:"Seguro?",
        text: "Quieres Eliminar este Usuario?",
        icon:"warning",
        buttons:["No","Yes"]
      }).then(async(res)=> {
        if(res) {
          const deleteAct=axios.delete(`/api/deleteUser/${id}`)
          await deleteAct
          swal({icon:"success",text:"Usuario Eliminado",timer:"2000", buttons: false}).then(function(){
              setCallback(!callback)
          },1000)
          setShow(false);
          setIdUserS('');
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
const handleSubmit = async e=> {
  e.preventDefault()
  try{
    await axios.put(`/api/ChangeRole/${idUserS}`,{...roleChange},{
      headers:{Authorization: token}
    })
    swal({icon:"success",title:"Usuario Actualizado",text:"Cambio de role",timer:"2000"}).then(function(){
      setCallback(!callback)
    });

  }catch(err){

  }
}

const ToolAdmin = () => {
  return (
  <>
  <React.Fragment>
    <Table className="text-center table-inverse  table-borderless shadow-lg  rounded" variant="dark"   hover  size="sm" responsive="sm">
            <thead>
                        <tr>
                        <th>Nombre de Usuario</th>
                        <th>Correo</th>
                        <th>Opciones Role</th>
                        </tr>
                    </thead>
                    <tbody className="table-hover">
                        {
                          AllData.map(allS =>{
                            return <ListSuper key={allS._id} allS={allS} deleteallS={deleteallS}/>
                            })
                        }
                    </tbody>
            </Table>
      </React.Fragment>
  </>
  )
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
{/*         <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Actualizar informacion</Modal.Title>
            </Modal.Header>
            <Modal.Body>Completa los datos</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
 */}


        <Modal show={modalOnEdit} onHide={handleClose}  animation={false}>
            <Modal.Header closeButton>
            <Modal.Title>Actualizar Role del usuario: {nameRole}</Modal.Title>
            </Modal.Header>
            <Modal.Body>  
            <Form onSubmit={handleSubmit}>           
              <Form.Group >
                <Form.Label>Tipos de role </Form.Label>
                  <select  className="form-select form-select-lg mb-3"  name="role" defaultValue={userRole} onChange={handleChangeInput}> 
                    <option value="1" >Medico</option>
                    <option value="2" >Usuario Comun</option>
                    <option value="3" >Admin</option>
                  </select>
              </Form.Group>
              <Button variant="primary" type="submit" >
                  Cambiar Role
                </Button>
            </Form>
            
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Cerrar
            </Button>
 
            
            </Modal.Footer>
            
        </Modal>


  <br/>
            <div className="card card-widget widget-user">
              <div className="widget-user-header text-dark config">
                <h3 className="widget-user-username text-right">{singInData.name} {singInData.lastname}</h3>
                <h5 className="widget-user-desc text-right">{singInData.ocupation}</h5>
              </div>
              <div className="widget-user-image">
                <Image className="img-circle" src={profilePic} alt="User Avatar" width="120" height="120"/>
              </div>
              <div className="card-footer">
                <div className="row">
                  <div className="col-sm-4 border-right">
                    <div className="description-block">
                      <h5 className="description-header">Email</h5>
                      <span className="description-text">{singInData.email}</span>
                    </div>
                 
                  </div>
               
                  <div className="col-sm-4 border-right">
                    <div className="description-block">
                      <h5 className="description-header">Estatus</h5>
                      <span className="description-text">          
                      {
                        isAdmin ? <h1>Medico</h1> : <h1>Usuario</h1> 
                      }
                      {
                        iSuperAdmin ? <h1>Admin</h1> : <h1></h1>
                      }
                      </span>
                    </div>
                  </div>
             
                  <div className="col-sm-4">
                    <div className="description-block">
                      <h5 className="description-header">Numero de Pacientes a cargo</h5>
                      <span className="description-text">{numPatient}</span>
                    </div>
                   
                  </div>
              
                </div>
               {/*  <button onClick={handleShow} className="btn btn-primary">Actualizar</button> */}
              </div>
            </div>
            {
              iSuperAdmin ? ToolAdmin() : <h1></h1>
            }
      </>
    )
}

export default Config
