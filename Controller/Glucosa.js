const Glucosa = require ("../Models/GlucosaSchema");

const controller = {
    getGlucosaList : async  (req, res, next) => {
        await Glucosa.find({paciente_id:req.params.id}).lean().then(pacientes => {
            res.json(pacientes)
        }).catch(next)
    },
    postGlucosa : async(req,res,next) => {
        if(!req.body.Glucosa) return res.status(302).json({msg:"Vacio no puede estar."})
        const newGlucosa = new Glucosa({
            Glucosa:req.body.Glucosa,
            paciente_id:req.body.PacienteId
        })
        await newGlucosa.save().then(async ()=> {
            return res.json({msg:"Registro Guardado"})
        }).catch(next)
    },
    updateGlucosa: async(req,res,next) => {
        await Glucosa.findByIdAndUpdate({_id:req.params.id},{Glucosa:req.body.Glucosa}).then(() => {
            return res.json({msg:"Glucosa Actulizada"})
        }).catch(next)
    },
    deleteGlucosa: async (req,res,next) => {
       
        await Glucosa.findByIdAndRemove({_id:req.params.id}).then(async () => {
            return res.json({msg:"Glucosa Eliminada"})
        }).catch(next)
    }
}

module.exports = controller

