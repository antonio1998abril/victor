import  { useEffect, useState } from 'react'
import Axios from 'axios'
import swal from 'sweetalert'

function User(token) {
    const [isLogged,setIsLogged] = useState(false)
    const [perfilInfo, setPerfilInfo] = useState([])
    const [callback,setCallback] = useState(false);
    const [isAdmin,setIsAdmin]=useState(false)

    const [superAdmin,setSuperAdmin] = useState(false);
    const [numPatient,setNumPatient] = useState('')
    useEffect(() => {
        if(token){
            const getUser = async () => {
                try{
                    const res = await Axios.get('/api/info',{
                        headers: {Authorization: token}
                    })
                    setIsLogged(true)
                    setPerfilInfo(res.data.user)
                    setNumPatient(res.data.PacienteAcargo)
                    res.data.user.role == 1 ? setIsAdmin(true) :setIsAdmin(false)
                    if(res.data.user.role == 3) setSuperAdmin(true),setIsAdmin(true)                   
                } catch (err) {
                    swal({
                        title:"ERROR",
                        text:err.response.data.msg,
                        icon:"error",
                        button:"OK"
                    })
                    localStorage.removeItem('firstLogin')
                }
            }
            getUser()
        }
    },[token]);
    return {
        isLogged:[isLogged,setIsLogged],
        perfilInfo:[perfilInfo,setPerfilInfo],
        isAdmin:[isAdmin,setIsAdmin],
        callback:[callback,setCallback],
        super: [superAdmin,setSuperAdmin],
        numPatient:[numPatient,setNumPatient]
        
    }
}

export default User
