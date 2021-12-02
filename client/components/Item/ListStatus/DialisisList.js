import axios from 'axios'
import React, { useContext, useState } from 'react'
import {Row,Col,Form} from 'react-bootstrap'
import { GlobalState } from '../../GlobalState'
const moment = require('moment')

function DialisisList({historial,deleteRegisterDialisis}) {
    const state = useContext(GlobalState)
    const [token] = state.token
    const [callback,setCallback]=state.Paciente.callback;
    let getDate = new Date(historial.updatedAt)
    let date = moment(getDate,'YYYY-MM-DD').format("YYYY-MM-DD, hh:mm A");
    const [labelEnable,setlabelEnable] = useState(false);
    const initialStatePresion = {  Dialisis:'' };
    const [dialisis,setDialisis] = useState(initialStatePresion);
    
    const handleChangeInput= e =>{
        const {name,value} = e.target
        setDialisis({...dialisis,[name]:value})
      }
    const updateRegisterPresion = async e => {
        try {    
            await axios.put(`/api/upDia/${historial._id}`,{...dialisis},{
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
    }

    const labelUp = () => {
        return (
        <>
      
            <Form.Control  type="date" name="Dialisis" className="labelCommon" min="1900-01-01" max="2021-12-31"  size="sm" defaultValue={historial.Dialisis}  onChange={handleChangeInput}/>

        </>
        )
    }
    const  buttonBlock = () => {
        return (
            <>
                <button className="btn badge badge-dark" onClick={() => updateRegisterPresion(historial._id)} type="submit">Actualizar</button>
            </>
        )
    }
    const changeState=()=>{
        setlabelEnable(true);
      }
    
    return (
        <>
        
            <Row>
                <Form.Label  className="textList" lg={10} >
                Dialisis registrado en la fecha  &nbsp; { labelEnable ? labelUp(): ( <b>{historial.Dialisis} </b>  )} &nbsp;&nbsp;
                </Form.Label>
                <button type="submit" className="btn badge badge-danger" onClick={() => deleteRegisterDialisis(historial._id)}>Eliminar</button>&nbsp;
                 {labelEnable ?  buttonBlock() : (<button className="btn badge badge-warning" onClick = {changeState}>Actualizar</button>)} 
            </Row>
            <br/>
        </>
    )
}
export default DialisisList
