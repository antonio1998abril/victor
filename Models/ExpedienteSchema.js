const mongoose = require ('mongoose')
const ExpedienteSchema =require ('./Schemas/Expediente')

module.exports = mongoose.model('expediente',ExpedienteSchema)