const mongoose = require ('mongoose')
const GlucosaSchema =require ('./Schemas/Glucosalevels')

module.exports = mongoose.model('glucosa',GlucosaSchema)