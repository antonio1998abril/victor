const mongoose = require ('mongoose')
const PresionSchema =require ('./Schemas/Presionlevels')

module.exports = mongoose.model('presion',PresionSchema)