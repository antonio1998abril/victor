const Users=require('../Models/Schemas/User');

const authAdmin = async (req, res, next) =>{
    try {
        // Get user information by Id
        const user = await Users.findOne({
            _id: req.user.id
        })

        if (user.role === 1) 
            return res.status(400).json({msg: 'Denegado'})
            next()
        

        
    } catch (err) {
        res.status(500).json({msg: err.message})
    }
}
module.exports = authAdmin