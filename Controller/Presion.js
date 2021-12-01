const Presion = require ("../Models/PresionSchema");
const Paciente = require
const controller = {
    getPresionList : async  (req, res, next) => {
        await Presion.find({paciente_id:req.params.id}).lean().then(pacientes => {
            res.json(pacientes)
        }).catch(next)
    },
    postPresion : async(req,res,next) => {
        if(!req.body.Presion) return res.status(302).json({msg:"Vacio no puede estar."})
        const newPresion = new Presion({
            Presion:req.body.Presion,
            paciente_id:req.body.PacienteId
        })
       
        await newPresion.save().then(async ()=> {
            return res.json({msg:"Registro Guardado"})
        }).catch(next)
    },
    updatePresion: async(req,res,next) => {
        console.log(req.body)
        await Presion.findByIdAndUpdate({_id:req.params.id},{Presion:req.body.name.Presion}).then(() => {
            return res.json({msg:"Presion Actulizada"})
        }).catch(next)
    },
    deletePresion: async (req,res,next) => {
        await Presion.findByIdAndRemove({_id:req.params.id}).then(async () => {
            return res.json({msg:"Presion Eliminada"})
        }).catch(next)
    }
}

module.exports = controller
