const mongoose =require('mongoose')
const Schema = mongoose.Schema;


const UserExpediente = new Schema({
    Glucosa:{
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

module.exports = UserExpediente
