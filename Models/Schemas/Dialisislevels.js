const mongoose =require('mongoose')
const Schema = mongoose.Schema;

const DialisisExpediente = new Schema({
    Dialisis:{
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

module.exports = DialisisExpediente