const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    lastname: {
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    password: {
        type:String,
        required: true
    },
    role: {
        type:String,
        default:2
    },
    ocupation: {
        type:String,
        required: true
    },
    tel:{
        type:String,
        required: false
    },
    Notificationes:{
        type:Array,
        default:[]
    },
    pacientes:[{
        type:Schema.Types.ObjectId,
        ref:'paciente'
      }],
})

module.exports = UserSchema