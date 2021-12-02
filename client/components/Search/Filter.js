import React,{useContext} from 'react'
import { GlobalState } from '../GlobalState'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch} from '@fortawesome/free-solid-svg-icons'

function Filter() {
    const state = useContext(GlobalState)
    const [sort,setSort] = state.Paciente.sort
    const [searchPaciente,setSearchPaciente] = state.Paciente.search
    return (
<>
    <h2 className="text-center display-4">Buscar</h2> 
    <div className="filter_menu">
        <input type="text" name="" value={searchPaciente} onChange={e=>setSearchPaciente(e.target.value)} className="form-control form-control-lg" placeholder="Buscar algun Paciente por Nombre o Correo..."/>
{/*             <div className="sort">
                <span>Buscar por: </span>
            <select className="form-select" value={sort} onChange={e=>setSort(e.target.value)}> 
                <option value=''>Pacientes recien registrados</option>
                <option value='sort=oldest'>Pacientes agregados mas anitiguos </option>
                <option value='sort=-edad'>Mayores de 18 años</option>
                <option value='sorrt=-edad'>Menores de 18 años</option>
            </select>
            </div> */}
        </div>  
</>
    )
}

export default Filter
