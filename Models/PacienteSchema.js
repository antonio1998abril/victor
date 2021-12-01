const mongoose = require ('mongoose')
const PacienteSchema =require ('./Schemas/Paciente')

module.exports = mongoose.model('paciente',PacienteSchema)