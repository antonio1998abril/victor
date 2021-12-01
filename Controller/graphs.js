const Paciente = require("../Models/PacienteSchema")
const Glucosa = require("../Models/GlucosaSchema")
const Presion = require("../Models/PresionSchema")

const moment = require('moment')
const controller = {
    getGraphs : async  (req, res, next) => {
        const GlucosaData = await Glucosa.find({paciente_id:req.params.id})
        const PresionData = await Presion.find({paciente_id:req.params.id})
        const allData = await Paciente.findById({_id:req.params.id}).lean().populate('allExpedientes')
        const listHemoglobinaGlucosilada = []
        const ListMicroalbuminuria = []

        const ListNivelCoresterol = []
        const ListNivelTrigliseridos = []
        const ListEstadoMental = []
        const ListOtrasEnfermedades = []
        const ListElectrocadriograma = []
        const ListGlucosaSangre = []
        const ListCuerpodao = []
    
        const ListGlucosa = []
        const ListPresion = []

        const dateExpediente = []
        let obj =JSON.parse(JSON.stringify(allData.allExpedientes));
       

        for (i=0; i< allData.allExpedientes.length; i++){          
            for (i in obj){
                let getDate = new Date(obj[i].updatedAt);
                let RealDate = moment(getDate,'YYYY-MM-DD').add(1,'M').format("YYYY-MM-DD, hh:mm A");
                listHemoglobinaGlucosilada.push({date:RealDate,value: obj[i].HemoglobinaGlucosilada}) 
                ListMicroalbuminuria.push({date:RealDate,value: obj[i].Microalbuminuria})

                ListNivelCoresterol.push({date:RealDate,value: obj[i].NivelCoresterol})
                ListNivelTrigliseridos .push({date:RealDate,value: obj[i].NivelTrigliseridos })
                ListEstadoMental.push({date:RealDate,value: obj[i].EstadoMental})
                ListOtrasEnfermedades.push({date:RealDate,value: obj[i].OtrasEnfermedades})
                ListElectrocadriograma.push({date:RealDate,value: obj[i].Electrocadriograma})
                ListGlucosaSangre.push({date:RealDate, value: obj[i].GlucosaSangre})
                ListCuerpodao.push({date:RealDate, value: obj[i].ListCuerpodaño})
                dateExpediente.push({date:RealDate})

             }
        }
        for (i= 0; i < GlucosaData.length; i++) {
            getDate = new Date(GlucosaData[i].updatedAt);
            /* RealDate = moment(getDate,'YYYY-MM-DD').add(1,'M').format("YYYY-MM-DD, hh:mm A"); */
            RealDate = moment(getDate,'YYYY-MM-DD').format("YYYY-MM-DD, hh:mm A");
            ListGlucosa.push({date:RealDate,value: GlucosaData[i].Glucosa})
        }
        for (i= 0; i < PresionData.length; i++) {
            getDate = new Date(PresionData[i].updatedAt);
           /*  RealDate = moment(getDate,'YYYY-MM-DD').add(1,'M').format("YYYY-MM-DD, hh:mm A"); */
           RealDate = moment(getDate,'YYYY-MM-DD').format("YYYY-MM-DD, hh:mm A");
            ListPresion.push({date:RealDate, value: PresionData[i].Presion})
        }
          res.json({
            ListMicroalbuminuria:ListMicroalbuminuria, 
            ListNivelCoresterol:ListNivelCoresterol, 
            ListNivelTrigliseridos:ListNivelTrigliseridos,
            ListEstadoMental:ListEstadoMental, 
            ListOtrasEnfermedades:ListOtrasEnfermedades,
            ListElectrocadriograma:ListElectrocadriograma,
            ListGlucosa:ListGlucosa,
            ListPresion:ListPresion,
            ListHemoglobinaGlucosilada:listHemoglobinaGlucosilada,
            Name:allData.name +" " + allData.lastname
          })
    }
    
}

module.exports = controller

