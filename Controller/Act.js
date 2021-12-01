const Act = require ("../Models/ActividadesSchema");
const Paciente = require("../Models/PacienteSchema")

const controller = {
    getAct : async  (req, res, next) => {
     await Act.find({paciente_id:req.params.id}).then(activities => {
            const doneact = [];
            const pending = [];
            for (i = 0; i < activities.length; i++){
                if(activities[i].Status === true){
                    doneact.push(activities[i])
                } else {
                pending.push(activities[i])
                } 
            }
            let sum = doneact.length + pending.length
            let porcentDone = (100 * doneact.length) / sum
            porcentDone = Math.round(porcentDone);
            res.json({
                activities:pending,
                doneAct:doneact,
                porcentDone:porcentDone
            })
        }).catch(next)
    },
    postAct : async(req,res,next) => {
        const {TimeToComplete,Activityname,Content,DateToComplete, paciente_id} = req.body;
        if(!TimeToComplete || !Activityname || !Content || !DateToComplete || !paciente_id) return res.status(302).json({msg:"Completa todos los campos."})

        const newActivitiy = new Act({
            Activityname:Activityname,
            Content: Content,
            DateToComplete:DateToComplete,
            TimeToComplete:TimeToComplete,
            paciente_id:paciente_id
        })
        await newActivitiy.save().then(()=> {
            return res.json({msg:"Nueva Actividad Agregada"})
        }).catch(next)
    },
    updateAct: async(req,res,next) => {
        const  {Activityname,Content,DateToComplete,TimeToComplete,Status} = req.body
        await Act.findByIdAndUpdate({_id:req.params.id},{ Activityname,Content,DateToComplete,TimeToComplete,Status}).then(()=>{
            return res.json({msg:"Actividad Actualizada"})
        }).catch(next)
    },
    deleteAct: async (req,res,next) => {
       /* ELIMINA DE MANERA LOGICA PERO NO REAL PERO TIENEN QUE ESTAR INVERTIDOS LOS AWAITS */
        await Act.findByIdAndRemove({_id:req.params.id}).then(async()=>{
            /* await Paciente.findOneAndUpdate({Activities:req.params.id},{ $pull: {Activities:req.params.id } })  */
            return res.json({msg:"Actividad Elminada"})
        }).catch(next) 
    },
    DoneAct: async(req,res,next) =>{
        await Act.findByIdAndUpdate({_id:req.params.id},{Status:true}).then(()=>{
            return res.json({msg:"Activdad Hecha"})
        })
    },
    Backoff: async(req, res, next) =>{
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); 
        let yyyy = today.getFullYear();

        today =  yyyy + '-' + mm + '-' + dd;
       
        await Act.findByIdAndUpdate({_id:req.params.id},{DateToComplete:today,Status:false}).then(()=>{
            return res.json({msg:"Activdad Retornada"})
        })
    }
}

module.exports = controller

