const Paciente = require('../Models/PacienteSchema')
class APIfeature{
    constructor(query,queryString){
        this.query=query;
        this.queryString=queryString;
    }
    /* FILTROS */
    filteringEmail(){
        const queryObj={...this.queryString}
        const excludedFields=['page','sort','limit']
        excludedFields.forEach(el=>delete(queryObj[el]))
        let s = {$or:[{email:{$regex:this.queryString.email}}, {name:{$regex:this.queryString.email}}, {lastname:{$regex:this.queryString.email}}]}
        s = JSON.stringify(s)        
        /* const test= JSON.parse(queryStr.replace(/}{/g,',')); */
        this.query.find(JSON.parse(s)) 
        return this;
    }
    /* FIN DE FILTROS */
    sorting(){
        if(this.queryString.sort){
            const sortBy=this.queryString.sort.split(',').join(' ')
            this.query=this.query.sort(sortBy)
        }else{
            this.query=this.query.sort('-createdAt')
        }
        return this;
    }
    paginating(){
        const page=this.queryString.page *1||1
        const limit=this.queryString.limit * 1||5
        const skip =(page -1)*limit;
        this.query=this.query.skip(skip).limit(limit)
        return this;
    }
}
const controller = {
    findPaciente :async(req,res) => {
        try{
        const features = new APIfeature(Paciente.find().lean().populate([{path:'allExpedientes'},{path:'Encargado_id', model:'user'}]),req.query)
        .filteringEmail().sorting().paginating()
        let paciente = await features.query

            if(paciente.length === 0){
                console.log("No se encontro nada pasa al siguiente datos")
                res.json({
                    status:'Exito en la bsuqueda',
                    result:paciente.length,
                    paciente:paciente
                })
            }else{
                res.json({
                    status:'Exito en la bsuqueda',
                    result:paciente.length,
                    paciente:paciente,
                })
            }
  

    }catch(err){
        return res.status(500).json({msg:err.message});
        }
    }
}
module.exports = controller