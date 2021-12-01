const mongoose = require ('mongoose')
const CitasSchema =require ('./Schemas/Citas')

module.exports = mongoose.model('citas',CitasSchema)