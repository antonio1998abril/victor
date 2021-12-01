const mongoose =require('mongoose')
const Schema = mongoose.Schema;


const PresionExpediente = new Schema({
    Presion:{
        type:String,
        required: true
    },
    paciente_id:{
        type:Schema.Types.ObjectId,
        ref:'paciente'
    }
},{
    timestamps: true
  })

module.exports = PresionExpediente