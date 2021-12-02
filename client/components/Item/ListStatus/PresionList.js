import axios from 'axios'
import React, { useContext, useState } from 'react'
import {Row,Col,Form} from 'react-bootstrap'
import { GlobalState } from '../../GlobalState'
const moment = require('moment')


function PresionList({historial,deleteRegisterPresion,updateRegisterPresion}) {
    const state = useContext(GlobalState)
    const [token] = state.token
    const [callback,setCallback]=state.Paciente.callback;
    let getDate = new Date(historial.updatedAt)
    let date = moment(getDate,'YYYY-MM-DD').format("YYYY-MM-DD, hh:mm A");
    const [labelEnable,setlabelEnable] = useState(false);
    const initialStatePresion = { Presion:'' };
    const [presion,setPresion] = useState(initialStatePresion);

    const [idAct,setIdAct] = state.Paciente.idAct;
    const [dataPresion,setDataPresion] = useState(historial.Presion)
    const [modalOnEdit,modalsetOnEdit]=state.Paciente.modalOnEdit
    
    const handleChangeInput= e =>{
        const {name,value} = e.target
        setPresion({...presion,[name]:value})
      }
/*     const updateRegisterPresion = async e => {
        try {    
            await axios.put(`/api/upPresion/${historial._id}`,{...presion},{
                headers:{Authorization:token}
              })
              swal({icon:"success",text:`Registro Actualizado`,timer:"2000",buttons: false});  
              setCallback(!callback);
            }catch(err) {
            swal({
                title:"ERROR",
                text: err.response.data.msg,
                icon:"error",
                button:"OK"
            })
        }
    } */

    const labelUp = () => {
        return (
        <>
          <Col className="labelCommon"   md={3} >
            <Form.Control name="Presion" className="labelCommon"  type="number" size="sm" defaultValue={historial.Presion}  onChange={handleChangeInput}/>
          </Col>
        </>
        )
    }
    const  buttonBlock = () => {
      
        return (
            <>
                <button className="btn badge badge-dark" onClick={() =>   updateRegisterPresion(historial._id,presion)} type="submit">Actualizar</button>
            </>
        )
    }
    const changeState=()=>{
        modalsetOnEdit(true);
    
      }
    
    return (
        <>
        
            <Row>
                <Form.Label  className="textList" lg={10} >
                En la fecha {date} se registro el nivel de Presion de &nbsp; { modalOnEdit ? labelUp(): ( <b>{historial.Presion} </b>  )}
                </Form.Label>
                <button type="submit" className="btn badge badge-danger" onClick={() => deleteRegisterPresion(historial._id)}>Eliminar</button>&nbsp;
                 {modalOnEdit ?  buttonBlock() : (<button className="btn badge badge-warning" onClick = { changeState}>Actualizar</button>)} 
            </Row>
            <br/>
        </>
    )
}

export default PresionList
/* variables de asociasion 
determinar que datos influyen la diabetes
regresion con la abse de datos del inegie para saber la relacion de que actividad se realiza
*/