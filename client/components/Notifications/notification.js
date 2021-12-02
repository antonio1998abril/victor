import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck,faInfo,faBan,faExclamationTriangle} from '@fortawesome/free-solid-svg-icons'

function notification({noti,deleteNoti}) {


    return (
        <>
{/*                         <div className="alert alert-danger alert-dismissible">
                  <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                  <h5> <FontAwesomeIcon icon={faBan} /> Alert!</h5>
                  Danger alert preview. This alert is dismissable. A wonderful serenity has taken possession of my
                  entire
                  soul, like these sweet mornings of spring which I enjoy with my whole heart.
                </div>
                <div className="alert alert-info alert-dismissible">
                  <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                  <h5> <FontAwesomeIcon icon={faInfo} /> Alert!</h5>
                  Info alert preview. This alert is dismissable.
                </div> */}
                <div className="alert alert-warning alert-dismissible">
                  <button onClick={()=>deleteNoti(noti._id)} type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                  <h5> <FontAwesomeIcon icon={faExclamationTriangle} /> Nueva Alerta! {noti.title}</h5>
                 {noti.Content}
                </div>

                
{/*                 <div className="alert alert-success alert-dismissible">
                  <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                  <h5> <FontAwesomeIcon icon={faCheck} />Alert!</h5>
                  Success alert preview. This alert is dismissable.
                </div> */}
                
        </>
    )
}

export default notification
