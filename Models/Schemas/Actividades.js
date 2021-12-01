const mongoose =require('mongoose')
const Schema = mongoose.Schema;


const ActivitySchema = new Schema({
    Activityname:{
        type: String,
        required: true
    },
    Content: {
        type:String,
        required: true
    },
    DateToComplete:{
        type:String,
        required: true
    },
    TimeToComplete:{
        type:String,
        required: true
    },
    numbertype: {
        type:Number,
        required:false,
        default:0
    },
    Status: {
        default:false,
        type:Boolean,
        required: true
    },
    paciente_id:{
        type:Schema.Types.ObjectId,
        ref:'paciente'
    }},
    {
    timestamps: true
  })

module.exports = ActivitySchema