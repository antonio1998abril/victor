import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEye,faTrash} from '@fortawesome/free-solid-svg-icons'
import {Modal, Button} from 'react-bootstrap' 

function ExpedienteSearch({data}) {
    let ShowDate = new Date(data.createdAt);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="result-expe">
        <div><span>Fecha:</span> <span>{ShowDate.getUTCDate()}/{ShowDate.getMonth()}/{ShowDate.getFullYear()} a las {ShowDate.getHours()}:{ShowDate.getMinutes()}</span></div>
            <div>
            <span>Ver </span>        
                <button  className="btn btn-primary"  onClick={handleShow}>
                  <span>    
                    <FontAwesomeIcon icon={faEye}     />
                  </span>
                </button>
            </div>
            {/* MODAL */}

            <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Informacion</Modal.Title>
        </Modal.Header>
            <Modal.Body>
            <Modal.Title>Datos de Laboratorio</Modal.Title>
          

 
{/*     <div className="form-group">
      <label  className="heading font-weight-bold">Nivel de Glucosa general:</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text"></span>
        </div>
        <label type="text" className="form-control font-weight-bold">
        {data.GlucosaSangre} {presion} {dialisis}
        </label>
      </div>
    </div> */}
    <div className="form-group">
      <label  className="heading font-weight-bold">Nivel de Microalbuminuria:</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text"></span>
        </div>
        <label type="text" className="form-control font-weight-bold">
        {data.Microalbuminuria}
        </label>
      </div>
    </div>
    <div className="form-group">
      <label  className="heading font-weight-bold">Nivel de Hemoglobina Glucosilada:</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text"></span>
        </div>
        <label type="text" className="form-control font-weight-bold">
        {data.HemoglobinaGlucosilada}
        </label>
      </div>
    </div>
    <div className="form-group">
      <label  className="heading font-weight-bold">Nivel de Trigliseridos:</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text"></span>
        </div>
        <label type="text" className="form-control font-weight-bold">
        {data.NivelTrigliseridos}
        </label>
      </div>
    </div>
    <div className="form-group">
      <label  className="heading font-weight-bold">Electrocadriograma:</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text"></span>
        </div>
        <label type="text" className="form-control font-weight-bold">
        {data.Electrocadriograma}
        </label>
      </div>
    </div>
    <div className="form-group">
      <label  className="heading font-weight-bold">Nivel Colesterol:</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text"></span>
        </div>
        <label type="text" className="form-control font-weight-bold">
        {data.NivelCoresterol}
        </label>
      </div>
    </div>

            </Modal.Body>

            <Modal.Body>
            <Modal.Title>Informacion de Valoraciones Fisicas</Modal.Title>


            <div className="form-group">
      <label  className="heading font-weight-bold">Antecedentes:</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text"></span>
        </div>
        <label type="text" className="form-control font-weight-bold">
        {data.Antecedentes}
        </label>
      </div>
    </div>
    <div className="form-group">
      <label  className="heading font-weight-bold">Uso de algun medicamento:</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text"></span>
        </div>
        <label type="text" className="form-control font-weight-bold">
        {data.Medicamentos}
        </label>
      </div>
    </div>
    <div className="form-group">
      <label  className="heading font-weight-bold">Alergias: </label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text"></span>
        </div>
        <label type="text" className="form-control font-weight-bold">
        {data.Alergias}
        </label>
      </div>
    </div>
    <div className="form-group">
      <label  className="heading font-weight-bold">Malestares Fisicas:</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text"></span>
        </div>
        <label type="text" className="form-control font-weight-bold">
        {data.Cuerpodaño}
        </label>
      </div>
    </div>
    <div className="form-group">
      <label  className="heading font-weight-bold">Otras Enfermedades:</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text"></span>
        </div>
        <label type="text" className="form-control font-weight-bold">
        {data.OtrasEnfermedades}
        </label>
      </div>
    </div>
    <div className="form-group">
      <label  className="heading font-weight-bold">Estado dental:</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text"></span>
        </div>
        <label type="text" className="form-control font-weight-bold">
        {data.EstatusDental}
        </label>
      </div>
    </div>
            </Modal.Body>
            
            <Modal.Body>
              <Modal.Title>Informacion de Valoraciones Mentales: </Modal.Title>

              <div className="form-group">
      <label  className="heading font-weight-bold">En que momento iniciaron:</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text"></span>
        </div>
        <label type="text" className="form-control font-weight-bold">
        {data.InicioEnfermedadMentales}
        </label>
      </div>
    </div>
    <div className="form-group">
      <label  className="heading font-weight-bold">Estado Mental:</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text"></span>
        </div>
        <label type="text" className="form-control font-weight-bold">
        {data.EstadoMental}
        </label>
      </div>
    </div>
    <div className="form-group">
      <label  className="heading font-weight-bold">Factor de Riesgo:</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text"></span>
        </div>
        <label type="text" className="form-control font-weight-bold">
        {data.FactorRiesgo}
        </label>
      </div>
    </div>
            </Modal.Body>

            <Modal.Body>
            <Modal.Title>Informacion del Regimen Alimenticio</Modal.Title>

            <div className="form-group">
      <label  className="heading font-weight-bold">Regimen de Ejercicio:</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text"></span>
        </div>
        <label type="text" className="form-control font-weight-bold">
        {data.Ejercicio}
        </label>
      </div>
    </div>
    <div className="form-group">
      <label  className="heading font-weight-bold">Regimen de comida:</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text"></span>
        </div>
        <label type="text" className="form-control font-weight-bold">
        {data.Comida}
        </label>
      </div>
    </div>
    <div className="form-group">
      <label  className="heading font-weight-bold">Lunes:</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text"></span>
        </div>
        <label type="text" className="form-control font-weight-bold">
        {data.Lunes}
        </label>
      </div>
    </div>
    <div className="form-group">
      <label  className="heading font-weight-bold">Martes:</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text"></span>
        </div>
        <label type="text" className="form-control font-weight-bold">
        {data.Martes}
        </label>
      </div>
    </div>
    <div className="form-group">
      <label  className="heading font-weight-bold">Miercoles:</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text"></span>
        </div>
        <label type="text" className="form-control font-weight-bold">
        {data.Miercoles}
        </label>
      </div>
    </div>
    <div className="form-group">
      <label  className="heading font-weight-bold">Jueves:</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text"></span>
        </div>
        <label type="text" className="form-control font-weight-bold">
        {data.Jueves}
        </label>
      </div>
    </div>
    <div className="form-group">
      <label  className="heading font-weight-bold">Viernes:</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text"></span>
        </div>
        <label type="text" className="form-control font-weight-bold">
        {data.Viernes}
        </label>
      </div>
    </div>
    <div className="form-group">
      <label  className="heading font-weight-bold">Sabado:</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text"></span>
        </div>
        <label type="text" className="form-control font-weight-bold">
        {data.Sabado}
        </label>
      </div>
    </div>
    <div className="form-group">
      <label  className="heading font-weight-bold">Domingo:</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text"></span>
        </div>
        <label type="text" className="form-control font-weight-bold">
        {data.Domingo}
        </label>
      </div>
    </div>
              </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        </div> 

    )
}

export default ExpedienteSearch