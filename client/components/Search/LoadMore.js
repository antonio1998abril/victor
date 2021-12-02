import React, { useContext } from 'react'
import { GlobalState } from '../GlobalState'

function LoadMore() {
    const state = useContext(GlobalState)
    const [page, setPage] = state.Paciente.page
    const [result] = state.Paciente.result


    return (
        <div className="load_more">
            {
                result < page * 5 ? ""
                : <button onClick={() =>setPage (page+1)}> Cargar mas Pacientes </button>
            }
        </div>
    )
}

export default LoadMore
