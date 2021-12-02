import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChild,faFrownOpen} from '@fortawesome/free-solid-svg-icons'
import { GlobalState } from '../../components/GlobalState';
import Router from 'next/router';

function Salud() {
  const state = useContext(GlobalState);
  const [loaded,setLoaded] = useState(false)
  const [isAdmin]= state.User.isAdmin
  const [islogged]= state.User.isLogged

    useEffect(() => {
        if(!isAdmin || !islogged) {
          let timerFunc = setTimeout(() => {
            Router.push('/')
          }, 100);
    
          return () => clearTimeout(timerFunc);
      }else{ 
          setLoaded(true) 
        }
    }, [!isAdmin, !islogged]);

    if (!loaded) { return <div></div> } 
    return (
        <div>
          <div className="card card-primary card-outline">
            <div className="card-body p-0">
              <div className="table-responsive mailbox-messages">
                <table className="table table-hover table-striped">
                  <tbody>
                  <tr>
                    <td>
                        <FontAwesomeIcon  className="SaludIcon-good" icon={faChild}/>
                    </td>
                    <td className="mailbox-star"><a href="#"><i className="fas fa-star text-warning"></i></a></td>
                    <td className="mailbox-name"><a href="read-mail.html">JOEL</a></td>
                    <td className="mailbox-subject"><b>Estado:</b> BEUNO
                    </td>
                    <td className="mailbox-attachment"><i className="fas fa-paperclip"></i></td>
                  </tr>

                  <tr>
                    <td>
                      <FontAwesomeIcon className="SaludIcon-sad" icon={faFrownOpen}/>
                    </td>
                    <td className="mailbox-star"><a href="#"><i className="fas fa-star text-warning"></i></a></td>
                    <td className="mailbox-name"><a href="read-mail.html">Laura</a></td>
                    <td className="mailbox-subject"><b>Estado:</b> MALO
                    </td>
                    <td className="mailbox-attachment"><i className="fas fa-paperclip"></i></td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
    )
}

export default Salud
