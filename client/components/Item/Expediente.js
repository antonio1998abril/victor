import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Form, Modal, Button } from 'react-bootstrap'

function Expediente({ data, Deletehistorial }) {
  let ShowDate = new Date(data.createdAt);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="result-expe">
      <div><span>Fecha:</span> <span>{ShowDate.getUTCDate()}/{ShowDate.getMonth() + 1}/{ShowDate.getFullYear()} a las {ShowDate.getHours()}:{ShowDate.getMinutes()}</span></div>
      <div>
        <span>Eliminar </span>
        <button onClick={() => Deletehistorial(data._id)} className="btn btn-danger">
          <span>
            <FontAwesomeIcon icon={faTrash} />
          </span>
        </button>
      </div>
      <div>
        <span>Ver </span>
        <button className="btn btn-primary" onClick={handleShow}>
          <span>
            <FontAwesomeIcon icon={faEye} />
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

          <div className="form-group">
            <label className="heading font-weight-bold">Nivel Hemoglobina Glicosilada (HbA1c):</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"></span>
              </div>
              <label type="text" className="form-control font-weight-bold">
                {data.HemoglobinaglucosiladaHbA1c}
              </label>
            </div>
          </div>



          <div className="form-group">
            <label className="heading font-weight-bold">Eritrocitos por: millones/μL:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"></span>
              </div>
              <label type="text" className="form-control font-weight-bold">
                {data.Eritrocitos}
              </label>
            </div>
          </div>
          <div className="form-group">
            <label className="heading font-weight-bold">Leucocitos por: miles/μL:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"></span>
              </div>
              <label type="text" className="form-control font-weight-bold">
                {data.Leucocitos}
              </label>
            </div>
          </div>
          <div className="form-group">
            <label className="heading font-weight-bold">Hemoglobina por: g/dL:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"></span>
              </div>
              <label type="text" className="form-control font-weight-bold">
                {data.Hemoglobina}
              </label>
            </div>
          </div>
          <div className="form-group">
            <label className="heading font-weight-bold">Hematocrito  por: %:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"></span>
              </div>
              <label type="text" className="form-control font-weight-bold">
                {data.Hematocrito}
              </label>
            </div>
          </div>
          <div className="form-group">
            <label className="heading font-weight-bold">Volumen corpuscular medio  fL:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"></span>
              </div>
              <label type="text" className="form-control font-weight-bold">
                {data.Volumencorpuscularmedio}
              </label>
            </div>
          </div>
          <div className="form-group">
            <label className="heading font-weight-bold">Hemoglobina corpuscular media pg:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"></span>
              </div>
              <label type="text" className="form-control font-weight-bold">
                {data.Hemoglobinacorpuscularmedia}
              </label>
            </div>
          </div>
          <div className="form-group">
            <label className="heading font-weight-bold">Concentración media de hemoglobina corpuscular g/dL (%):</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"></span>
              </div>
              <label type="text" className="form-control font-weight-bold">
                {data.Concentracionmediadehemoglobinacorpuscular}
              </label>
            </div>
          </div>
          <div className="form-group">
            <label className="heading font-weight-bold">Ancho de distribución de eritrocitos 11.5 – 17.0 %:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"></span>
              </div>
              <label type="text" className="form-control font-weight-bold">
                {data.Anchodedistribuciondeeritrocitos}
              </label>
            </div>
          </div>
          <div className="form-group">
            <label className="heading font-weight-bold">Plaquetas por: miles/μL:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"></span>
              </div>
              <label type="text" className="form-control font-weight-bold">
                {data.Plaquetas}
              </label>
            </div>
          </div>
          <div className="form-group">
            <label className="heading font-weight-bold">Neutrofilos por:  %:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"></span>
              </div>
              <label type="text" className="form-control font-weight-bold">
                {data.Neutrofilos}
              </label>
            </div>
          </div>
          <div className="form-group">
            <label className="heading font-weight-bold">Linfocitos por: %:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"></span>
              </div>
              <label type="text" className="form-control font-weight-bold">
                {data.Linfocitos}
              </label>
            </div>
          </div>
          <div className="form-group">
            <label className="heading font-weight-bold">Monocitos por: %:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"></span>
              </div>
              <label type="text" className="form-control font-weight-bold">
                {data.Monocitos}
              </label>
            </div>
          </div>
          <div className="form-group">
            <label className="heading font-weight-bold">Basofilos por: %:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"></span>
              </div>
              <label type="text" className="form-control font-weight-bold">
                {data.Basofilos}
              </label>
            </div>
          </div>
          <div className="form-group">
            <label className="heading font-weight-bold">Eosinofilos por %:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"></span>
              </div>
              <label type="text" className="form-control font-weight-bold">
                {data.Eosinofilos}
              </label>
            </div>
          </div>

        </Modal.Body>

        <Modal.Body>
          <Modal.Title>Examen general de orina (EGO): </Modal.Title>
          <div className="form-group">
            <label className="heading font-weight-bold">Gravedadespecifica g/mL :</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"></span>
              </div>
              <label type="text" className="form-control font-weight-bold">
                {data.Gravedadespecifica}
              </label>
            </div>
          </div>
          <div className="form-group">
            <label className="heading font-weight-bold">Reacción PH:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"></span>
              </div>
              <label type="text" className="form-control font-weight-bold">
                {data.ReaccionPH}
              </label>
            </div>
          </div>
          <div className="form-group">
            <label className="heading font-weight-bold">Esterasa leucocitaria:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"></span>
              </div>
              <label type="text" className="form-control font-weight-bold">
                {data.Esterasaleucocitaria}
              </label>
            </div>
          </div>

          <div className="form-group">
            <label className="heading font-weight-bold">Nitritos:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"></span>
              </div>
              <label type="text" className="form-control font-weight-bold">
                {data.Nitritos}
              </label>
            </div>
          </div>




          <div className="form-group">
            <label className="heading font-weight-bold">Proteinas 10.00 mg/dL:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"></span>
              </div>
              <label type="text" className="form-control font-weight-bold">
                {data.Proteinas}
              </label>
            </div>
          </div>
          <div className="form-group">
            <label className="heading font-weight-bold">Uso de algun medicamento:</label>
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
            <label className="heading font-weight-bold">Glucosa: </label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"></span>
              </div>
              <label type="text" className="form-control font-weight-bold">
                {data.Glucosa}
              </label>
            </div>
          </div>
          <div className="form-group">
            <label className="heading font-weight-bold">Eritrocitos Hb:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"></span>
              </div>
              <label type="text" className="form-control font-weight-bold">
                {data.EritrocitosHb}
              </label>
            </div>
          </div>
          <div className="form-group">
            <label className="heading font-weight-bold">Cetonas:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"></span>
              </div>
              <label type="text" className="form-control font-weight-bold">
                {data.Cetonas}
              </label>
            </div>
          </div>
          <div className="form-group">
            <label className="heading font-weight-bold"> Urobilinogeno por mg/dL:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"></span>
              </div>
              <label type="text" className="form-control font-weight-bold">
                {data.Urobilinogeno}
              </label>
            </div>
          </div>
          <div className="form-group">
            <label className="heading font-weight-bold"> Bilirubinas por mg/dL:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"></span>
              </div>
              <label type="text" className="form-control font-weight-bold">
                {data.Bilirubinas}
              </label>
            </div>
          </div>
        </Modal.Body>

        <Modal.Body>
          <Modal.Title>Química sanguínea (QS): </Modal.Title>

          <div className="form-group">
            <label className="heading font-weight-bold">Ácido Úrico por mg/dL:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"></span>
              </div>
              <label type="text" className="form-control font-weight-bold">
                {data.acidourico}
              </label>
            </div>
          </div>
          <div className="form-group">
            <label className="heading font-weight-bold">Creatinina por mg/dL:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"></span>
              </div>
              <label type="text" className="form-control font-weight-bold">
                {data.Creatinina}
              </label>
            </div>
          </div>
          <div className="form-group">
            <label className="heading font-weight-bold">Nitrógeno ureico (BUN) por mg/dL:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"></span>
              </div>
              <label type="text" className="form-control font-weight-bold">
                {data.NitrogenoureicoBUN}
              </label>
            </div>
          </div>
          <div className="form-group">
            <label className="heading font-weight-bold">Urea por mg/dL:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"></span>
              </div>
              <label type="text" className="form-control font-weight-bold">
                {data.Urea}
              </label>
            </div>
          </div>
        </Modal.Body>

        <Modal.Body>
          <Modal.Title>Perfil lipídico:</Modal.Title>

          <div className="form-group">
            <label className="heading font-weight-bold">Colesterol HDL por mg/dL:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"></span>
              </div>
              <label type="text" className="form-control font-weight-bold">
                {data.ColesterolHDL}
              </label>
            </div>
          </div>
          <div className="form-group">
            <label className="heading font-weight-bold">Colesterol LDL por mg/dL:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"></span>
              </div>
              <label type="text" className="form-control font-weight-bold">
                {data.ColesterolLDL}
              </label>
            </div>
          </div>
          <div className="form-group">
            <label className="heading font-weight-bold">Trigliceridos por mg/dL:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"></span>
              </div>
              <label type="text" className="form-control font-weight-bold">
                {data.Trigliceridos}
              </label>
            </div>
          </div>
          <div className="form-group">
            <label className="heading font-weight-bold">Colesterol total por mg/dL:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"></span>
              </div>
              <label type="text" className="form-control font-weight-bold">
                {data.Trigliceridos}
              </label>
            </div>
          </div>
          <div className="form-group">
            <label className="heading font-weight-bold">Colesterol total por mg/dL:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"></span>
              </div>
              <label type="text" className="form-control font-weight-bold">
                {data.Colesteroltotal}
              </label>
            </div>
          </div>
          <div className="form-group">
            <label className="heading font-weight-bold">Regimen Alimenticio y de Ejercicio:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"></span>
              </div>
              <label type="text" className="form-control font-weight-bold">
                {data.Dieta}
              </label>
            </div>
          </div>
          <div className="form-group">
            <label className="heading font-weight-bold">Ejercicios:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"></span>
              </div>
              <label type="text" className="form-control font-weight-bold">
                {data.Ejercicios}
              </label>
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

  )
}

export default Expediente
