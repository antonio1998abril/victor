import React, { useContext, useEffect, useState } from 'react'
import Router from 'next/router';
import { GlobalState } from '../components/GlobalState';
import Image from 'next/image'
import profilePic from '../public/testuser.png'
import Filter from '../components/Search/Filter'
import LoadMore from '../components/Search/LoadMore';
import Loading from '../components/Loader/Loader';
import SearchItem from '../components/Item/SearchItem';
function Result() {
    const state = useContext(GlobalState);
    const [loaded,setLoaded] = useState(false)
    const [islogged]= state.User.isLogged
    const [isAdmin]= state.User.isAdmin
    
    useEffect(() => {
      if(!isAdmin || !islogged) {
        let timerFunc = setTimeout(() => {
          Router.push('/login')
        }, 100);
  
        return () => clearTimeout(timerFunc);
    }else{ 
        setLoaded(true) 
      }
  }, [!isAdmin,!islogged]);
  
    if (!loaded) { return <div></div> } 
    /* SET DATA TO GET PACIENTES AND LOAD MORE ELEMENTS */
    const [pacientes,setpacientes] = state.Paciente.GlobalPaciente
    const [token] = state.token
    const [callback,setCallback] = state.Paciente.callback



    return (
        <>
<Filter/>
        <div className="paciente result">
            <div className="card-body">
                <div className="row">
                    <div className="col-12">
                        <h4> Resultado</h4>
                            {
                                pacientes.map(paciente => {
                                    return <SearchItem key={paciente._id} paciente={paciente}/>
                                })
                            }
                    </div>
                </div>
            </div>
            <LoadMore/>
        {pacientes.length === 0 && <Loading/>}
        </div>

    </>
    )
}

export default Result
