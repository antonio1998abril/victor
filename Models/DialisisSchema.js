const mongoose = require ('mongoose')
const DialisisSchema =require ('./Schemas/Dialisislevels')

module.exports = mongoose.model('dialisis',DialisisSchema)