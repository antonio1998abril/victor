import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../components/GlobalState';
import Router,{ useRouter } from 'next/router';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFileMedical} from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import profilePic from '../../public/testuser.png'
import profilePicM from '../../public/mujerBase.png'
import ExpedienteItem from '../../components/Item/Expediente';
import Link from 'next/link';
import swal from 'sweetalert';

const Expediente =({data}) =>{
  const state = useContext(GlobalState);
  const [loaded,setLoaded] = useState(false)
  const [islogged]= state.User.isLogged
  const [token] = state.token

  const [actualPaciente]= useState(data[0])
  const [actualExpediente]= useState(data[0].Expediente)
  const [actualRegimen] = useState(data[0].Regimen)
  /* const [allExpedientes] = useState([data[0].allExpedientes]) */
  const [callback,setCallback] = state.Paciente.callback
  const [mujer,setMujer] = useState(false);

  const ExpedienteState = { 
    Leucocitos:actualExpediente.Leucocitos,
    Eritrocitos:actualExpediente.Eritrocitos,
    Hemoglobina:actualExpediente.Hemoglobina,
    Hematocrito:actualExpediente.Hematocrito,
    Volumencorpuscularmedio:actualExpediente.Volumencorpuscularmedio,
    HemoglobinaGlucosilada:actualExpediente.HemoglobinaGlucosilada,
    Hemoglobinacorpuscularmedia:actualExpediente.Hemoglobinacorpuscularmedia,
    Concentracionmediadehemoglobinacorpuscular:actualExpediente.Concentracionmediadehemoglobinacorpuscular,
    Anchodedistribuciondeeritrocitos:actualExpediente.Anchodedistribuciondeeritrocitos,
    Plaquetas:actualExpediente.Plaquetas,
    Neutrofilos:actualExpediente.Neutrofilos,
    Linfocitos:actualExpediente.Linfocitos,
    Monocitos:actualExpediente.Monocitos,
    Eosinofilos:actualExpediente.Eosinofilos,
    Basofilos:actualExpediente.Basofilos,
    HemoglobinaglucosiladaHbA1c:actualExpediente.HemoglobinaglucosiladaHbA1c,
    BiometriahematicacompletaBHC:actualExpediente.BiometriahematicacompletaBHC,
    Gravedadespecifica:actualExpediente.Gravedadespecifica,
    ReaccionPH:actualExpediente.ReaccionPH,
    Esterasaleucocitaria:actualExpediente.Esterasaleucocitaria,
    Nitritos:actualExpediente.Nitritos,
    Proteinas:actualExpediente.Proteinas,
    Glucosa:actualExpediente.Glucosa,
    EritrocitosHb:actualExpediente.EritrocitosHb,
    Bilirubinas:actualExpediente.Bilirubinas,
    Urobilinogeno:actualExpediente.Urobilinogeno,
    Cetonas:actualExpediente.Cetonas,
    acidourico:actualExpediente.acidourico,
    Creatinina:actualExpediente.Creatinina,
    NitrogenoureicoBUN:actualExpediente.NitrogenoureicoBUN,
    Urea:actualExpediente.Urea,
    ColesterolHDL:actualExpediente.ColesterolHDL,
    ColesterolLDL:actualExpediente.ColesterolLDL,
    Trigliceridos:actualExpediente.Trigliceridos,
    Colesteroltotal:actualExpediente.Colesteroltotal,
  }
  
  const RegimenState = {
    Dieta:actualRegimen.Dieta,
    Ejercicios:actualRegimen.Ejercicios,
  }

  /* Verify if user is Logged */
  useEffect(() => {
    if(!islogged) {
      let timerFunc = setTimeout(() => {
        Router.push('/login')
      }, 100);
      return () => clearTimeout(timerFunc);
  }else{ 
      setLoaded(true) 
    }

   if(actualPaciente.sexo == 'mujer') setMujer(true)
}, [!islogged,mujer]);


/* SAVE INFORMATION */
const [expediente, setExpediente] = useState(ExpedienteState)
const [regimen, setRegimen] = useState(RegimenState)

/* HSITORIAL */
const setHistorial = async e => {
  e.preventDefault()
  try {
    if((Object.values({...expediente}).every(data => data === ''))  && (Object.values({...regimen}).every(data => data === '')) ) {
      swal({icon:"warning",title:"Esta todo vacio, guarda algun dato que sea de importancia cuando menos",text:"Es importante guardar aunque sea un dato",timer:"9000"})
    } else {
      await axios.post(`/api/NewHistorial/${actualPaciente._id}`,{...expediente,...regimen},{
        headers:{Authorization: token}
      })
      swal({icon:"success",title:"Agregado Al Historial",text:"Historial Actualizado",timer:"2000"}).then(function(){
        Router.push(`/Pacientes/${actualPaciente._id}`)
      });
    }

  } catch(err) {
    swal ({
      title:"ERROR",
      text:err.response.data.msg,
      icon:"error",
      button:"OK"
    })
  }
}
const DeleteHistorial = async (id)=> {
  try {
    swal({
      title:"Seguro?",
      text: "Quieres Eliminar este Expediente para siempre?",
      icon:"warning",
      buttons:["No","Yes"]
  }).then(async (res)=>{
      if(res){
        const deleteItem = axios.delete(`/api/DeleteHistorial/${id}`)
        await deleteItem
        swal({icon:"success",text:"Expediente Eliminado",timer:"2000", buttons: false}).then(function(){
          Router.push(`/Pacientes/${actualPaciente._id}`)
        },1000)
      }
  })

  }catch(err){
    swal ({
      title:"ERROR",
      text:err.response.data.msg,
      icon:"error",
      button:"OK"
    })
  }
}
/* HISTORIAL */

const handleChangeExpediente = e =>{
  e.preventDefault()
  const {name,value}=e.target
  setExpediente({...expediente,[name]:value})
}  

const handleChangeRegimen = e =>{
  const {name,value}=e.target
  setRegimen({...regimen,[name]:value})
}  

const handleSubmitExpediente=async e=>{
  e.preventDefault()
  try{  
       await axios.post(`/api/createExpediente/${actualPaciente._id}`,{...expediente},{
        headers:{Authorization: token}
       })
       swal({icon:"success",title:"Expediente Actualizado",text:"Se agrego al expediente!!",timer:"2000"}).then(function(){
        setCallback(!callback)
      });
  }catch(err){
   swal({
       title:"ERROR",
       text:err.response.data.msg,
       icon:"error",
       button:"OK"
   })
  }
  
}

const handleSubmitRegimen=async e=>{
  e.preventDefault()
  try{
        await axios.post(`/api/createRegimen/${actualPaciente._id}`,{...regimen},{
          headers:{Authorization: token}
         })
       swal({icon:"success",text:"Regimen Agregadoo!!",timer:"2000"}).then(function(){
        setCallback(!callback)
      });
  }catch(err){
   swal({
       title:"ERROR",
       text:err.response.data.msg,
       icon:"error",
       button:"OK"
   })
  }
  
}
/* SAVE INFORMATION */
if (!loaded) { return <div></div> }
   return (
    <div>
      <div className="expediente">
        <div className="info-expe">
        <div className="img-container">
          {
            mujer ?  <Image id="profile-pic" src={profilePicM} alt="profile_pic" width="200" height="200"/> : <Image id="profile-pic" src={profilePic} alt="profile_pic" width="200" height="200"/>  
          }
          <div id="profile-patient-name">{actualPaciente.name} {actualPaciente.lastname}</div>
        </div>

        </div>
        <div className="info-expe-data">
          <div className="info-title-data">
            Informacion
          </div>
        <div><span><b>Telefono: </b></span> {actualPaciente.tel}</div>
        <div><span><b>Email:</b></span> {actualPaciente.email}</div>
        <div><span><b>Peso: </b></span> {actualPaciente.peso} {actualPaciente.altura}</div>
        <div><span><b>Sexo: </b></span> {actualPaciente.sexo}</div>
        <div><span><b>Edad: </b></span> {actualPaciente.edad}</div>
        <div><span><b>Altura: </b></span> {actualPaciente.altura}</div>
        <div><span><b>Diabetes Tipo: </b></span> {actualPaciente.diabetesTipo}</div>
        <div><span><b>Inicio Enfermedad: </b></span> {actualPaciente.IncioEnfermedad}</div> 
        </div>

        <div className="data-expe ">
        <div className="col-md-12">
         <div className="paciente card-info ">
              <div className="card-header">
                <h3 className="card-title-paciente">Datos de Laboratorio</h3>
              </div>

              <form className="form-horizontal"  onSubmit={handleSubmitExpediente}>
                <div className="card-body expe-row">

           
                <div className="form-group ">
                    <label  className="col-sm-12 col-form-label">Nivel Hemoglobina Glicosilada (HbA1c) </label>
                    <div className="col-sm-12">
                      <input name="HemoglobinaglucosiladaHbA1c" min="0" max="1000"
                      value={expediente.HemoglobinaglucosiladaHbA1c} type="number"
                      onChange={handleChangeExpediente}  className="form-control"  placeholder="Hemoglobina Glicosilada"/>
                    </div>
                </div>

                <div className="form-group ">
                    <label  className="col-sm-12 col-form-label">Leucocitos por: miles/μL</label>
                    <div className="col-sm-12">
                      <input name="Leucocitos" min="0" max="1000"
                      value={expediente.Leucocitos} type="number"
                      onChange={handleChangeExpediente}  className="form-control"  placeholder="Leucocitos"/>
                    </div>
                </div>
                <div className="form-group ">
                    <label  className="col-sm-12 col-form-label">Eritrocitos por: millones/μL</label>
                    <div className="col-sm-12">
                      <input name="Eritrocitos" min="0" max="1000"
                      value={expediente.Eritrocitos} type="number"
                      onChange={handleChangeExpediente}  className="form-control"  placeholder="Eritrocitos"/>
                    </div>
                </div>
                <div className="form-group ">
                    <label  className="col-sm-12 col-form-label">Hemoglobina por: g/dL </label>
                    <div className="col-sm-12">
                      <input name="Hemoglobina" min="0" max="1000"
                      value={expediente.Hemoglobina} type="number"
                      onChange={handleChangeExpediente}  className="form-control"  placeholder="Hemoglobina"/>
                    </div>
                </div>
                <div className="form-group ">
                    <label  className="col-sm-12 col-form-label">Hematocrito  por: %</label>
                    <div className="col-sm-12">
                      <input name="Hematocrito" min="0" max="1000"
                      value={expediente.Hematocrito} type="number"
                      onChange={handleChangeExpediente}  className="form-control"  placeholder="Hematocrito"/>
                    </div>
                </div>
                <div className="form-group ">
                    <label  className="col-sm-12 col-form-label">Volumen corpuscular medio  fL</label>
                    <div className="col-sm-12">
                      <input name="Volumencorpuscularmedio" min="0" max="1000"
                      value={expediente.Volumencorpuscularmedio} type="number"
                      onChange={handleChangeExpediente}  className="form-control"  placeholder="Volumen corpuscular medio"/>
                    </div>
                </div>
                <div className="form-group ">
                    <label  className="col-sm-12 col-form-label">Hemoglobina corpuscular media pg</label>
                    <div className="col-sm-12">
                      <input name="Hemoglobinacorpuscularmedia" min="0" max="1000"
                      value={expediente.Hemoglobinacorpuscularmedia} type="number"
                      onChange={handleChangeExpediente}  className="form-control"  placeholder="Hemoglobina corpuscular media"/>
                    </div>
                </div>
                <div className="form-group ">
                    <label  className="col-sm-12 col-form-label">Concentración media de hemoglobina corpuscular g/dL (%) </label>
                    <div className="col-sm-12">
                      <input name="Concentracionmediadehemoglobinacorpuscular" min="0" max="1000"
                      value={expediente.Concentracionmediadehemoglobinacorpuscular} type="number"
                      onChange={handleChangeExpediente}  className="form-control"  placeholder="Concentración media de hemoglobina corpuscular"/>
                    </div>
                </div>
                <div className="form-group ">
                    <label  className="col-sm-12 col-form-label">Ancho de distribución de eritrocitos 11.5 – 17.0 %</label>
                    <div className="col-sm-12">
                      <input name="Anchodedistribuciondeeritrocitos" min="0" max="1000"
                      value={expediente.Anchodedistribuciondeeritrocitos} type="number"
                      onChange={handleChangeExpediente}  className="form-control"  placeholder="Ancho de distribución de eritrocitos"/>
                    </div>
                </div>

                 <div className="form-group ">
                    <label  className="col-sm-12 col-form-label">Plaquetas por: miles/μL</label>
                    <div className="col-sm-12">
                      <input type="number"  min="0" max="1000" name="Plaquetas"
                      value={expediente.Plaquetas} 
                      onChange={handleChangeExpediente} className="form-control"  placeholder="Plaquetas"/>
                    </div>
                </div>
                
                <div className="form-group ">
                    <label  className="col-sm-12 col-form-label">Neutrofilos por:  %</label>
                    <div className="col-sm-12">
                      <input type="number" min="0" max="1000"  name="Neutrofilos"
                      value={expediente.Neutrofilos} 
                      onChange={handleChangeExpediente} className="form-control"  placeholder="Neutrofilos"/>
                    </div>
                </div>
                <div className="form-group ">
                    <label  className="col-sm-12 col-form-label">Linfocitos por: %</label>
                    <div className="col-sm-12">
                      <input type="number"  name="Linfocitos"
                      value={expediente.Linfocitos}  min="0" max="1000"
                      onChange={handleChangeExpediente} className="form-control"  placeholder="Linfocitos"/>
                    </div>
                </div>
                <div className="form-group ">
                    <label className="col-sm-12 col-form-label">Monocitos por: %</label>
                    <div className="col-sm-12">
                      <input type="number"  min="0" max="1000" name="Monocitos"
                      value={expediente.Monocitos} 
                      onChange={handleChangeExpediente} className="form-control"  placeholder="Monocitos"/>
                    </div>
                </div>
                <div className="form-group ">
                    <label className="col-sm-12 col-form-label">Basofilos por: %</label>
                    <div className="col-sm-12">
                      <input type="number"  min="0" max="1000" name="Basofilos"
                      value={expediente.Basofilos} 
                      onChange={handleChangeExpediente} className="form-control"  placeholder="Basofilos"/>
                    </div>
                </div> 
                <div className="form-group ">
                    <label className="col-sm-12 col-form-label">Eosinofilos por: %</label>
                    <div className="col-sm-15">
                      <input type="number" rows="2" min="0" max="1000" name="Eosinofilos"
                      value={expediente.Eosinofilos} 
                      onChange={handleChangeExpediente} className="form-control"  placeholder="Eosinofilos"/>
                    </div>
                </div> 



                </div>
                <div className="card-footer">
                  <button type="submit" className="btn btn-warning text-white font-weight-bold">Actualizar</button>
                </div>
            
              </form>
            </div> 
            </div>
          <div className="expe-row">
            <div className="col-md-6">
              <div className="paciente card-info ">
              <div className="card-header">
                <h3 className="card-title-paciente">Examen general de orina (EGO):</h3>
              </div>

              <form className="form-horizontal"   onSubmit={handleSubmitExpediente} >
                <div className="card-body">

                <div className="form-group row">
                    <label  className="col-sm-3 col-form-label"> Gravedadespecifica g/mL</label>
                    <div className="col-sm-9">
                      <input type="number" rows="2" min="0" max= "1000"  name="Gravedadespecifica"
                      value={expediente.Gravedadespecifica}
                      onChange={handleChangeExpediente} className="form-control"   placeholder="Gravedadespecifica"/>
                    </div>
                </div>

                <div className="form-group row">
                    <label  className="col-sm-3 col-form-label"> Reacción PH</label>
                    <div className="col-sm-9">
                      <input type="number" rows="2" min="0" max= "1000"  name="ReaccionPH"
                      value={expediente.ReaccionPH}
                      onChange={handleChangeExpediente} className="form-control"   placeholder="Reacción PH"/>
                    </div>
                </div>

                <div className="form-group row">
                    <label  className="col-sm-3 col-form-label"> Esterasa leucocitaria</label>
                    <div className="col-sm-9">
                      {/* <textarea type="number" rows="2"  min="0" max="1000" name="Esterasaleucocitaria"
                      value={expediente.Esterasaleucocitaria}
                      onChange={handleChangeExpediente} className="form-control"   placeholder="Esterasa leucocitaria"/> */}
                                 <select
                className="form-select form-select-lg mb-3"
                name="Esterasaleucocitaria"
                placeholder="Esterasa leucocitaria"
                defaultValue={expediente.Esterasaleucocitaria}
                onChange={handleChangeExpediente}
              >
                <option value="Ninguno">Ninguno</option>
                <option value="Positivo">Positivo</option>
                <option value="Negativo">Negativo</option>
              </select>
                    </div>
                </div>

                <div className="form-group row">
                    <label  className="col-sm-3 col-form-label">  Nitritos </label>
                    <div className="col-sm-9">
                      <select
                className="form-select form-select-lg mb-3"
                name="Nitritos"
                placeholder=" Nitritos"
                defaultValue={expediente.Nitritos}
                onChange={handleChangeExpediente}
              >
                <option value="Ninguno">Ninguno</option>
                <option value="Positivo">Positivo</option>
                <option value="Negativo">Negativo</option>
              </select>
                      
                    </div>
                </div>
                <div className="form-group row">
                    <label  className="col-sm-3 col-form-label"> Proteinas 10.00 mg/dL</label>
                    <div className="col-sm-9">
                      <input type="number"  rows="2"  min="0" max="1000"name="Proteinas"
                      value={expediente.Proteinas} 
                      onChange={handleChangeExpediente} className="form-control"  placeholder="Proteinas"/>
                    </div>
                </div>

                <div className="form-group row">
                    <label  className="col-sm-3 col-form-label"> Glucosa</label>
                    <div className="col-sm-9">
                      {/* <input type="number"  rows="2" min="0" max="1000" name="Glucosa"
                      value={expediente.Glucosa} 
                      onChange={handleChangeExpediente} className="form-control"  placeholder="Glucosa"/>
                     */}
                    <select
                className="form-select form-select-lg mb-3"
                name="Glucosa"
                placeholder="Glucosa"
                defaultValue={expediente.Glucosa}
                onChange={handleChangeExpediente}
              >
                <option value="Ninguno">Ninguno</option>
                <option value="Fuera de rango">Fuera de rango</option>
                <option value="Normal">Normal</option>
              </select>
              </div>
                </div>

                <div className="form-group row">
                    <label  className="col-sm-3 col-form-label"> Eritrocitos Hb</label>
                    <div className="col-sm-9">
{/*                       <input type="number" min="0" max="1000" rows="2"  name="EritrocitosHb"
                      value={expediente.EritrocitosHb} 
                      onChange={handleChangeExpediente} className="form-control"  placeholder="Eritrocitos Hb"/> */}

<select
                className="form-select form-select-lg mb-3"
                name="EritrocitosHb"
                placeholder="Eritrocitos Hb"
                defaultValue={expediente.EritrocitosHb}
                onChange={handleChangeExpediente}
              >
                <option value="Ninguno">Ninguno</option>
                <option value="Positivo">Positivo</option>
                <option value="Negativo">Negativo</option>
              </select>
                    </div>
                </div>

                <div className="form-group row">
                    <label  className="col-sm-3 col-form-label">Cetonas</label>
                    <div className="col-sm-9">
                <select
                className="form-select form-select-lg mb-3"
                name="Cetonas"
                placeholder="Cetonas"
                defaultValue={expediente.Cetonas}
                onChange={handleChangeExpediente}
              >
                <option value="Ninguno">Ninguno</option>
                <option value="Positivo">Positivo</option>
                <option value="Negativo">Negativo</option>
              </select>
                    </div>
                </div>



                <div className="form-group row">
                    <label  className="col-sm-3 col-form-label"> Urobilinogeno por mg/dL</label>
                    <div className="col-sm-9">
                      <input type="number" rows="2" min="0" max= "1000"  name="Urobilinogeno"
                      value={expediente.Urobilinogeno}
                      onChange={handleChangeExpediente} className="form-control"   placeholder="Urobilinogeno"/>
                    </div>
                </div>

                <div className="form-group row">
                    <label  className="col-sm-3 col-form-label"> Bilirubinas por mg/dL</label>
                    <div className="col-sm-9">
                      <input type="number" rows="2" min="0" max= "1000"  name="Bilirubinas"
                      value={expediente.Bilirubinas}
                      onChange={handleChangeExpediente} className="form-control"   placeholder="Bilirubinas"/>
                    </div>
                </div>
       
                </div>
            
                <div className="card-footer">
                  <button type="submit"  className="btn btn-warning text-white font-weight-bold">Actualizar</button>
                </div>
            
              </form>
            </div> 
            </div>


            <div className="col-md-6">
         <div className="paciente card-info ">
              <div className="card-header">
                <h3 className="card-title-paciente">Química sanguínea (QS): </h3>
              </div>


              <form className="form-horizontal"   onSubmit={handleSubmitExpediente} >
                <div className="card-body">

                <div className="form-group row">
                    <label  className="col-sm-3 col-form-label"> Ácido Úrico por mg/dL</label>
                    <div className="col-sm-9">
                      <input type="number" rows="2" min="0" max= "1000"  name="acidourico"
                      value={expediente.acidourico}
                      onChange={handleChangeExpediente} className="form-control"   placeholder="Ácido Úrico"/>
                    </div>
                </div>

                <div className="form-group row">
                    <label  className="col-sm-3 col-form-label"> Creatinina por mg/dL</label>
                    <div className="col-sm-9">
                      <input type="number" rows="2" min="0" max= "1000"  name="Creatinina"
                      value={expediente.Creatinina}
                      onChange={handleChangeExpediente} className="form-control"   placeholder="Creatinina"/>
                    </div>
                </div>

                <div className="form-group row">
                    <label  className="col-sm-3 col-form-label">Nitrógeno ureico (BUN) por mg/dL</label>
                    <div className="col-sm-9">
                      <input type="number" rows="2" min="0" max= "1000"  name="NitrogenoureicoBUN"
                      value={expediente.NitrogenoureicoBUN}
                      onChange={handleChangeExpediente} className="form-control"   placeholder="Nitrógeno ureico (BUN)"/>
                    </div>
                </div>

                <div className="form-group row">
                    <label  className="col-sm-3 col-form-label"> Urea por mg/dL</label>
                    <div className="col-sm-9">
                      <input type="number" rows="2" min="0" max= "1000"  name="Urea"
                      value={expediente.Urea}
                      onChange={handleChangeExpediente} className="form-control"   placeholder="Urea"/>
                    </div>
                </div>
                </div>           
                <div className="card-footer">
                  <button type="submit" className="btn btn-warning text-white font-weight-bold">Actualizar</button>
                </div>
            
              </form>
            </div> 
            </div>
            <div className="col-md-12">
         <div className="paciente card-info ">
              <div className="card-header">
                <h3 className="card-title-paciente">Perfil lipídico: </h3>
              </div>

              <form className="form-horizontal"  onSubmit={handleSubmitRegimen}>
                <div className="card-body expe-row">


                <div className="form-group row">
                    <label  className="col-sm-12 col-form-label">Colesterol HDL por mg/dL</label>
                    <div className="col-sm-9">
                      <input type="number" rows="2" min="0" max= "1000"  name="ColesterolHDL"
                      value={expediente.ColesterolHDL}
                      onChange={handleChangeExpediente} className="form-control"   placeholder="Colesterol HDL"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label  className="col-sm-12 col-form-label">Colesterol LDL por mg/dL</label>
                    <div className="col-sm-9">
                      <input type="number" rows="2" min="0" max= "1000"  name="ColesterolLDL"
                      value={expediente.ColesterolLDL}
                      onChange={handleChangeExpediente} className="form-control"   placeholder="Colesterol LDL"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label  className="col-sm-12 col-form-label">Trigliceridos por mg/dL</label>
                    <div className="col-sm-9">
                      <input type="number" rows="2" min="0" max= "1000"  name="Trigliceridos"
                      value={expediente.Trigliceridos}
                      onChange={handleChangeExpediente} className="form-control"   placeholder="Trigliceridos"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label  className="col-sm-12 col-form-label">Colesterol total por mg/dL</label>
                    <div className="col-sm-9">
                      <input type="number" rows="2" min="0" max= "1000"  name="Colesteroltotal"
                      value={expediente.Colesteroltotal}
                      onChange={handleChangeExpediente} className="form-control"   placeholder="Colesterol total"/>
                    </div>
                </div>
                </div>
            
                <div className="card-footer">
                  <button type="submit" className="btn btn-warning text-white font-weight-bold">Actualizar</button>
                </div>
            
              </form>
            </div> 
            </div>


            <div className="col-md-12">
         <div className="paciente card-info ">
              <div className="card-header">
                <h3 className="card-title-paciente">Regimen Alimenticio y de Ejercicio</h3>
              </div>

              <form className="form-horizontal"  onSubmit={handleSubmitRegimen}>
                <div className="card-body expe-row">

                <div className="form-group ">
                    <label className="col-sm-12 col-form-label">Dietas: </label>
                    <div className="col-sm-24">
                    <textarea type="text" rows="12" className="form-control"  name="Dieta"
                    value={regimen.Dieta} onChange={handleChangeRegimen} placeholder="Dietas"/>
                    </div>
                </div>&nbsp;&nbsp;&nbsp;

                
                <div className="form-group ">
                    <label  className="col-sm-12 col-form-label">Ejercicios</label>
                    <div className="col-sm-24">
                    <textarea type="text" rows="12" className="form-control"  name="Ejercicios"
                    value={regimen.Ejercicios} onChange={handleChangeRegimen} placeholder="Ejercicios"/>
                    </div>
                </div>

                </div>
            
                <div className="card-footer">
                  <button type="submit" className="btn btn-warning text-white font-weight-bold">Actualizar</button>
                </div>
            
              </form>
            </div> 
            </div>
            </div>
        </div>
        <div className="historial" >
         <div className="paciente btn-warning ">
              <button   type="submit"  onClick={setHistorial}>
                <h3 className="card-title-nuevoExpediente">Crear un nuevo Expediente</h3>
                <FontAwesomeIcon icon={faFileMedical}   className="iconCardButton "  />
              </button>
          </div> 
        </div>
        <div className="historial">
         <div className="paciente card-info ">
              <div className="card-header ">
                <h3 className="card-title-paciente">Historial:</h3>
              </div>
          </div> 
        </div>
        
        {
         data[0].allExpedientes.map( item => {
            return <ExpedienteItem key={item._id} data={item} Deletehistorial={DeleteHistorial}/>
          })
        }
   
      </div>
    </div>
    )
}

export default Expediente


 export const getServerSideProps = async ({query}) => { 

  const res = await fetch(`http://localhost:5000/api/getExpediente/${query.expediente}`)
  const data = await res.json()
  const result =  JSON.stringify(data)
  if (!data) {
    return {
      notFound: true,
    }
  }
   return {
    props: {data,result},
  } 
} 
 