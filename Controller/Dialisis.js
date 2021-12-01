const Dialisis = require ("../Models/DialisisSchema");

const controller = {
    getDialisisList : async  (req, res, next) => {
        await Dialisis.find({paciente_id:req.params.id}).lean().then(pacientes => {
            
            res.json(pacientes)
        }).catch(next)
    },
    postDialisis : async(req,res,next) => {
        if(!req.body.Dialisis) return res.status(302).json({msg:"Vacio no puede estar."})
        const newDialisis = new Dialisis({
            Dialisis:req.body.Dialisis,
            paciente_id:req.body.PacienteId
        })

        await newDialisis.save().then(async ()=> {
            return res.json({msg:"Registro Guardado"})
        }).catch(next)
    },
    updateDialisis: async(req,res,next) => {
        await Dialisis.findByIdAndUpdate({_id:req.params.id},{Dialisis:req.body.Dialisis}).then(() => {
            return res.json({msg:"Dialisis Actulizada"})
        }).catch(next)
    },
    deleteDialisis: async (req,res,next) => {
        await Dialisis.findByIdAndRemove({_id:req.params.id}).then(async () => {
            return res.json({msg:"Dialisis Eliminada"})
        }).catch(next)
    }
}

module.exports = controller