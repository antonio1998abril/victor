const mongoose =require('mongoose')
const Schema = mongoose.Schema;


const UserExpediente = new Schema({
    Leucocitos: {
        type:String,
        required: false,
        default:''
    },
    Eritrocitos:{
        type:String,
        required: false,
        default:''
    },
    Hemoglobina:{
        type:String,
        required: false,
        default:''
    },
    Hematocrito:{
        type:String,
        required: false,
        default:''
    },
    Volumencorpuscularmedio:{
        type:String,
        required: false,
        default:''
    },
    HemoglobinaGlucosilada:{
        type:String,
        required: false,
        default:''
    },
    Hemoglobinacorpuscularmedia:{
        type:String,
        required: false,
        default:''
    },
    Concentracionmediadehemoglobinacorpuscular:{
        type:String,
        required: false,
        default:''
    },
    Anchodedistribuciondeeritrocitos:{
        type:String,
        required: false,
        default:''
    },
    Plaquetas:{
        type:String,
        required: false,
        default:''
    },
    Neutrofilos:{
        type:String,
        required: false,
        default:''
    },
    Linfocitos:{
        type:String,
        required: false,
        default:''
    },
    Monocitos: {
        type:String,
        required: false,
        default:''
    },
    Eosinofilos: {
        type:String,
        required: false,
        default:''
    },
    Basofilos:{
        type:String,
        required: false
    },
    HemoglobinaglucosiladaHbA1c :{
        type:String,
        required: false
    },
    BiometriahematicacompletaBHC:{
        type:String,
        required: false
    },
    Gravedadespecifica:{
        type:String,
        required: false
    },
    ReaccionPH:{
        type:String,
        required: false
    },
    Esterasaleucocitaria:{
        type:String,
        required: false
    },
    Nitritos:{
        type:String,
        required: false
    },
    Proteinas:{
        type:String,
        required: false
    },
    Glucosa:{
        type:String,
        required: false
    },
    EritrocitosHb:{
        type:String,
        required: false
    },
    Bilirubinas:{
        type:String,
        required: false
    },
    Urobilinogeno:{
        type:String,
        required: false
    },
    Cetonas:{
        type:String,
        required: false
    },
    acidourico:{
        type:String,
        required: false
    },
    Creatinina:{
        type:String,
        required: false
    },
    NitrogenoureicoBUN:{
        type:String,
        required: false
    },
    Urea:{
        type:String,
        required: false
    },
    ColesterolHDL:{
        type:String,
        required: false
    },
    ColesterolLDL:{
        type:String,
        required: false
    },
    Trigliceridos:{
        type:String,
        required: false
    },
    Colesteroltotal:{
        type:String,
        required: false
    },
    Dieta:{
        type:String,
        required: false
    },
    Ejercicios:{
        type:String,
        required: false
    },

    StatusViejoExpediente: {
        type:Boolean,
        required: false,
        default:false
    },
    paciente_id:{
        type:Schema.Types.ObjectId,
        ref:'paciente'
    }
},{
    timestamps: true
  })

module.exports = UserExpediente


//// DEJAR AL USUARIO PONER SUS VALORES NORMALES DE GLUCOSA REGIMEN ALIMENTICIO, RECORDATORIO
// DE CADA VALOR DEFAULT
//SEPARAR MODELOS: PREVENTIVOS(LABORATORIO, SENTIR DEL PACIENTE), ANTECENDENTE, PROBLEMAS MENTALES, PROBLMEAS FISICOS