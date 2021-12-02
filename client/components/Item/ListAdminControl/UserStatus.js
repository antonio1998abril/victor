import React, { useContext } from 'react'
import { GlobalState } from '../../GlobalState'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons' 
function UserStatus({allS,deleteallS}) {

    const state = useContext(GlobalState);
    const [modalOnEdit,modalsetOnEdit] = state.Paciente.modalOnEdit
    const [idUserS,setIdUserS] = state.Paciente.idUserS

    const changeState=()=>{
      modalsetOnEdit(true)
      setIdUserS(allS._id)
    }

    return (
        <>
        <tr >
            <td className="text-sm">
               <b>{allS.name} {allS.lastname} </b>
            </td> 
            <td className="text-sm">
        <span><b>{allS.email}</b></span>
            </td> 
            <td className="project-actions text-fixed">
                <button  onClick={()=>deleteallS(allS._id)}  className="btn btn-danger btn-flat "  >    
                    <i><FontAwesomeIcon icon={faTrash} /></i> 
                </button>
                &nbsp;
                <>
                <button onClick={changeState}  className="btn btn-warning btn-flat "  >    
                  <i><FontAwesomeIcon icon={faEdit} /></i>
                </button> 
                </>  
            </td>         
          </tr>
          
        </>
    )
}

export default UserStatus
