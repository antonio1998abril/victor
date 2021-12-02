import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faFileMedical,faEdit,faPhone,faMailBulk,faChartLine} from '@fortawesome/free-solid-svg-icons'
import { GlobalState } from '../GlobalState';
import Link from 'next/link';
import Image from 'next/image'



function PacienteItem({paciente,deletePaciente}) {
    const state = useContext(GlobalState);
    const [idPaciente,setidPaciente] = state.Paciente.idPaciente
    /* const [modalOnEdit,modalsetOnEdit] = state.Paciente.modalOnEdit */
       /* modalsetOnEdit(true) */
    const changeStateEdit=()=>{
        setidPaciente(paciente._id)
    }
    return (
        <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column space-card">
            <div className="card bg-light d-flex flex-fill">
                <div className="card-result text-muted border-bottom-0">
                <FontAwesomeIcon icon={faMailBulk} /> {paciente.email}
                </div>
                <div className="card-body pt-0">
                  <div className="row">
                    <div className="col-7">
                      <h2 className="lead"><b>{paciente.name} {paciente.lastname}</b></h2>
                      <p className="text-muted text-sm"><b>Enfermedad: </b> {paciente.diabetesTipo} </p>
                      <ul className="ml-4 mb-0 fa-ul text-muted">
                        <li className="small"><span className="fa-li"><FontAwesomeIcon icon={faPhone} /></span> Phone: #{paciente.tel}</li>
                      </ul>
                    </div>
                    <div className="col-5 text-center">
                      <Image src={paciente.images.url}  height="100" width="100" alt="user-avatar" className="img-circle img-fluid" />
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <div className="text-right">
                <a  className="btn btn-sm bg-danger"  onClick={()=>deletePaciente(paciente._id)}>
                  <FontAwesomeIcon className="iconCard"  icon={faTrash} />
                </a>&nbsp;

                <a onClick={changeStateEdit} className="btn btn-sm bg-warning">
                  <FontAwesomeIcon className="iconCard"  icon={faEdit} /> Edit
                </a>&nbsp;
                
                 <Link href="/Pacientes/[expediente]" as={`/Pacientes/${paciente._id}`}>
                <a  className="btn btn-sm btn-primary">
                    <FontAwesomeIcon className="iconCard"  icon={faFileMedical} /> Expediente Completo
                </a></Link> &nbsp;<br/> <br/>

        {/*         <Link href="/Evolucion/[evolucion]" as={`/Evolucion/${paciente._id}`}>
                <a  className="btn btn-sm btn-info">
                    <FontAwesomeIcon className="iconCard"  icon={faChartLine} /> Ver Evolucion por graficas
                </a></Link> &nbsp; */}


                  </div>
                </div>
            </div>
        </div>
     
       
    )
}

export default PacienteItem
