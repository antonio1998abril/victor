const mongoose = require ('mongoose')
const NotificacionesSchema =require ('./Schemas/Notificaciones')

module.exports = mongoose.model('notificaciones',NotificacionesSchema)