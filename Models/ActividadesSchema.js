const mongoose = require ('mongoose')
const ActividadesSchema =require ('./Schemas/Actividades')

module.exports = mongoose.model('actividades',ActividadesSchema)