import React from 'react'
import {Line} from 'react-chartjs-2';

const Evolucion= ({info})=> {
 console.log(info)
  let ListaDateGlucosa = [];
  let ListDatePresion = [];
  let ListDateElectrocadriograma =  []
  let ListDateEstadoMental =[];
  let ListDateMicroalbuminuria = [];
  let ListDateNivelCoresterol = [];
  let ListDateNivelTrigliseridos = [];
  let ListDateOtrasEnfermedades = [];  
  let ListDateGlucosilada = [];


  let ListDataGlucosa = [];
  let ListDataPresion = [];
  let ListDataElectrocadriograma =  []
  let ListDataEstadoMental =[];
  let ListDataMicroalbuminuria = [];
  let ListDataNivelCoresterol = [];
  let ListDataNivelTrigliseridos = [];
  let ListDataOtrasEnfermedades = [];  
  let ListDataGlucosilada = [];


 
 for (var i=0; i< info.ListGlucosa.length; i++) {
   ListaDateGlucosa.push(info.ListGlucosa[i].date)
   ListDataGlucosa.push(info.ListGlucosa[i].value)
 }
 ListDataGlucosa.push(300)

 for (var i=0; i< info.ListPresion.length; i++) {
  ListDatePresion.push(info.ListPresion[i].date)
  ListDataPresion.push(info.ListPresion[i].value)
}
ListDataPresion.push(300)

  for (var i=0; i< info.ListElectrocadriograma.length; i++) {
    ListDateElectrocadriograma.push(info.ListElectrocadriograma[i].date)
    ListDataElectrocadriograma.push(info.ListElectrocadriograma[i].value)
  }

ListDataElectrocadriograma.push(130)

  for (var i=0; i< info.ListMicroalbuminuria.length; i++) {
    ListDateMicroalbuminuria.push(info.ListMicroalbuminuria[i].date)
    ListDataMicroalbuminuria.push(info.ListMicroalbuminuria[i].value)
  }
ListDataMicroalbuminuria.push(700)

  for (var i=0; i< info.ListNivelCoresterol.length; i++) {
    ListDateNivelCoresterol.push(info.ListNivelCoresterol[i].date)
    ListDataNivelCoresterol.push(info.ListNivelCoresterol[i].value)
  }
ListDataNivelCoresterol.push(300)

  for (var i=0; i< info.ListNivelTrigliseridos.length; i++) {
    ListDateNivelTrigliseridos.push(info.ListNivelTrigliseridos[i].date)
    ListDataNivelTrigliseridos.push(info.ListNivelTrigliseridos[i].value)
  }
ListDataNivelTrigliseridos.push(600)

for (var i=0; i< info.ListHemoglobinaGlucosilada.length; i++) {
  ListDateGlucosilada.push(info.ListHemoglobinaGlucosilada[i].date)
  ListDataGlucosilada.push(info.ListHemoglobinaGlucosilada[i].value)
}
ListDataGlucosilada.push(10)

const dataGlucosa = {
  labels:ListaDateGlucosa,
  datasets: [
    {
      label: 'Glucosa',
       fill: false,
      lineTension: 0.1, 
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0, 
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff', 
      pointBorderWidth: 1,
      pointHoverRadius: 5, 
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)', 
      pointHoverBorderWidth: 5,
      pointRadius: 5, 
      pointHitRadius: 10,
      data:ListDataGlucosa 
    }
  ]
};

const dataPresion = {
  labels:ListDatePresion,
  datasets: [
    {
      label: 'Presion Arterial',
       fill: false,
      lineTension: 0.1, 
      backgroundColor: '#c06a4b',
      borderColor: 'rgba(204,0,0)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0, 
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff', 
      pointBorderWidth: 1,
      pointHoverRadius: 5, 
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)', 
      pointHoverBorderWidth: 5,
      pointRadius: 5, 
      pointHitRadius: 10,
      data:ListDataPresion
    }
  ]
};


const dataElectrocadriograma = {
  labels:ListDateElectrocadriograma,
  datasets: [
    {
      label: 'Frecuencia Cardiaca por minuto',
       fill: false,
      lineTension: 0.1, 
      backgroundColor: '#9b4bc0',
      borderColor: 'rgba(103,78,167)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0, 
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(103,78,167)',
      pointBackgroundColor: '#fff', 
      pointBorderWidth: 1,
      pointHoverRadius: 5, 
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)', 
      pointHoverBorderWidth: 5,
      pointRadius: 5, 
      pointHitRadius: 10,
      data:ListDataElectrocadriograma
    }
  ]
};

