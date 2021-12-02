import axios from 'axios'
import React, { useContext, useState } from 'react'
import {Row,Col,Form} from 'react-bootstrap'
import { GlobalState } from '../../GlobalState'
const moment = require('moment')

function GlucosaList({historial,deleteRegisterGlucosa}) {
    const state = useContext(GlobalState)
    const [token] = state.token
    const [callback,setCallback]=state.Paciente.callback;
    let  getDate = new Date(historial.updatedAt)
    let date = moment(getDate,'YYYY-MM-DD').format("YYYY-MM-DD, hh:mm A");
    const [labelEnable,setlabelEnable] = useState(false);
    const initialStateGlucosa = { Glucosa:'' };
    const [glucosa,setGlucosa] = useState(initialStateGlucosa);
    
    const handleChangeInput= e =>{
        const {name,value} = e.target
        setGlucosa({...glucosa,[name]:value})
      }

    const updateRegisterGlucosa = async e => {
        try {    
            await axios.put(`/api/upGlucosa/${historial._id}`,{...glucosa},{
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
          <Col className="labelCommon"   md={3} >
            <Form.Control name="Glucosa" className="labelCommon"  type="number" size="sm" defaultValue={historial.Glucosa}  onChange={handleChangeInput}/>
          </Col>
        </>
        )
    }
    const  buttonBlock = () => {
        return (
            <>
                <button className="btn badge badge-dark" onClick={() => updateRegisterGlucosa(historial._id)} type="submit">Actualizar</button>
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
                En la fecha {date} se registro el nivel de glucosa de &nbsp; { labelEnable ? labelUp(): ( <b>{historial.Glucosa} </b>  )}
                </Form.Label>
                <button type="submit" className="btn badge badge-danger" onClick={() => deleteRegisterGlucosa(historial._id)}>Eliminar</button>&nbsp;
                 {labelEnable ?  buttonBlock() : (<button className="btn badge badge-warning" onClick = {changeState}>Actualizar</button>)} 
            </Row>
            <br/>
        </>
    )
}

export default GlucosaList