const dataMicroalbuminuria = {
  labels: ListDateMicroalbuminuria,
  datasets: [
    {
      label: 'Microalbuminuria por mg/24 horas',
       fill: false,
      lineTension: 0.1, 
      backgroundColor: ' rgba(255,217,102)',
      borderColor: '#c0892b',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0, 
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(103,78,167)',
      pointBackgroundColor: '#fff', 
      pointBorderWidth: 1,
      pointHoverRadius: 5, 
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)', 
      pointHoverBorderWidth: 5,
      pointRadius: 5, 
      pointHitRadius: 10,
      data: ListDataMicroalbuminuria
    }
  ]
};

const dataListNivelCoresterol = {
  labels: ListDateNivelCoresterol,
  datasets: [
    {
      label: 'Coresterol por mg/dl',
      fill: false,
      lineTension: 0.1, 
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0, 
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff', 
      pointBorderWidth: 1,
      pointHoverRadius: 5, 
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)', 
      pointHoverBorderWidth: 5,
      pointRadius: 5, 
      pointHitRadius: 10,
      data: ListDataNivelCoresterol
    }
  ]
};


const dataListNivelTrigliseridos = {
  labels: ListDateNivelTrigliseridos,
  datasets: [
    {
      label: 'Niveles de trigliceridos por mg/dl',
      fill: false,
      lineTension: 0.1, 
      backgroundColor: '#c06a4b',
      borderColor: 'rgba(204,0,0)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0, 
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff', 
      pointBorderWidth: 1,
      pointHoverRadius: 5, 
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)', 
      pointHoverBorderWidth: 5,
      pointRadius: 5, 
      pointHitRadius: 10,
      data: ListDataNivelTrigliseridos
    }
  ]
};

const dataListDataGlucosilada = {
  labels: ListDateGlucosilada,
  datasets: [
    {
      label: 'Hemoglobina Glicosilada (HbA1c)',
      fill: false,
      lineTension: 0.1, 
      backgroundColor: '#c06a4b',
      borderColor: '#bf9000',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0, 
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff', 
      pointBorderWidth: 1,
      pointHoverRadius: 5, 
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)', 
      pointHoverBorderWidth: 5,
      pointRadius: 5, 
      pointHitRadius: 10,
      data: ListDataGlucosilada
    }
  ]
}


 
    return (
        <>
        <div className="col-sm-6 d-none d-sm-block">
            <ol className="breadcrumb float-sm-left">
              <li className="breadcrumb-item active"><h5>EVOLUCION DEL PACIENTE: {info.Name}</h5></li>
            </ol>
        </div>
        <br/><br/>
    <div className="graphjs" >
    <Line 
      data={dataGlucosa}
      width={400}
      height={400}
    />
  </div>

  <div className="graphjs" >
    <Line 
      data={dataPresion}
      width={400}
      height={400}
    />
  </div>

  <div className="graphjs" >
    <Line 
      data={dataElectrocadriograma}
      width={400}
      height={400}
    />
  </div>

  <div className="graphjs" >
    <Line 
      data={dataMicroalbuminuria}
      width={400}
      height={400}
    />
  </div>

  <div className="graphjs" >
    <Line 
      data={dataListNivelCoresterol}
      width={400}
      height={400}
    />
  </div>


  <div className="graphjs" >
    <Line 
      data={dataListNivelTrigliseridos}
      width={400}
      height={400}
    />
  </div>

  <div className="graphjs">
    <Line 
    data = {dataListDataGlucosilada}
      width={400}
      height={400}/>


  </div>
  
          

        </>
    )
}

export default Evolucion

export const getServerSideProps = async ({query}) => { 
    const res = await fetch(`https://backdiabetins.herokuapp.com/api/graph/${query.evolucion}`)
    const info = await res.json()
    const result =  JSON.stringify(info)
    if (!info) {
      return {
        notFound: true,
      }
    } 
     return {
      props: {info,result},
    } 
  } 